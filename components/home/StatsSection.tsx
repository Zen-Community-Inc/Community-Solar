import { siteConfig } from "@/lib/site-config";

export default function StatsSection() {
  const stats = [
    {
      label: "Total kWh",
      value: siteConfig.stats.energyGeneratedShort,
    },
    {
      label: "CO₂ avoided",
      value: siteConfig.stats.co2AvoidedShort,
      suffix: "tons",
    },
    {
      label: "Savings",
      value: siteConfig.stats.savingsRange.display,
      highlight: true,
    },
    {
      label: "Terms",
      value: siteConfig.terms.subscriptionType,
    },
  ];

  return (
    <section className="py-6 sm:py-12 -mt-12 sm:-mt-20 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <dt className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
                {stat.label}
              </dt>
              <dd
                className={`text-xl sm:text-3xl lg:text-4xl font-bold ${
                  stat.highlight ? "text-yellow-400/90" : "text-foreground"
                }`}
              >
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm sm:text-base text-muted-foreground ml-1">
                    {stat.suffix}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
