import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

    // Try to fetch lead data by userId first
    let lead = await prisma.lead.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        bills: {
          orderBy: {
            uploadedAt: "desc",
          },
        },
      },
    });

    // If not found by userId, try to find by email as fallback
    if (!lead && session.user.email) {
      lead = await prisma.lead.findFirst({
        where: {
          email: session.user.email,
        },
        include: {
          bills: {
            orderBy: {
              uploadedAt: "desc",
            },
          },
        },
      });

      // If found by email but different userId, update the userId to current session
      if (lead && lead.userId !== session.user.id) {
        lead = await prisma.lead.update({
          where: {
            id: lead.id,
          },
          data: {
            userId: session.user.id,
          },
          include: {
            bills: {
              orderBy: {
                uploadedAt: "desc",
              },
            },
          },
        });
      }
    }

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lead,
    });
  } catch (error) {
    console.error("Error fetching lead data:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead data" },
      { status: 500 }
    );
  }
}
