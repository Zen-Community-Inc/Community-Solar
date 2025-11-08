"use client";

import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap, Leaf, TrendingUp, Target, Heart, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignInModal from "@/components/SignInModal";

export default function About() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/20 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-300/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-foreground">
                Trusted by 10,000+ subscribers across Illinois
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Powering Illinois with Clean, Affordable Energy
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              We&apos;re on a mission to make renewable energy accessible to everyone in Illinois,
              regardless of income, property type, or location.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "10,000+", label: "Subscribers", icon: Users },
                { value: "50+ MW", label: "Total Capacity", icon: Zap },
                { value: "13,400", label: "Tons CO₂ Saved", icon: Leaf },
                { value: "98%", label: "Satisfaction Rate", icon: TrendingUp },
              ].map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300/20 rounded-full mb-4">
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full" />
            </div>
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                Zen Community Solar is dedicated to making clean energy accessible to all Illinois residents.
                We believe everyone deserves the opportunity to save money while supporting renewable energy,
                regardless of their housing situation or financial circumstances.
              </p>
              <p>
                Through strategic partnerships with local solar farms, we provide guaranteed savings of 10-20%
                on electricity costs—with zero upfront investment, no equipment installation, and no long-term
                commitments.
              </p>
              <p>
                Our program specifically serves income-qualified households through Illinois&apos; innovative
                community solar incentives, ensuring that the benefits of renewable energy reach those who
                need them most.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  title: "Accessibility",
                  description:
                    "Clean energy should be available to everyone, not just homeowners. We break down barriers to make solar accessible to all.",
                  icon: Heart,
                },
                {
                  title: "Transparency",
                  description:
                    "No hidden fees, no complicated contracts. We believe in straightforward pricing and honest communication.",
                  icon: Shield,
                },
                {
                  title: "Community First",
                  description:
                    "We prioritize local partnerships and community impact, ensuring our success benefits the neighborhoods we serve.",
                  icon: Users,
                },
              ].map((value, i) => (
                <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-14 h-14 bg-yellow-300/20 rounded-full mb-4">
                      <value.icon className="h-7 w-7 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Serving All of Illinois
              </h2>
              <p className="text-lg text-gray-600">
                We partner with both major utility providers across the state
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-300/20 rounded-lg">
                      <Zap className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">ComEd Territory</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Northern Illinois including Chicago, Aurora, Naperville, Joliet, Rockford,
                    and surrounding suburbs throughout the greater Chicagoland area.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-300/20 rounded-lg">
                      <Zap className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Ameren Territory</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Central and Southern Illinois including Springfield, Peoria, Champaign,
                    Bloomington, and surrounding areas across the heart of the state.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Illinois residents who are already saving money and supporting clean energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setSignInModalOpen(true)}
                className="rounded-md shadow-lg h-14 text-base px-8 text-accent-foreground bg-yellow-300 hover:bg-yellow-400"
              >
                Get Started Today
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-md h-14 text-base px-8 border-2 hover:bg-gray-50"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        open={signInModalOpen}
        onOpenChange={setSignInModalOpen}
        redirectTo="/onboarding"
      />
    </Layout>
  );
}
