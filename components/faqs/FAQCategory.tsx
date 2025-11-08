import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  category: string;
  questions: FAQ[];
  categoryIndex: number;
}

export default function FAQCategory({ category, questions, categoryIndex }: FAQCategoryProps) {
  return (
    <div
      id={`category-${categoryIndex}`}
      className="space-y-6 scroll-mt-24 animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${categoryIndex * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1 border-b-2 border-yellow-400/30" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {category}
        </h2>
        <div className="flex-1 border-b-2 border-yellow-400/30" />
      </div>
      <div className="text-center">
        <span className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full text-sm font-medium text-yellow-700">
          {questions.length} {questions.length === 1 ? "question" : "questions"}
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {questions.map((faq, faqIndex) => (
          <AccordionItem
            key={faqIndex}
            value={`item-${categoryIndex}-${faqIndex}`}
            className="border border-gray-200 rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold hover:text-yellow-600 py-5 hover:no-underline group">
              <span className="flex items-start gap-3">
                <span className="mt-0.5 text-yellow-400 group-hover:scale-110 transition-transform">
                  ❓
                </span>
                <span>{faq.question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-9">
              <div className="border-l-2 border-yellow-400/30 pl-4">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
