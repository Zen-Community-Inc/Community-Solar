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
