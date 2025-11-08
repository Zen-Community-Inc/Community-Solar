"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1BasicInfo from "@/components/onboarding/Step1BasicInfo";
import Step2Location from "@/components/onboarding/Step2Location";
import Step3UtilityBenefits from "@/components/onboarding/Step3UtilityBenefits";
import Step4BillUpload from "@/components/onboarding/Step4BillUpload";
import Step5Confirmation from "@/components/onboarding/Step5Confirmation";
import {
  Step1Data,
  Step2Data,
  Step3Data,
  OnboardingData,
} from "@/lib/validation";
import { uploadBill } from "@/lib/storage";

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [step1Data, setStep1Data] = useState<Partial<Step1Data>>({});
  const [step2Data, setStep2Data] = useState<Partial<Step2Data>>({});
  const [step3Data, setStep3Data] = useState<Partial<Step3Data>>({});
  const [billFiles, setBillFiles] = useState<File[]>([]);

  // Track if partial data has been sent
  const partialDataSentRef = useRef(false);
  const completedDataSentRef = useRef(false);

  // Check authentication and existing lead
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?redirect=/onboarding");
    } else if (session?.user) {
      checkExistingLead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending, router]);

  const checkExistingLead = async () => {
    try {
      const response = await fetch("/api/lead");
      if (response.ok) {
        const data = await response.json();
        if (data.lead?.onboardingCompleted) {
          // User already completed onboarding, redirect to dashboard
          router.push("/dashboard");
        }
      }
    } catch (error) {
      // If error (404), user hasn't completed onboarding, continue

      console.log(`No existing lead found, showing onboarding ${error}`);
    }
  };

  // Pre-fill email from session
  useEffect(() => {
    if (session?.user?.email && !step1Data.email) {
      setStep1Data((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [session, step1Data.email]);

  // Function to send partial data to webhook
  const sendPartialData = useCallback(
    async (step: number) => {
      if (!session?.user?.id || partialDataSentRef.current) return;

      try {
        const partialData = {
          ...step1Data,
          ...step2Data,
          ...step3Data,
        };

        // Only send if we have at least some data
        if (Object.keys(partialData).length === 0) return;

        // Prepare basic bill info (file names only for partial data)
        const billsInfo = billFiles.map((file, index) => ({
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          index: index + 1,
        }));

        await fetch("/api/webhooks/lead-submitted", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "lead.partial",
            completed: false,
            currentStep: step,
            userId: session.user.id,
            ...partialData,
            billCount: billFiles.length,
            bills: billsInfo,
          }),
        });

        partialDataSentRef.current = true;
      } catch (error) {
        console.error("Failed to send partial data:", error);
      }
    },
    [session, step1Data, step2Data, step3Data, billFiles]
  );

  // Send partial data on page exit/unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only send if user hasn't completed and has some data
      if (
        !completedDataSentRef.current &&
        (Object.keys(step1Data).length > 0 ||
          Object.keys(step2Data).length > 0 ||
          Object.keys(step3Data).length > 0)
      ) {
        sendPartialData(currentStep);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendPartialData(currentStep);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentStep, step1Data, step2Data, step3Data, sendPartialData]);

  // Auto-save on each step completion
  const handleStep1Next = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
    // Reset partial data sent flag to allow sending updated data
    partialDataSentRef.current = false;
  };

  const handleStep2Next = (data: Step2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
    partialDataSentRef.current = false;
  };

  const handleStep3Next = (data: Step3Data) => {
    setStep3Data(data);
    setCurrentStep(4);
    partialDataSentRef.current = false;
  };

  const handleStep4Next = (files: File[]) => {
    setBillFiles(files);
    setCurrentStep(5);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) return;

    setIsSubmitting(true);

    try {
      // Combine all form data
      const onboardingData: OnboardingData = {
        ...(step1Data as Step1Data),
        ...(step2Data as Step2Data),
        ...(step3Data as Step3Data),
      };

      // Submit onboarding data FIRST to create the Lead
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...onboardingData,
          userId: session.user.id,
          bills: [], // Empty bills array initially
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit onboarding data");
      }

      // NOW upload bills after Lead is created
      let billsData: Array<{
        fileName: string;
        fileUrl: string;
        fileSize: number;
        mimeType: string;
      }> = [];

      if (billFiles.length > 0) {
        const billUploadPromises = billFiles.map((file) =>
          uploadBill(file)
        );
        const uploadResults = await Promise.all(billUploadPromises);

        // Check for upload errors
        const failedUploads = uploadResults.filter((result) => !result.success);
        if (failedUploads.length > 0) {
          // Log detailed error information
          console.error("Bill upload failures:", failedUploads);
          const errorMessages = failedUploads.map((r) => r.error).join(", ");
          console.warn(
            `Warning: Failed to upload ${failedUploads.length} bill(s): ${errorMessages}`
          );
          // Don't throw error - continue with successful uploads
        }

        // Prepare bill data for database
        billsData = uploadResults
          .filter((result) => result.success)
          .map((result) => ({
            fileName: result.fileName!,
            fileUrl: result.fileUrl!,
            fileSize: result.fileSize!,
            mimeType: result.mimeType!,
          }));
      }

      // Prepare bill info for webhook (Zapier will download from URLs)
      const billsInfo = billsData.map((bill, index) => ({
        fileName: bill.fileName,
        fileUrl: bill.fileUrl,
        fileSize: bill.fileSize,
        mimeType: bill.mimeType,
        index: index + 1,
      }));

      // Trigger webhook for Zapier - COMPLETED FORM
      await fetch("/api/webhooks/lead-submitted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "lead.completed",
          completed: true,
          currentStep: 5,
          ...onboardingData,
          userId: session.user.id,
          billCount: billFiles.length,
          bills: billsInfo,
        }),
      });

      completedDataSentRef.current = true;

      // Redirect to dashboard
      router.push("/dashboard?onboarding=success");
    } catch (error) {
      console.error("Onboarding submission error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (isPending) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return null;
  }

  const allData = {
    ...step1Data,
    ...step2Data,
    ...step3Data,
  } as OnboardingData;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Application
            </h1>
            <p className="text-gray-600">
              Just a few steps to unlock your community solar savings
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {currentStep === 1 && (
              <Step1BasicInfo
                data={step1Data}
                onNext={handleStep1Next}
                userEmail={session.user?.email}
                userName={session.user?.name}
              />
            )}

            {currentStep === 2 && (
              <Step2Location
                data={step2Data}
                onNext={handleStep2Next}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Step3UtilityBenefits
                data={step3Data}
                onNext={handleStep3Next}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Step4BillUpload onNext={handleStep4Next} onBack={handleBack} />
            )}

            {currentStep === 5 && (
              <Step5Confirmation
                data={allData}
                billCount={billFiles.length}
                onBack={handleBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need assistance?{" "}
              <a
                href="/contact"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
