import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract bills array and flatten for Zapier
    const bills = body.bills || [];
    const bill1 = bills[0] || null;
    const bill2 = bills[1] || null;
    const bill3 = bills[2] || null;

    // Prepare webhook payload
    const webhookPayload = {
      event: body.event || "lead.submitted",
      timestamp: new Date().toISOString(),
      completed: body.completed ?? true,
      currentStep: body.currentStep,
      data: {
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        middleInitial: body.middleInitial,
        email: body.email,
        phoneNumber: body.phoneNumber,
        serviceAddress: body.serviceAddress,
        city: body.city,
        state: body.state,
        electricUtilityProvider: body.electricUtilityProvider,
        governmentBenefitProgram: body.governmentBenefitProgram,
        billCount: body.billCount || 0,
        // Flattened bill fields for Zapier (max 3 bills)
        // Zapier will download files from these URLs using Google Drive's "Upload from URL" feature
        bill1_fileName: bill1?.fileName || null,
        bill1_fileUrl: bill1?.fileUrl || null,
        bill1_fileSize: bill1?.fileSize || null,
        bill1_mimeType: bill1?.mimeType || null,
        bill2_fileName: bill2?.fileName || null,
        bill2_fileUrl: bill2?.fileUrl || null,
        bill2_fileSize: bill2?.fileSize || null,
        bill2_mimeType: bill2?.mimeType || null,
        bill3_fileName: bill3?.fileName || null,
        bill3_fileUrl: bill3?.fileUrl || null,
        bill3_fileSize: bill3?.fileSize || null,
        bill3_mimeType: bill3?.mimeType || null,
        // UTM tracking parameters
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        utm_term: body.utm_term || null,
        utm_content: body.utm_content || null,
        utm_id: body.utm_id || null,
        gclid: body.gclid || null,
        fbclid: body.fbclid || null,
        ref: body.ref || null,
        utm_first_touch: body.utm_first_touch || null,
        utm_last_touch: body.utm_last_touch || null,
      },
    };

    // Get webhook URLs from environment variables
    const webhookUrls = [
      process.env.ZAPIER_WEBHOOK_URL,
      process.env.MAKE_WEBHOOK_URL,
    ].filter(Boolean) as string[];

    // Skip if no webhooks configured
    if (webhookUrls.length === 0) {
      console.warn("No webhook URLs configured");
      return NextResponse.json({ success: true, skipped: true });
    }

    // Send to all webhook URLs
    const webhookPromises = webhookUrls.map((url: string) => {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      }).catch((error) => {
        console.error(`Failed to send to webhook ${url}:`, error);
        return null;
      });
    });

    await Promise.all(webhookPromises);

    // Log webhook event with full details
    console.log("Lead webhook triggered:", {
      email: body.email,
      completed: webhookPayload.completed,
      currentStep: body.currentStep,
      billCount: webhookPayload.data.billCount,
      bill1: bill1 ? bill1.fileName : null,
      bill2: bill2 ? bill2.fileName : null,
      bill3: bill3 ? bill3.fileName : null,
      timestamp: webhookPayload.timestamp,
    });

    // Log full payload for debugging
    console.log("Full webhook payload:", JSON.stringify(webhookPayload, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    endpoint: "lead-submitted webhook",
  });
}
