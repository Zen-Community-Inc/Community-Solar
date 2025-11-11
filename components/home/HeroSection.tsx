"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";
import { siteConfig } from "@/lib/site-config";
import { homeContent } from "@/lib/content/home-content";

export default function HeroSection() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] flex items-center overflow-hidden">
      <Image
        src={homeContent.hero.image.src}
        alt={homeContent.hero.image.alt}
        fill
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        priority
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/60" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 py-12 sm:py-16 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-300/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">
              {homeContent.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2rem] font-bold sm:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-6 tracking-tight">
            {homeContent.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-8 max-w-xl">
            {homeContent.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setSignInModalOpen(true)}
              className="rounded-lg h-14 text-base px-8"
            >
              {homeContent.hero.primaryButton.text}
            </Button>
            <Link href={homeContent.hero.secondaryButton.href}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg h-14 text-base px-8"
              >
                {homeContent.hero.secondaryButton.text}
              </Button>
            </Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 fill-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              {siteConfig.stats.rating}/5 from {siteConfig.stats.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        open={signInModalOpen}
        onOpenChange={setSignInModalOpen}
        redirectTo="/onboarding"
      />
    </section>
  );
}
