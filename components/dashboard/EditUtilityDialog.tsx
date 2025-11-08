"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3Data } from "@/lib/validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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

interface EditUtilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentData: Step3Data;
  onSuccess: () => void;
}

export default function EditUtilityDialog({
  open,
  onOpenChange,
  currentData,
  onSuccess,
}: EditUtilityDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: currentData,
  });

  const onSubmit = async (data: Step3Data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update utility information");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating utility information:", error);
      alert("Failed to update utility information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Edit Utility & Benefits</DialogTitle>
          <DialogDescription>
            Update your electric utility provider and benefit program information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="electricUtilityProvider">
              Electric Utility Provider <span className="text-red-500">*</span>
            </Label>
            <select
              id="electricUtilityProvider"
              {...register("electricUtilityProvider")}
              className={`flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
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
            <select
              id="governmentBenefitProgram"
              {...register("governmentBenefitProgram")}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
