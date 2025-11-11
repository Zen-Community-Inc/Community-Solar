import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CommunitySolarSection() {
  return (
    <section className="section-sm px-0">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            What is community solar?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Community solar allows you to benefit from solar energy without
            installing panels on your property. Instead, you subscribe to a
            portion of a local solar farm and receive credits on your utility
            bill.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  No installation required
                </h3>
                <p className="text-muted-foreground">
                  Subscribe to a nearby solar farm—no rooftop panels, no
                  equipment costs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Immediate savings
                </h3>
                <p className="text-muted-foreground">
                  Receive bill credits at a guaranteed discount—typically
                  10-20% off your utility charges.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Flexible commitment
                </h3>
                <p className="text-muted-foreground">
                  Month-to-month terms with no long-term contracts or
                  penalties.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto rounded-md bg-yellow-400/90">
                Start saving today
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/assets/community-solar-explained.jpg"
            alt="Community solar illustration showing solar farm connected to residential and commercial buildings"
            width={600}
            height={400}
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
