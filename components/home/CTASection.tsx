import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 text-center max-w-7xl mx-auto bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-2xl sm:rounded-3xl">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
          Ready to start saving on energy costs?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
          Join hundreds of businesses and organizations that are reducing their operating expenses and environmental
          impact with community solar.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="rounded-2xl bg-yellow-400 hover:bg-yellow-400/90 text-gray-900">
            <Link href="/contact">Request a free quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl">
            <Link href="/about">Learn about our company</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
