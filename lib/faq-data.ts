export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is community solar?",
        answer:
          "Community solar allows you to benefit from solar energy without installing panels on your property. You subscribe to a share of a local solar farm and receive credits on your utility bill for the energy produced.",
      },
      {
        question: "Do I need panels on my roof?",
        answer:
          "No—community solar uses offsite farms. You keep your current utility and simply receive bill credits from the solar energy generated.",
      },
      {
        question: "Will this switch my utility provider?",
        answer:
          "No. You remain a customer of your current utility (ComEd or Ameren). Community solar works alongside your existing utility service.",
      },
    ],
  },
  {
    category: "Savings & Billing",
    questions: [
      {
        question: "How are savings calculated?",
        answer:
          "You purchase bill credits at a discount (typically 10–20% below retail rate). When your utility applies those credits to your bill, the difference between what you paid and the retail value equals your savings.",
      },
      {
        question: "How are savings guaranteed?",
        answer:
          "The discount rate is locked in your contract. You always pay less for the bill credits than their face value, guaranteeing savings regardless of utility rate changes.",
      },
      {
        question: "What if my energy usage changes?",
        answer:
          "Your subscription can be adjusted to match your usage patterns. We can resize your allocation if you move to a larger facility or your consumption increases.",
      },
    ],
  },
  {
    category: "Enrollment & Requirements",
    questions: [
      {
        question: "Is there a credit check?",
        answer:
          "A soft credit check may be required by some programs to determine deposit requirements. It doesn't affect your credit score.",
      },
      {
        question: "Can we enroll multiple meters?",
        answer:
          "Yes—ideal for portfolios and organizations with multiple locations. We'll allocate capacity per meter and provide consolidated reporting.",
      },
      {
        question: "What's the enrollment process?",
        answer:
          "Simply provide your utility account information, choose your subscription size, and sign the agreement. Enrollment typically takes 1-2 billing cycles to activate.",
      },
    ],
  },
  {
    category: "Contract & Flexibility",
    questions: [
      {
        question: "What if we move or close a site?",
        answer:
          "You can reassign your subscription to another meter in the same utility territory, or cancel with proper notice per program terms (typically 30-90 days).",
      },
      {
        question: "What's the contract length?",
        answer:
          "Most programs offer 1-3 year terms with options to renew. We also offer month-to-month agreements for qualified commercial accounts.",
      },
      {
        question: "Are there cancellation fees?",
        answer:
          "Terms vary by program. Many offer flexible cancellation with 60-90 days notice. Enterprise contracts may have different terms negotiated upfront.",
      },
    ],
  },
];
