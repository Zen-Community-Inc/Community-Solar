"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { OnboardingData } from "@/lib/validation";

interface Step5Props {
  data: OnboardingData;
  billCount: number;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function Step5Confirmation({
  data,
  billCount,
  onBack,
  onSubmit,
  isSubmitting,
}: Step5Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Information
        </h2>
        <p className="text-gray-600">
          Please review the information below before submitting.
        </p>
      </div>

      {/* Review Sections */}
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            Basic Information
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900 mt-1">
                {data.firstName} {data.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900 mt-1">{data.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="text-sm text-gray-900 mt-1">{data.phoneNumber}</dd>
            </div>
          </dl>
        </div>

        {/* Service Location */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            Service Location
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="text-sm text-gray-900 mt-1">
                {data.serviceAddress}
                <br />
                {data.city}, {data.state}
              </dd>
            </div>
          </dl>
        </div>

        {/* Utility & Benefits */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            Utility & Benefits
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Utility Provider</dt>
              <dd className="text-sm text-gray-900 mt-1">
                {data.electricUtilityProvider}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Benefit Program</dt>
              <dd className="text-sm text-gray-900 mt-1">
                {data.governmentBenefitProgram || "None"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Bills */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            Electric Bills
          </h3>
          <p className="text-sm text-gray-900">
            {billCount === 0
              ? "No bills uploaded"
              : `${billCount} bill${billCount !== 1 ? "s" : ""} uploaded`}
          </p>
        </div>
      </div>

      {/* Success Message Preview */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>We&apos;ll review your information and calculate your potential savings</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>A solar advisor will contact you within 24-48 hours</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>You&apos;ll receive a personalized savings estimate</span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="px-8"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </div>
  );
}
