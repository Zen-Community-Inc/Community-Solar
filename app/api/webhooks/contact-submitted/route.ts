import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Prepare webhook payload for contact form
    const webhookPayload = {
      event: "contact.submitted",
      timestamp: new Date().toISOString(),
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
        address: body.address || null,
        utility: body.utility || null,
        monthlyBill: body.bill || null,
        message: body.message || null,
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
      console.warn("No webhook URLs configured for contact form");
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
    console.log("Contact webhook triggered:", {
      email: body.email,
      name: body.name,
      company: body.company,
      timestamp: webhookPayload.timestamp,
    });

    // Log full payload for debugging
    console.log("Full webhook payload:", JSON.stringify(webhookPayload, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact webhook error:", error);
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
    endpoint: "contact-submitted webhook",
  });
}
