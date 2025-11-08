import { Profile, UserOnboarding, UserRoles, Project, FAQCategory } from './types';

// Mock users for demonstration
const mockProfiles: Record<string, Profile> = {
  'user-1': {
    id: 'user-1',
    full_name: 'John Doe',
    email: 'john@example.com',
    phone: '(312) 555-0123',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  'user-2': {
    id: 'user-2',
    full_name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(312) 555-0456',
    created_at: new Date('2024-02-20').toISOString(),
    updated_at: new Date('2024-02-20').toISOString(),
  },
  'admin-1': {
    id: 'admin-1',
    full_name: 'Admin User',
    email: 'admin@zencommunity.solar',
    phone: '(312) 555-0789',
    created_at: new Date('2023-12-01').toISOString(),
    updated_at: new Date('2023-12-01').toISOString(),
  },
};

const mockOnboarding: Record<string, UserOnboarding> = {
  'user-1': {
    id: 'onboard-1',
    user_id: 'user-1',
    current_step: 2,
    completed: true,
    address: '123 Main St',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    zip_code: '60601',
    utility_bill_url: '/mock/utility-bill-1.pdf',
    benefit_proof_url: '/mock/benefit-proof-1.pdf',
    status: 'pending',
    admin_notes: null,
    reviewed_at: null,
    reviewed_by: null,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-16').toISOString(),
  },
  'user-2': {
    id: 'onboard-2',
    user_id: 'user-2',
    current_step: 2,
    completed: true,
    address: '456 Oak Ave',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    zip_code: '62701',
    utility_bill_url: '/mock/utility-bill-2.pdf',
    benefit_proof_url: '/mock/benefit-proof-2.pdf',
    status: 'approved',
    admin_notes: 'All documents verified. Welcome to Zen Solar!',
    reviewed_at: new Date('2024-02-21').toISOString(),
    reviewed_by: 'admin-1',
    created_at: new Date('2024-02-20').toISOString(),
    updated_at: new Date('2024-02-21').toISOString(),
  },
};

const mockRoles: Record<string, UserRoles> = {
  'user-1': {
    id: 'role-1',
    user_id: 'user-1',
    role: 'user',
    created_at: new Date('2024-01-15').toISOString(),
  },
  'user-2': {
    id: 'role-2',
    user_id: 'user-2',
    role: 'user',
    created_at: new Date('2024-02-20').toISOString(),
  },
  'admin-1': {
    id: 'role-3',
    user_id: 'admin-1',
    role: 'admin',
    created_at: new Date('2023-12-01').toISOString(),
  },
};

// Store for localStorage
export const STORAGE_KEYS = {
  AUTH_USER: 'zen_solar_auth_user',
  PROFILES: 'zen_solar_profiles',
  ONBOARDING: 'zen_solar_onboarding',
  ROLES: 'zen_solar_roles',
};

// Initialize mock data in localStorage
export function initializeMockData() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(mockProfiles));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ONBOARDING)) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(mockOnboarding));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(mockRoles));
  }
}

// Get data from localStorage with fallback to mock data
export function getProfiles(): Record<string, Profile> {
  if (typeof window === 'undefined') return mockProfiles;
  const stored = localStorage.getItem(STORAGE_KEYS.PROFILES);
  return stored ? JSON.parse(stored) : mockProfiles;
}

export function getOnboarding(): Record<string, UserOnboarding> {
  if (typeof window === 'undefined') return mockOnboarding;
  const stored = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
  return stored ? JSON.parse(stored) : mockOnboarding;
}

export function getRoles(): Record<string, UserRoles> {
  if (typeof window === 'undefined') return mockRoles;
  const stored = localStorage.getItem(STORAGE_KEYS.ROLES);
  return stored ? JSON.parse(stored) : mockRoles;
}

export function saveProfiles(profiles: Record<string, Profile>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
}

export function saveOnboarding(onboarding: Record<string, UserOnboarding>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(onboarding));
}

export function saveRoles(roles: Record<string, UserRoles>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
}

// Project mock data
export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Prairie Ridge Solar',
    capacity: '4.5 MW',
    location: 'DeKalb County',
    county: 'DeKalb County',
    utility: 'ComEd',
    status: 'Active',
    impact: '9.8M kWh annually, 7,000 tons CO₂ offset',
    description: 'Serving over 800 ComEd subscribers in Northern Illinois with clean, affordable energy.',
  },
  {
    id: 'proj-2',
    name: 'Fox River Solar',
    capacity: '3.2 MW',
    location: 'Kane County',
    county: 'Kane County',
    utility: 'Ameren',
    status: 'Active',
    impact: '7.1M kWh annually, 5,100 tons CO₂ offset',
    description: 'Providing renewable energy credits to Ameren customers throughout Central Illinois.',
  },
  {
    id: 'proj-3',
    name: 'Lakeview Community Solar',
    capacity: '5.0 MW',
    location: 'Lake County',
    county: 'Lake County',
    utility: 'ComEd',
    status: 'Under Construction',
    impact: '11.2M kWh annually (projected), 8,000 tons CO₂ offset',
    description: 'Our newest project, bringing community solar benefits to over 1,000 Lake County residents.',
  },
];

// FAQ mock data
export const mockFAQs: FAQCategory[] = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'What is community solar?',
        answer: 'Community solar allows you to support local renewable energy and save money on your electricity bill without installing panels on your property. You subscribe to a portion of a nearby solar farm and receive credits on your utility bill for the energy it produces.',
      },
      {
        question: 'Who is eligible to enroll?',
        answer: 'Illinois residents and businesses served by ComEd or Ameren Illinois are eligible. To qualify for our program, you must be enrolled in a government assistance program such as SNAP, Medicaid, SSI, LIHEAP, or housing assistance.',
      },
      {
        question: 'How do I sign up?',
        answer: 'Click "Check Eligibility" to enter your zip code, then complete our simple enrollment form. You\'ll need to upload a recent utility bill and proof of benefit enrollment. Our team will review your application and notify you of approval within 3-5 business days.',
      },
    ],
  },
  {
    category: 'Savings & Billing',
    questions: [
      {
        question: 'How much can I save?',
        answer: 'Subscribers typically save 10-20% on their electricity costs. Your exact savings depend on your utility provider, current electricity usage, and the solar farm\'s production. Use our savings calculator to get a personalized estimate.',
      },
      {
        question: 'How does billing work?',
        answer: 'You\'ll continue receiving your regular utility bill from ComEd or Ameren. Solar credits will appear as a line item discount. You\'ll also receive a separate monthly statement from Zen Solar for your subscription, which is always less than the credits you receive.',
      },
      {
        question: 'Are there any upfront costs?',
        answer: 'No! There are no installation fees, equipment costs, or upfront payments. You simply pay a discounted rate for the solar energy produced by your share of the community solar farm.',
      },
    ],
  },
  {
    category: 'Enrollment & Requirements',
    questions: [
      {
        question: 'What documents do I need to enroll?',
        answer: 'You\'ll need: (1) A recent utility bill from ComEd or Ameren Illinois, and (2) Proof of enrollment in a qualifying assistance program (SNAP card, Medicaid card, SSI statement, LIHEAP documentation, or housing assistance letter).',
      },
      {
        question: 'Can renters participate?',
        answer: 'Yes! Community solar is perfect for renters because you don\'t need to own your property or get landlord approval. You just need to have a ComEd or Ameren electricity account in your name.',
      },
      {
        question: 'What utilities do you work with?',
        answer: 'We currently serve customers of ComEd (Northern Illinois) and Ameren Illinois (Central and Southern Illinois). Check our coverage map to confirm your address is eligible.',
      },
    ],
  },
  {
    category: 'Contract & Flexibility',
    questions: [
      {
        question: 'Is there a long-term contract?',
        answer: 'No! Our subscriptions are month-to-month with no long-term commitment. You can cancel anytime with 30 days\' notice if your circumstances change.',
      },
      {
        question: 'What happens if I move?',
        answer: 'If you move within the same utility service territory (ComEd or Ameren Illinois), we can transfer your subscription to your new address at no charge. If you move outside the service area, you can cancel without penalty.',
      },
      {
        question: 'How is this different from rooftop solar?',
        answer: 'Unlike rooftop solar, community solar requires no installation, no maintenance, no equipment on your property, and no homeownership. It\'s flexible, affordable, and perfect for renters, condo owners, or anyone who can\'t install panels.',
      },
    ],
  },
];

// US States for address form
export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];
