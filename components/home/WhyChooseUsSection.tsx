import { Card, CardContent } from "@/components/ui/card";

export default function WhyChooseUsSection() {
  return (
    <section className="section-sm px-4 sm:px-6 max-w-7xl mx-auto bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5 rounded-2xl sm:rounded-3xl">
      <header className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Why leading organizations choose us
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Proven expertise, transparent pricing, and dedicated support for your energy needs.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            title: "Proven Track Record",
            description:
              "Over 18.9 million kWh generated, helping businesses avoid 13,400 metric tons of CO₂ emissions.",
            icon: "📊",
          },
          {
            title: "Zero Capital Investment",
            description:
              "No upfront costs, no installation fees, no maintenance expenses—just immediate savings on your energy bills.",
            icon: "💰",
          },
          {
            title: "Flexible & Scalable",
            description:
              "Month-to-month terms with the ability to scale your allocation as your business grows or changes.",
            icon: "📈",
          },
          {
            title: "Local Solar Farms",
            description:
              "Support your local economy while reducing your carbon footprint through community-based renewable energy.",
            icon: "🌱",
          },
          {
            title: "Dedicated Support",
            description:
              "Expert guidance throughout enrollment and ongoing account management to maximize your savings.",
            icon: "🤝",
          },
          {
            title: "Transparent Reporting",
            description:
              "Clear billing statements and regular updates on your energy production and environmental impact.",
            icon: "📋",
          },
        ].map((benefit, i) => (
          <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
