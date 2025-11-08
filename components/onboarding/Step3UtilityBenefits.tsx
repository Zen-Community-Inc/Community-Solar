"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step3Data, step3Schema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Step3Props {
  data: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const UTILITY_PROVIDERS = [
  "ComEd (Commonwealth Edison)",
  "Ameren Illinois",
  "Other",
];

const BENEFIT_PROGRAMS = [
  "None",
  "SNAP (Supplemental Nutrition Assistance Program)",
  "Medicaid",
  "SSI (Supplemental Security Income)",
  "LIHEAP (Low Income Home Energy Assistance Program)",
  "Federal Public Housing Assistance",
  "Veterans Pension or Survivors Benefit",
  "Other",
];

export default function Step3UtilityBenefits({ data, onNext, onBack }: Step3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Utility & Benefits Information
        </h2>
        <p className="text-gray-600">
          Help us understand your current utility provider and any benefit programs you&apos;re enrolled in.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="electricUtilityProvider">
          Electric Utility Provider <span className="text-red-500">*</span>
        </Label>
        <select
          id="electricUtilityProvider"
          {...register("electricUtilityProvider")}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.electricUtilityProvider ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Provider</option>
          {UTILITY_PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        {errors.electricUtilityProvider && (
          <p className="text-sm text-red-500">{errors.electricUtilityProvider.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="governmentBenefitProgram">
          Government Benefit Program (Optional)
        </Label>
        <p className="text-sm text-gray-500 mb-2">
          Some utility programs offer additional discounts for benefit recipients.
        </p>
        <select
          id="governmentBenefitProgram"
          {...register("governmentBenefitProgram")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {BENEFIT_PROGRAMS.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
        {errors.governmentBenefitProgram && (
          <p className="text-sm text-red-500">{errors.governmentBenefitProgram.message}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Privacy Note:</strong> Your benefit program information is kept confidential and
          is only used to determine if you qualify for additional savings.
        </p>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="px-8"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
}
