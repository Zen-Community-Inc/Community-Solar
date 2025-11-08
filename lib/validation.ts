import { z } from "zod";

// Step 1: Basic Information
export const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Step 2: Service Location
export const step2Schema = z.object({
  serviceAddress: z.string().min(1, "Service address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required").max(2),
});

// Step 3: Utility & Benefits
export const step3Schema = z.object({
  electricUtilityProvider: z.string().min(1, "Electric utility provider is required"),
  governmentBenefitProgram: z.string().optional(),
});

// Complete onboarding data schema
export const onboardingSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
