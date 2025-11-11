import SavingsCalculator from "@/components/SavingsCalculator";

export default function SavingsSection() {
  return (
    <section className="section-sm px-4 sm:px-6 bg-gradient-to-br from-yellow-400/5 to-background rounded-2xl sm:rounded-3xl">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
          <SavingsCalculator />
        </div>
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            See your potential savings
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Our community solar program typically saves businesses 10-20% on their electricity costs. Use our
            calculator to estimate your savings based on your current monthly bill.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold">No upfront costs</p>
                <p className="text-sm text-muted-foreground">
                  Start saving immediately with zero capital investment
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold">Guaranteed savings</p>
                <p className="text-sm text-muted-foreground">
                  Lock in your discount rate for predictable monthly savings
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold">Flexible terms</p>
                <p className="text-sm text-muted-foreground">
                  Month-to-month commitment with no long-term contracts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
