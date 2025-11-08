import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="min-h-screen py-20 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> January 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using Zen Community Solar&apos;s website and services, you agree to be
              bound by these Terms and Conditions. If you do not agree with any part of these
              terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Description</h2>
            <p>
              Zen Community Solar provides subscription-based access to community solar energy
              projects in Illinois. Subscribers receive credits on their utility bills for their
              allocated share of solar energy production.
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Key Terms:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Month-to-Month Subscription:</strong> No long-term commitment required
              </li>
              <li>
                <strong>Guaranteed Savings:</strong> 10-20% discount on solar energy credits
              </li>
              <li>
                <strong>No Upfront Costs:</strong> Zero installation or equipment fees
              </li>
              <li>
                <strong>Cancellation:</strong> 30 days&apos; notice required
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility Requirements</h2>
            <p>To enroll in our program, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be 18 years of age or older</li>
              <li>Have an active ComEd or Ameren Illinois utility account in your name</li>
              <li>
                Be enrolled in a qualifying government assistance program (SNAP, Medicaid, SSI,
                LIHEAP, or housing assistance)
              </li>
              <li>Reside within the service territory of your utility provider</li>
              <li>Provide accurate and complete enrollment information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Enrollment Process</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Submit your zip code to verify eligibility</li>
              <li>Complete the online enrollment form</li>
              <li>Upload required documents (utility bill and benefit proof)</li>
              <li>Await admin approval (typically 3-5 business days)</li>
              <li>Receive confirmation and subscription allocation details</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Billing and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You will continue to receive your regular utility bill from ComEd or Ameren
              </li>
              <li>Solar credits will appear as a line item discount on your utility bill</li>
              <li>
                You will receive a separate monthly invoice from Zen Solar for your subscription
              </li>
              <li>Payment is due within 15 days of invoice date</li>
              <li>Late payments may result in service interruption</li>
              <li>Your subscription charge will always be less than the credits you receive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Subscription Changes and Cancellation
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">Modifications:</h3>
            <p>
              You may request changes to your subscription allocation by contacting customer
              support. Changes take effect in the following billing cycle.
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Cancellation:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may cancel your subscription at any time with 30 days&apos; written notice</li>
              <li>No early termination fees apply</li>
              <li>
                If you move within the same utility territory, your subscription can be transferred
              </li>
              <li>
                If you move outside the service area, you may cancel without penalty upon proof of
                relocation
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Energy Production Variability</h2>
            <p>
              Solar energy production varies based on weather, seasonality, and other factors. While
              we guarantee your savings rate, actual credit amounts may fluctuate based on solar
              farm output. You will never pay more than the value of credits received.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information during enrollment</li>
              <li>Maintain an active utility account in good standing</li>
              <li>Notify us promptly of any changes to your contact information or address</li>
              <li>Pay invoices on time</li>
              <li>Report any billing discrepancies within 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
            <p>
              Zen Community Solar is not liable for utility service interruptions, solar farm
              downtime, or any indirect, incidental, or consequential damages arising from your use
              of our services. Our total liability is limited to the amount you paid in the
              preceding 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and software, is the
              property of Zen Community Solar and protected by copyright laws. You may not
              reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms shall be resolved through binding arbitration in
              accordance with Illinois law. You waive the right to participate in class action
              lawsuits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be
              communicated via email with 30 days&apos; notice. Continued use of our services after
              changes take effect constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <p>For questions about these Terms and Conditions, contact us:</p>
            <ul className="list-none space-y-2">
              <li>Email: legal@zencommunity.solar</li>
              <li>Phone: (312) 555-0100</li>
              <li>Address: Chicago, IL</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Acknowledgment</h2>
            <p>
              By enrolling in Zen Community Solar&apos;s program, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
