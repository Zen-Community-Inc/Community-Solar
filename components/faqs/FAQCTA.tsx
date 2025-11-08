import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQCTA() {
  return (
    <section className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 rounded-3xl p-8 sm:p-10 lg:p-14 text-center shadow-lg">
      <div className="text-5xl mb-6">💬</div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
        Still Have Questions?
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto">
        Our team is ready to answer your specific questions and help you understand how community solar can work for your organization.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Button asChild size="lg" className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-400/90 text-gray-900 shadow-md hover:shadow-lg transition-all">
          <Link href="/contact">Contact us</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto hover:bg-yellow-400/10 hover:border-yellow-400 transition-all">
          <Link href="/about">Learn more</Link>
        </Button>
      </div>
    </section>
  );
}
