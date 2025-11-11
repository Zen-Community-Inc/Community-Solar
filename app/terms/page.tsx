import Layout from "@/components/Layout";
import { FileText, CheckCircle, Users, DollarSign, Calendar, AlertCircle, Scale, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Terms() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative section-lg bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Terms and Conditions</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Please read these terms carefully before using our services. By enrolling, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Last Updated:</strong> {siteConfig.legal.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-md space-y-8">
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Agreement to Terms</h2>
            </div>
            <p>
              By accessing or using {siteConfig.company.name}&apos;s website and services, you agree to be
              bound by these Terms and Conditions. If you do not agree with any part of these
              terms, you may not use our services.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Service Description</h2>
            </div>
            <p>
              {siteConfig.company.name} provides subscription-based access to community solar energy
              projects in {siteConfig.service.territories.join(", ")}. Subscribers receive credits on their utility bills for their
              allocated share of solar energy production.
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Key Terms:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{siteConfig.terms.subscriptionType} Subscription:</strong> No long-term commitment required
              </li>
              <li>
                <strong>Guaranteed Savings:</strong> {siteConfig.stats.savingsRange.min}-{siteConfig.stats.savingsRange.max}% discount on solar energy credits
              </li>
              <li>
                <strong>No Upfront Costs:</strong> Zero installation or equipment fees
              </li>
              <li>
                <strong>Cancellation:</strong> {siteConfig.terms.cancellationNoticeDays} days&apos; notice required
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Eligibility Requirements</h2>
            </div>
            <p>To enroll in our program, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be {siteConfig.terms.minAge} years of age or older</li>
              <li>Have an active {siteConfig.service.utilities.join(" or ")} utility account in your name</li>
              <li>
                Be enrolled in a qualifying government assistance program ({siteConfig.service.governmentPrograms.map(p => p.split(' (')[0]).join(", ")})
              </li>
              <li>Reside within the service territory of your utility provider</li>
              <li>Provide accurate and complete enrollment information</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Enrollment Process</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Submit your zip code to verify eligibility</li>
              <li>Complete the online enrollment form</li>
              <li>Upload required documents (utility bill and benefit proof)</li>
              <li>Await admin approval (typically {siteConfig.terms.enrollmentTimeDays})</li>
              <li>Receive confirmation and subscription allocation details</li>
            </ol>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Billing and Payment</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You will continue to receive your regular utility bill from {siteConfig.service.utilities.join(" or ")}
              </li>
              <li>Solar credits will appear as a line item discount on your utility bill</li>
              <li>
                You will receive a separate monthly invoice from {siteConfig.company.shortName} for your subscription
              </li>
              <li>Payment is due within {siteConfig.terms.paymentTermsDays} days of invoice date</li>
              <li>Late payments may result in service interruption</li>
              <li>Your subscription charge will always be less than the credits you receive</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Subscription Changes and Cancellation
              </h2>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Modifications:</h3>
            <p>
              You may request changes to your subscription allocation by contacting customer
              support. Changes take effect in the following billing cycle.
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Cancellation:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may cancel your subscription at any time with {siteConfig.terms.cancellationNoticeDays} days&apos; written notice</li>
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

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Energy Production Variability</h2>
            </div>
            <p>
              Solar energy production varies based on weather, seasonality, and other factors. While
              we guarantee your savings rate, actual credit amounts may fluctuate based on solar
              farm output. You will never pay more than the value of credits received.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">User Responsibilities</h2>
            </div>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information during enrollment</li>
              <li>Maintain an active utility account in good standing</li>
              <li>Notify us promptly of any changes to your contact information or address</li>
              <li>Pay invoices on time</li>
              <li>Report any billing discrepancies within 30 days</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
            </div>
            <p>
              {siteConfig.company.name} is not liable for utility service interruptions, solar farm
              downtime, or any indirect, incidental, or consequential damages arising from your use
              of our services. Our total liability is limited to the amount you paid in the
              preceding 12 months.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Intellectual Property</h2>
            </div>
            <p>
              All content on our website, including text, graphics, logos, and software, is the
              property of {siteConfig.company.name} and protected by copyright laws. You may not
              reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Scale className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Dispute Resolution</h2>
            </div>
            <p>
              Any disputes arising from these Terms shall be resolved through binding arbitration in
              accordance with {siteConfig.legal.jurisdiction} law. You waive the right to participate in class action
              lawsuits.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Changes to Terms</h2>
            </div>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be
              communicated via email with {siteConfig.terms.cancellationNoticeDays} days&apos; notice. Continued use of our services after
              changes take effect constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-6 sm:p-8 border border-yellow-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-200 rounded-lg">
                <Mail className="h-5 w-5 text-yellow-700" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
            </div>
            <p className="mb-4">For questions about these Terms and Conditions, contact us:</p>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">✉</span>
                <strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email.general}`} className="text-yellow-600 hover:underline">{siteConfig.contact.email.general}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">📞</span>
                <strong>Phone:</strong> <a href={`tel:${siteConfig.contact.phone.raw}`} className="text-yellow-600 hover:underline">{siteConfig.contact.phone.display}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">📍</span>
                <strong>Address:</strong> {siteConfig.contact.address.full}
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Acknowledgment</h2>
            </div>
            <p>
              By enrolling in {siteConfig.company.name}&apos;s program, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
