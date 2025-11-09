import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testPayload = {
      event: "lead.completed",
      timestamp: new Date().toISOString(),
      completed: true,
      currentStep: 5,
      data: {
        userId: "test_user_123",
        firstName: "Test",
        lastName: "User",
        middleInitial: "T",
        email: "test@example.com",
        phoneNumber: "(312) 555-0000",
        serviceAddress: "123 Test Street",
        city: "Chicago",
        state: "IL",
        electricUtilityProvider: "ComEd (Commonwealth Edison)",
        governmentBenefitProgram: "SNAP",
        billCount: 3,
        // Flattened bill fields for Zapier
        bill1_fileName: "test-bill-january.pdf",
        bill1_fileUrl: "https://example.com/bills/test-jan.pdf",
        bill1_fileSize: 245678,
        bill1_mimeType: "application/pdf",
        bill2_fileName: "test-bill-february.pdf",
        bill2_fileUrl: "https://example.com/bills/test-feb.pdf",
        bill2_fileSize: 198432,
        bill2_mimeType: "application/pdf",
        bill3_fileName: "test-bill-march.pdf",
        bill3_fileUrl: "https://example.com/bills/test-mar.pdf",
        bill3_fileSize: 312456,
        bill3_mimeType: "application/pdf",
      },
    };

    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      return NextResponse.json(
        { error: "ZAPIER_WEBHOOK_URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    console.log("Test webhook sent!");
    console.log("Response status:", response.status);
    console.log("Payload sent:", JSON.stringify(testPayload, null, 2));

    return NextResponse.json({
      success: true,
      message: "Test webhook sent to Zapier",
      payload: testPayload,
      zapierStatus: response.status,
    });
  } catch (error) {
    console.error("Test webhook error:", error);
    return NextResponse.json(
      { error: "Failed to send test webhook" },
      { status: 500 }
    );
  }
}
