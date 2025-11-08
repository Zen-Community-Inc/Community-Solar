import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

const BILLS_BUCKET = "bills";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ billId: string }> }
) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { billId } = await params;

    // Find the bill and verify ownership
    const bill = await prisma.bill.findUnique({
      where: { id: billId },
      include: {
        lead: true,
      },
    });

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    // Verify the bill belongs to this user's lead
    if (bill.lead.userId !== session.user.id) {
      // Check email as fallback
      if (!session.user.email || bill.lead.email !== session.user.email) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Delete file from Supabase Storage
    // Extract file path from URL (format: https://.../bills/users/...)
    const filePathMatch = bill.fileUrl.match(/\/bills\/(users\/.+)$/);
    if (filePathMatch) {
      const filePath = filePathMatch[1];
      await supabaseAdmin.storage.from(BILLS_BUCKET).remove([filePath]);
    }

    // Delete bill record from database
    await prisma.bill.delete({
      where: { id: billId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete bill error:", error);
    return NextResponse.json(
      { error: "Failed to delete bill" },
      { status: 500 }
    );
  }
}
