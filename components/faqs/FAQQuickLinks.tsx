import { Button } from "@/components/ui/button";

interface FAQCategory {
  category: string;
  questions: Array<{ question: string; answer: string }>;
}

interface FAQQuickLinksProps {
  categories: FAQCategory[];
}

export default function FAQQuickLinks({ categories }: FAQQuickLinksProps) {
  return (
    <section className="max-w-5xl mx-auto">
      <p className="text-center text-sm font-medium text-muted-foreground mb-4">
        Jump to category:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => {
              const element = document.getElementById(`category-${index}`);
              element?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            {category.category}
          </Button>
        ))}
      </div>
    </section>
  );
}
