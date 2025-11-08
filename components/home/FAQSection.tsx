import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto bg-muted/30 rounded-2xl sm:rounded-3xl">
      <header className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Frequently asked questions
        </h2>
      </header>
      <div className="max-w-3xl mx-auto space-y-6">
        {[
          {
            question: "Do I need to install anything on my property?",
            answer:
              "No installation required. You subscribe to a share of a nearby solar farm, and credits are automatically applied to your utility bill.",
          },
          {
            question: "How much can I save?",
            answer:
              "Most businesses save 10-20% on their electricity costs. Your exact savings depend on your utility provider, usage patterns, and program availability.",
          },
          {
            question: "What happens if I move or close a location?",
            answer:
              "Our month-to-month terms give you flexibility. You can adjust or cancel your subscription without penalties or long-term commitments.",
          },
          {
            question: "Which utilities do you work with?",
            answer:
              "We currently serve ComEd and Ameren territories. Contact us to confirm program availability for your specific location and utility account.",
          },
        ].map((faq, i) => (
          <Card key={i} className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/faqs">View all FAQs</Link>
        </Button>
      </div>
    </section>
  );
}
