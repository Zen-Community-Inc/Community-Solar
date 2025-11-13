import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CommunitySolarSection from "@/components/home/CommunitySolarSection";
import SavingsSection from "@/components/home/SavingsSection";
import EnrollmentSection from "@/components/home/EnrollmentSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import IndustrySolutionsSection from "@/components/home/IndustrySolutionsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { generatePageMetadata, pageMetadata } from "@/lib/seo-config";
import { LocalBusinessStructuredData, ServiceStructuredData } from "@/components/StructuredData";

export const metadata = generatePageMetadata(pageMetadata.home);

export default function Home() {
  return (
    <>
      <LocalBusinessStructuredData />
      <ServiceStructuredData />
      <Layout>
        <HeroSection />
        <StatsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 section-sm">
        <CommunitySolarSection />
        <SavingsSection />
      </div>

      <EnrollmentSection />
      <WhyChooseUsSection />
      <IndustrySolutionsSection />
      <FAQSection />
      <CTASection />
      </Layout>
    </>
  );
}
