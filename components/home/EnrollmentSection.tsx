import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EnrollmentSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Simple enrollment process
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Get started with community solar in three straightforward steps—no equipment, no installation, no hassle.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              number: "01",
              title: "Submit your information",
              description: "Share your utility account details and monthly energy usage with our team.",
            },
            {
              number: "02",
              title: "We handle the setup",
              description: "We'll allocate your portion of a local solar farm and complete all enrollment paperwork.",
            },
            {
              number: "03",
              title: "Start saving immediately",
              description:
                "Begin receiving bill credits at your guaranteed discount rate—typically within 30-60 days.",
            },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="mb-6">
                <div className="text-6xl font-bold text-yellow-400/60">{step.number}</div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              {i < 2 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-yellow-400/30" />}
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to lower your energy costs? Choose the option that best fits your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-2xl bg-yellow-400 hover:bg-yellow-400/90 text-gray-900">
              <Link href="/onboarding">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
