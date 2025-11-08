'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckEligibility() {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate zip code (5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      toast.error("Please enter a valid 5-digit ZIP code");
      return;
    }

    setLoading(true);

    // Simulate API check
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store zip code in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("zip_code", zipCode);
    }

    // For demo, accept all IL zip codes (60000-62999)
    const zipNum = parseInt(zipCode);
    if (zipNum >= 60000 && zipNum <= 62999) {
      toast.success("Great news! Community solar is available in your area.");
      setTimeout(() => {
        router.push("/signup");
      }, 1500);
    } else {
      toast.error(
        "Sorry, community solar is not yet available in your area. We currently serve Illinois only."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check Your Eligibility</CardTitle>
            <p className="text-muted-foreground mt-2">
              Enter your ZIP code to see if community solar is available in your area
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  maxLength={5}
                  placeholder="60601"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                  required
                  className="text-center text-2xl tracking-widest"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground text-center">
                  We currently serve ComEd and Ameren Illinois territories
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={loading || zipCode.length !== 5}
              >
                {loading ? "Checking..." : "Continue"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-white/60">
          <p>Questions? Call us at (312) 555-0100</p>
        </div>
      </div>
    </div>
  );
}
