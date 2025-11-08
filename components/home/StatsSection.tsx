export default function StatsSection() {
  return (
    <section className="py-6 sm:py-12 -mt-12 sm:-mt-20 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <dt className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
              Total kWh
            </dt>
            <dd className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              18.9M
            </dd>
          </div>
          <div className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <dt className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
              CO₂ avoided
            </dt>
            <dd className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              13.4K
              <span className="text-sm sm:text-base text-muted-foreground ml-1">
                tons
              </span>
            </dd>
          </div>
          <div className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <dt className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
              Savings
            </dt>
            <dd className="text-xl sm:text-3xl lg:text-4xl font-bold text-yellow-400/90">
              10–20%
            </dd>
          </div>
          <div className="bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <dt className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
              Terms
            </dt>
            <dd className="text-base sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">
              Month-to-month
            </dd>
          </div>
        </div>
      </div>
    </section>
  );
}
