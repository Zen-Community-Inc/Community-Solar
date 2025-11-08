"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function SignInContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/onboarding";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      console.error("Google authentication error:", error);
      alert("Failed to authenticate with Google. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50/30 to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-gray-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/assets/go-zen-logo.jpg"
                alt="Zen Community Solar"
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Welcome to Zen Solar
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in with your Google account to get started
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Google Sign In Button */}
              <Button
                type="button"
                size="lg"
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold border-2 border-gray-300 hover:border-yellow-400 transition-all"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Info Box */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800">
                      <strong className="text-gray-900">What happens next?</strong>
                    </p>
                    <ol className="text-sm text-gray-700 mt-2 space-y-1 list-decimal list-inside">
                      <li>Sign in with your Google account</li>
                      <li>We&apos;ll pre-fill your name and email</li>
                      <li>Complete a quick 5-step application</li>
                      <li>Start saving on your energy bills!</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-center text-gray-600 mt-6">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-yellow-600 hover:text-yellow-700 underline" target="_blank">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700 underline" target="_blank">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50/30 to-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
