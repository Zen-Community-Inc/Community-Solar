import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceAddress, city, state, electricUtilityProvider, governmentBenefitProgram } = body;

    // Find lead by userId or email
    let lead = await prisma.lead.findUnique({
      where: { userId: session.user.id },
    });

    if (!lead && session.user.email) {
      lead = await prisma.lead.findFirst({
        where: { email: session.user.email },
      });
    }

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Update lead information
    const updatedLead = await prisma.lead.update({
      where: { id: lead.id },
      data: {
        ...(serviceAddress && { serviceAddress }),
        ...(city && { city }),
        ...(state && { state }),
        ...(electricUtilityProvider && { electricUtilityProvider }),
        ...(governmentBenefitProgram !== undefined && { governmentBenefitProgram }),
      },
      include: {
        bills: {
          orderBy: {
            uploadedAt: "desc",
          },
        },
      },
    });

    // Prepare bills info for webhook (limit to 3 most recent)
    const billsInfo = updatedLead.bills.slice(0, 3).map((bill, index) => ({
      fileName: bill.fileName,
      fileUrl: bill.fileUrl,
      fileSize: bill.fileSize,
      mimeType: bill.mimeType,
      index: index + 1,
    }));

    // Trigger webhook for lead update (don't await - fire and forget)
    fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/webhooks/lead-submitted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead.updated",
        completed: true,
        currentStep: null,
        userId: updatedLead.userId,
        firstName: updatedLead.firstName,
        lastName: updatedLead.lastName,
        middleInitial: null, // Not stored in Lead model
        email: updatedLead.email,
        phoneNumber: updatedLead.phoneNumber,
        serviceAddress: updatedLead.serviceAddress,
        city: updatedLead.city,
        state: updatedLead.state,
        electricUtilityProvider: updatedLead.electricUtilityProvider,
        governmentBenefitProgram: updatedLead.governmentBenefitProgram,
        billCount: updatedLead.bills.length,
        bills: billsInfo,
      }),
    }).catch((error) => {
      console.error("Failed to send update webhook:", error);
    });

    return NextResponse.json({
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
