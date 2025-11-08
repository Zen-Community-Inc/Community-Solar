"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import FAQHero from "@/components/faqs/FAQHero";
import FAQQuickLinks from "@/components/faqs/FAQQuickLinks";
import FAQCategory from "@/components/faqs/FAQCategory";
import FAQEmptyState from "@/components/faqs/FAQEmptyState";
import FAQCTA from "@/components/faqs/FAQCTA";
import { faqCategories } from "@/lib/faq-data";

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 py-8 lg:py-12">
          <FAQHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <FAQQuickLinks categories={faqCategories} />

          <section className="max-w-5xl mx-auto space-y-12 lg:space-y-16">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => (
                <FAQCategory
                  key={categoryIndex}
                  category={category.category}
                  questions={category.questions}
                  categoryIndex={categoryIndex}
                />
              ))
            ) : (
              <FAQEmptyState
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
              />
            )}
          </section>

          <FAQCTA />
        </div>
      </div>
    </Layout>
  );
}
