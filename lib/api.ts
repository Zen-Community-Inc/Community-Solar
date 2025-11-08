import {
  Profile,
  UserOnboarding,
  AuthUser,
  SignUpData,
  EnrollmentStatus,
  OnboardingStepOneData,
  OnboardingStepTwoData
} from './types';
import {
  getProfiles,
  getOnboarding,
  getRoles,
  saveProfiles,
  saveOnboarding,
  saveRoles,
  STORAGE_KEYS
} from './mock-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication functions
export const mockAuth = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(email: string, _password: string): Promise<AuthUser> {
    await delay(800);

    const profiles = getProfiles();
    const roles = getRoles();

    // Find user by email
    const profile = Object.values(profiles).find(p => p.email === email);

    if (!profile) {
      throw new Error('Invalid email or password');
    }

    // In a real app, we'd verify the password. For mock, accept any password.
    const userRole = roles[profile.id]?.role || 'user';

    const authUser: AuthUser = {
      id: profile.id,
      email: profile.email!,
      profile,
      role: userRole,
    };

    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
    }

    return authUser;
  },

  async signUp(data: SignUpData): Promise<AuthUser> {
    await delay(1000);

    const profiles = getProfiles();
    const roles = getRoles();
    const onboarding = getOnboarding();

    // Check if email already exists
    const existingProfile = Object.values(profiles).find(p => p.email === data.email);
    if (existingProfile) {
      throw new Error('Email already registered');
    }

    // Generate new user ID
    const userId = `user-${Date.now()}`;
    const now = new Date().toISOString();

    // Create profile
    const newProfile: Profile = {
      id: userId,
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      created_at: now,
      updated_at: now,
    };

    // Create role
    roles[userId] = {
      id: `role-${Date.now()}`,
      user_id: userId,
      role: 'user',
      created_at: now,
    };

    // Create initial onboarding record
    onboarding[userId] = {
      id: `onboard-${Date.now()}`,
      user_id: userId,
      current_step: 0,
      completed: false,
      address: null,
      city: null,
      state: null,
      zip: null,
      zip_code: null,
      utility_bill_url: null,
      benefit_proof_url: null,
      status: null,
      admin_notes: null,
      reviewed_at: null,
      reviewed_by: null,
      created_at: now,
      updated_at: now,
    };

    // Save to localStorage
    profiles[userId] = newProfile;
    saveProfiles(profiles);
    saveRoles(roles);
    saveOnboarding(onboarding);

    const authUser: AuthUser = {
      id: userId,
      email: newProfile.email!,
      profile: newProfile,
      role: 'user',
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
    }

    return authUser;
  },

  async signOut(): Promise<void> {
    await delay(300);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return stored ? JSON.parse(stored) : null;
  },
};

// Profile API
export const profileAPI = {
  async updateProfile(userId: string, data: Partial<Profile>): Promise<Profile> {
    await delay(500);

    const profiles = getProfiles();
    const profile = profiles[userId];

    if (!profile) {
      throw new Error('Profile not found');
    }

    const updatedProfile = {
      ...profile,
      ...data,
      updated_at: new Date().toISOString(),
    };

    profiles[userId] = updatedProfile;
    saveProfiles(profiles);

    // Update auth user in localStorage
    const authUser = mockAuth.getCurrentUser();
    if (authUser && authUser.id === userId) {
      authUser.profile = updatedProfile;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
      }
    }

    return updatedProfile;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    await delay(300);
    const profiles = getProfiles();
    return profiles[userId] || null;
  },
};

// Onboarding API
export const onboardingAPI = {
  async getOnboarding(userId: string): Promise<UserOnboarding | null> {
    await delay(300);
    const onboarding = getOnboarding();
    return onboarding[userId] || null;
  },

  async uploadDocuments(userId: string, data: OnboardingStepOneData): Promise<UserOnboarding> {
    await delay(1500); // Simulate file upload

    const onboarding = getOnboarding();
    let userOnboarding = onboarding[userId];

    if (!userOnboarding) {
      throw new Error('Onboarding record not found');
    }

    // Convert files to mock URLs (in real app, would upload to storage)
    const utilityBillUrl = data.utilityBillFile
      ? `/mock/utility-bill-${userId}-${Date.now()}.pdf`
      : userOnboarding.utility_bill_url;

    const benefitProofUrl = data.benefitProofFile
      ? `/mock/benefit-proof-${userId}-${Date.now()}.pdf`
      : userOnboarding.benefit_proof_url;

    userOnboarding = {
      ...userOnboarding,
      utility_bill_url: utilityBillUrl,
      benefit_proof_url: benefitProofUrl,
      current_step: 1,
      updated_at: new Date().toISOString(),
    };

    onboarding[userId] = userOnboarding;
    saveOnboarding(onboarding);

    return userOnboarding;
  },

  async updateAddress(userId: string, data: OnboardingStepTwoData): Promise<UserOnboarding> {
    await delay(500);

    const onboarding = getOnboarding();
    let userOnboarding = onboarding[userId];

    if (!userOnboarding) {
      throw new Error('Onboarding record not found');
    }

    userOnboarding = {
      ...userOnboarding,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      zip_code: data.zip,
      current_step: 2,
      completed: true,
      status: 'pending',
      updated_at: new Date().toISOString(),
    };

    onboarding[userId] = userOnboarding;
    saveOnboarding(onboarding);

    return userOnboarding;
  },
};

// Admin API
export const adminAPI = {
  async getAllEnrollments(): Promise<Array<UserOnboarding & { profile: Profile }>> {
    await delay(500);

    const onboarding = getOnboarding();
    const profiles = getProfiles();

    return Object.values(onboarding)
      .filter(o => o.completed)
      .map(o => ({
        ...o,
        profile: profiles[o.user_id],
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async updateEnrollmentStatus(
    enrollmentId: string,
    status: EnrollmentStatus,
    adminNotes: string,
    adminId: string
  ): Promise<UserOnboarding> {
    await delay(500);

    const onboarding = getOnboarding();
    const enrollment = Object.values(onboarding).find(o => o.id === enrollmentId);

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    const updatedEnrollment: UserOnboarding = {
      ...enrollment,
      status,
      admin_notes: adminNotes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminId,
      updated_at: new Date().toISOString(),
    };

    onboarding[enrollment.user_id] = updatedEnrollment;
    saveOnboarding(onboarding);

    return updatedEnrollment;
  },

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    await delay(500);

    const onboarding = getOnboarding();
    const enrollment = Object.values(onboarding).find(o => o.id === enrollmentId);

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    delete onboarding[enrollment.user_id];
    saveOnboarding(onboarding);
  },
};

// File upload simulation
export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
