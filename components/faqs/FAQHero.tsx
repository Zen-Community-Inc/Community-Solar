import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function FAQHero({ searchQuery, onSearchChange }: FAQHeroProps) {
  return (
    <section className="text-center space-y-6 lg:space-y-8 max-w-4xl mx-auto pt-4 lg:pt-8">
      <div className="space-y-4">
        <div className="inline-block">
          <span className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-foreground">
            💡 Find Answers
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about community solar enrollment, savings, and how it works.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto pt-2">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-yellow-500 transition-colors" />
          <Input
            type="text"
            placeholder="Search questions... (e.g., savings, enrollment, contract)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-14 pr-4 h-14 text-base rounded-2xl border-2 shadow-sm focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
