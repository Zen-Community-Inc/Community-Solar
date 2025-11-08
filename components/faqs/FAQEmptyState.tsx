import { Button } from "@/components/ui/button";

interface FAQEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export default function FAQEmptyState({ searchQuery, onClearSearch }: FAQEmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-xl font-semibold text-foreground mb-2">
        No questions found
      </p>
      <p className="text-muted-foreground mb-6">
        We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;
      </p>
      <Button
        variant="outline"
        onClick={onClearSearch}
        className="rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-0"
      >
        Clear search and browse all questions
      </Button>
    </div>
  );
}
