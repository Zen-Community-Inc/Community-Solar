// Database types based on the original Supabase schema

export type UserRole = 'admin' | 'user';

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected' | 'resubmit_required';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserOnboarding {
  id: string;
  user_id: string;
  current_step: number | null;
  completed: boolean | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  zip_code: string | null;
  utility_bill_url: string | null;
  benefit_proof_url: string | null;
  status: EnrollmentStatus | null;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoles {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: Profile;
  role: UserRole;
}

// Mock authentication context
export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
}

// Forms data types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  utility: 'comed' | 'ameren' | 'other';
  bill: string;
  message: string;
}

export interface OnboardingStepOneData {
  utilityBillFile: File | null;
  benefitProofFile: File | null;
  utilityBillUrl?: string;
  benefitProofUrl?: string;
}

export interface OnboardingStepTwoData {
  address: string;
  city: string;
  state: string;
  zip: string;
}

// Project data
export interface Project {
  id: string;
  name: string;
  capacity: string;
  location: string;
  county: string;
  utility: 'ComEd' | 'Ameren';
  status: 'Active' | 'Under Construction' | 'Planned';
  impact: string;
  description?: string;
}

// FAQ data
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQ[];
}
