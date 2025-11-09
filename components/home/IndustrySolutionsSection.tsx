import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IndustrySolutionsSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-0 max-w-7xl mx-auto">
      <header className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Tailored solutions for your industry
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Purpose-built programs designed for the unique energy needs of different sectors.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Multifamily & HOAs",
            description:
              "Reduce common area electricity costs and offer savings to residents. Ideal for property managers overseeing multiple meters.",
            features: ["Bulk allocation options", "Resident enrollment support", "Simplified billing"],
          },
          {
            title: "Commercial & Retail",
            description:
              "Lower operating expenses across your store locations without disrupting operations or requiring capital investment.",
            features: ["Multi-location support", "Predictable cost savings", "No business interruption"],
          },
          {
            title: "Nonprofit & Municipal",
            description:
              "Maximize your budget impact with guaranteed discounts while demonstrating environmental leadership.",
            features: ["Special nonprofit rates", "Transparent reporting", "Community benefit focus"],
          },
        ].map((solution, i) => (
          <Card key={i} className="border-2 border-transparent shadow-md hover:border-yellow-400 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl">{solution.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{solution.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {solution.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-6" variant="outline">
                <Link href="/contact">Contact us</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
