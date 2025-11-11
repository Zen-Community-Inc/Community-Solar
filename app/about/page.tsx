"use client";

import { useState } from "react";
import { Users, Zap, Leaf, TrendingUp, Target } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/common/PageHero";
import StatsGrid from "@/components/common/StatsGrid";
import FeatureCard from "@/components/common/FeatureCard";
import CTASection from "@/components/common/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import SignInModal from "@/components/SignInModal";
import { siteConfig } from "@/lib/site-config";
import { aboutContent } from "@/lib/content/about-content";

export default function About() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const stats = [
    {
      value: siteConfig.stats.subscribers,
      label: "Subscribers",
      icon: Users,
    },
    {
      value: siteConfig.stats.totalCapacity,
      label: "Total Capacity",
      icon: Zap,
    },
    {
      value: siteConfig.stats.co2AvoidedShort,
      label: "Tons CO₂ Saved",
      icon: Leaf,
    },
    {
      value: siteConfig.stats.satisfactionRate,
      label: "Satisfaction Rate",
      icon: TrendingUp,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <PageHero
          badge={aboutContent.hero.badge}
          title={aboutContent.hero.title}
          subtitle={aboutContent.hero.subtitle}
          variant="gradient"
        />

        {/* Stats Section */}
        <section className="section-md bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsGrid stats={stats} columns={4} variant="shadow" />
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-lg bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300/20 rounded-full mb-4">
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {aboutContent.mission.title}
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full" />
            </div>
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              {aboutContent.mission.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-lg bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {aboutContent.values.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {aboutContent.values.subtitle}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {aboutContent.values.items.map((value, i) => (
                <FeatureCard
                  key={i}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  variant="hover"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="section-lg bg-gradient-to-br from-yellow-50/80 via-white to-yellow-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {aboutContent.coverage.title}
              </h2>
              <p className="text-lg text-gray-600">
                {aboutContent.coverage.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {aboutContent.coverage.areas.map((area, i) => (
                <Card
                  key={i}
                  className="border-0 shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-yellow-300/20 rounded-full">
                        <area.icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={aboutContent.cta.title}
          subtitle={aboutContent.cta.subtitle}
          primaryButton={{
            text: aboutContent.cta.primaryButton.text,
            onClick: () => setSignInModalOpen(true),
          }}
          secondaryButton={{
            text: aboutContent.cta.secondaryButton.text,
            href: aboutContent.cta.secondaryButton.href,
          }}
          variant="white"
        />
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
