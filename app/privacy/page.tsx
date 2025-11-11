import Layout from "@/components/Layout";
import { Shield, Lock, Eye, FileText, Users, Bell } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Privacy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative section-lg bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Last Updated:</strong> {siteConfig.legal.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-md space-y-12">
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
            </div>
            <p>
              {siteConfig.company.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
            <p>We may collect personal information that you provide to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Mailing address and zip code</li>
              <li>Utility account information</li>
              <li>Proof of enrollment in qualifying assistance programs</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">
              Automatically Collected Information
            </h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>IP address and device information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
            </div>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your enrollment in our community solar program</li>
              <li>Verify your eligibility for income-qualified benefits</li>
              <li>Communicate with you about your subscription and savings</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send important updates about your account or service</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Information Sharing</h2>
            </div>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Utility Companies:</strong> To coordinate your solar credits
              </li>
              <li>
                <strong>Solar Farm Partners:</strong> To manage your subscription allocation
              </li>
              <li>
                <strong>Service Providers:</strong> Who assist with payment processing, customer
                support, and website hosting
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Lock className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
            </div>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
            </div>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review the personal information we hold about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where we rely on it for processing</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Cookies and Tracking</h2>
            </div>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience,
              analyze website traffic, and understand user preferences. You can control cookie
              settings through your browser preferences.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Children&apos;s Privacy</h2>
            </div>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Changes to This Policy</h2>
            </div>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the &quot;Last
              Updated&quot; date.
            </p>
          </section>

          <section className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-6 sm:p-8 border border-yellow-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-200 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-700" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
            </div>
            <p className="mb-4">If you have questions about this Privacy Policy, please contact us:</p>
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
        </div>
      </div>
    </Layout>
  );
}
