import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { onboardingSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Bills {
  leadId: number,
  fileName: string,
  fileUrl: string,
  fileSize: number,
  mimeType: string,
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, bills, ...formData } = body;

    // Validate user matches session
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validate form data
    const validatedData = onboardingSchema.parse(formData);

    // Create or update lead in database
    const lead = await prisma.lead.upsert({
      where: { userId },
      update: {
        ...validatedData,
        onboardingCompleted: true,
        onboardingStep: 5,
      },
      create: {
        userId,
        ...validatedData,
        onboardingCompleted: true,
        onboardingStep: 5,
      },
    });

    // Create bill records if provided
    if (bills && Array.isArray(bills) && bills.length > 0) {
      await prisma.bill.createMany({
        data: bills.map((bill: Bills) => ({
          leadId: lead.id,
          fileName: bill.fileName,
          fileUrl: bill.fileUrl,
          fileSize: bill.fileSize,
          mimeType: bill.mimeType,
        })),
      });
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Onboarding error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get lead data for current user
    const lead = await prisma.lead.findUnique({
      where: { userId: session.user.id },
      include: {
        bills: {
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Get onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
