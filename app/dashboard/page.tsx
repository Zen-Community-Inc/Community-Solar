"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  MapPin,
  Zap,
  FileText,
  CheckCircle2,
  Download,
  Edit,
  Upload,
  Trash2,
  LogOut,
  User,
  Phone,
  Mail,
  HelpCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import EditLocationDialog from "@/components/dashboard/EditLocationDialog";
import EditUtilityDialog from "@/components/dashboard/EditUtilityDialog";
import UploadBillDialog from "@/components/dashboard/UploadBillDialog";

interface Bill {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  monthYear: string | null;
  uploadedAt: string;
  status: "PENDING" | "PROCESSED" | "FAILED";
}

interface Lead {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  serviceAddress: string;
  city: string;
  state: string;
  electricUtilityProvider: string;
  governmentBenefitProgram: string | null;
  onboardingCompleted: boolean;
  onboardingStep: number;
  createdAt: string;
  bills: Bill[];
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoadingLead, setIsLoadingLead] = useState(true);

  // Dialog states
  const [editLocationOpen, setEditLocationOpen] = useState(false);
  const [editUtilityOpen, setEditUtilityOpen] = useState(false);
  const [uploadBillOpen, setUploadBillOpen] = useState(false);
  const [deletingBillId, setDeletingBillId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchLeadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchLeadData = async () => {
    try {
      const response = await fetch("/api/lead");
      if (response.ok) {
        const data = await response.json();
        setLead(data.lead);
      } else if (response.status === 404) {
        // Lead not found, redirect to onboarding
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Error fetching lead data:", error);
    } finally {
      setIsLoadingLead(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const handleDeleteBill = async (billId: string, fileName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${fileName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeletingBillId(billId);
    try {
      const response = await fetch(`/api/bill/${billId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bill");
      }

      // Refresh lead data to update the bills list
      await fetchLeadData();
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill. Please try again.");
    } finally {
      setDeletingBillId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: Bill["status"]) => {
    const badges = {
      PENDING: {
        text: "Processing",
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      },
      PROCESSED: {
        text: "Processed",
        color: "bg-green-100 text-green-700 border-green-300",
      },
      FAILED: {
        text: "Failed",
        color: "bg-red-100 text-red-700 border-red-300",
      },
    };
    const badge = badges[status];
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${badge.color}`}
      >
        {badge.text}
      </span>
    );
  };

  if (isPending || isLoadingLead) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50/30 to-white">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return null;
  }

  // Show onboarding prompt if lead hasn't completed it
  if (!lead) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white section-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome
                  {session.user?.name
                    ? `, ${session.user.name.split(" ")[0]}`
                    : ""}
                  !
                </h1>
                <p className="text-gray-600 mt-1">{session.user?.email}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-2 border-gray-400 hover:border-yellow-400 hover:bg-yellow-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all border-l-4 border-l-yellow-400">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Complete Your Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Start your application to begin saving with community solar.
                  </p>
                  <Link href="/onboarding">
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                      Start Application →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">Learn More</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Have questions? Check out our frequently asked questions.
                  </p>
                  <Link href="/faqs">
                    <Button variant="outline" className="w-full border-2">
                      View FAQs
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our support team is here to assist you.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-2">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show full dashboard with lead data
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white section-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome back, {lead.firstName}!
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {lead.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-2 hover:border-yellow-400 hover:bg-yellow-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Status Banner */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 text-lg mb-1">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-green-800 mb-3">
                    Thank you for completing your application. Our team will
                    review your information and contact you within 24-48 hours.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <Calendar className="h-3 w-3" />
                    <span>Submitted on {formatDate(lead.createdAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Grid */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-300/30 rounded-lg">
                    <User className="h-5 w-5 text-yellow-600" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-5">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Full Name
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium">
                        {lead.firstName} {lead.lastName}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium break-all">
                        {lead.email}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium">
                        {lead.phoneNumber}
                      </dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Service Location */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-b flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-300/30 rounded-lg">
                    <MapPin className="h-5 w-5 text-yellow-600" />
                  </div>
                  Service Location
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditLocationOpen(true)}
                  className="hover:bg-yellow-200 text-yellow-700 hover:text-yellow-900"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium">
                        {lead.serviceAddress}
                      </dd>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        City
                      </dt>
                      <dd className="text-base text-gray-900 font-medium">
                        {lead.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        State
                      </dt>
                      <dd className="text-base text-gray-900 font-medium">
                        {lead.state}
                      </dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Utility & Benefits */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-b flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-300/30 rounded-lg">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                  Utility & Benefits
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditUtilityOpen(true)}
                  className="hover:bg-yellow-200 text-yellow-700 hover:text-yellow-900"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Electric Utility Provider
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium">
                        {lead.electricUtilityProvider}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Government Benefit Program
                      </dt>
                      <dd className="text-base text-gray-900 mt-1 font-medium">
                        {lead.governmentBenefitProgram || "None"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Uploaded Bills */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-b flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-300/30 rounded-lg">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                  Utility Bills ({lead.bills.length})
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setUploadBillOpen(true)}
                  className="hover:bg-yellow-200 text-yellow-700 hover:text-yellow-900"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {lead.bills.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      No bills uploaded yet.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setUploadBillOpen(true)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First Bill
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lead.bills.map((bill) => (
                      <div
                        key={bill.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg flex-shrink-0">
                            <FileText className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                              {bill.fileName}
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-xs text-gray-500">
                                {formatFileSize(bill.fileSize)}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">
                                {formatDate(bill.uploadedAt)}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              {getStatusBadge(bill.status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <a
                            href={bill.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-yellow-100 hover:text-yellow-700"
                              title="Download bill"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleDeleteBill(bill.id, bill.fileName)
                            }
                            disabled={deletingBillId === bill.id}
                            className="hover:bg-red-100 hover:text-red-600"
                            title="Delete bill"
                          >
                            {deletingBillId === bill.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-300/30 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-yellow-600" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/faqs" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-400 hover:border-yellow-400 hover:bg-yellow-50 h-auto py-4 justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                        <HelpCircle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">View FAQs</div>
                        <div className="text-xs text-gray-500">
                          Get answers to common questions
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-400 hover:border-yellow-400 hover:bg-yellow-50 h-auto py-4 justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Contact Support</div>
                        <div className="text-xs text-gray-500">
                          We&apos;re here to help
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/about" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-400  hover:border-yellow-400 hover:bg-yellow-50 h-auto py-4 justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                        <User className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">About Us</div>
                        <div className="text-xs text-gray-500">
                          Learn more about our mission
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialogs */}
        {lead && (
          <>
            <EditLocationDialog
              open={editLocationOpen}
              onOpenChange={setEditLocationOpen}
              currentData={{
                serviceAddress: lead.serviceAddress,
                city: lead.city,
                state: lead.state,
              }}
              onSuccess={fetchLeadData}
            />
            <EditUtilityDialog
              open={editUtilityOpen}
              onOpenChange={setEditUtilityOpen}
              currentData={{
                electricUtilityProvider: lead.electricUtilityProvider,
                governmentBenefitProgram:
                  lead.governmentBenefitProgram || undefined,
              }}
              onSuccess={fetchLeadData}
            />
            <UploadBillDialog
              open={uploadBillOpen}
              onOpenChange={setUploadBillOpen}
              onSuccess={fetchLeadData}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
