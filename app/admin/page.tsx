'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  ArrowLeft,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { adminAPI } from "@/lib/api";
import { UserOnboarding } from "@/lib/types";
import { Profile } from "@/lib/types";
import Link from "next/link";

type EnrollmentWithProfile = UserOnboarding & { profile: Profile };

export default function Admin() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentWithProfile | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/");
      return;
    }

    // TODO: Add role check when role field is added to user model
    // if (session.user.role !== "admin") {
    //   toast.error("You do not have permission to access this page");
    //   router.push("/dashboard");
    //   return;
    // }

    loadEnrollments();
  }, [session, isPending, router]);

  const loadEnrollments = async () => {
    try {
      const data = await adminAPI.getAllEnrollments();
      setEnrollments(data);
    } catch {
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (enrollment: EnrollmentWithProfile) => {
    setSelectedEnrollment(enrollment);
    setAdminNotes(enrollment.admin_notes || "");
    setReviewDialogOpen(true);
  };

  const handleUpdateStatus = async (status: "approved" | "rejected" | "resubmit_required") => {
    if (!selectedEnrollment) return;

    if (!adminNotes.trim()) {
      toast.error("Please add notes for the applicant");
      return;
    }

    setActionLoading(true);

    try {
      await adminAPI.updateEnrollmentStatus(
        selectedEnrollment.id,
        status,
        adminNotes,
        session!.user!.id
      );

      toast.success(
        status === "approved"
          ? "Application approved!"
          : status === "rejected"
          ? "Application rejected"
          : "Resubmission requested"
      );

      setReviewDialogOpen(false);
      loadEnrollments();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEnrollment) return;

    if (!confirm("Are you sure you want to delete this enrollment? This cannot be undone.")) {
      return;
    }

    setActionLoading(true);

    try {
      await adminAPI.deleteEnrollment(selectedEnrollment.id);
      toast.success("Enrollment deleted");
      setReviewDialogOpen(false);
      loadEnrollments();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete enrollment";
      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "resubmit_required":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Resubmit</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    approved: enrollments.filter((e) => e.status === "approved").length,
    resubmit: enrollments.filter((e) => e.status === "resubmit_required").length,
  };

  if (loading || isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Resubmit</p>
                  <p className="text-2xl font-bold">{stats.resubmit}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No applications to review
                      </TableCell>
                    </TableRow>
                  ) : (
                    enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">
                          {enrollment.profile.full_name}
                        </TableCell>
                        <TableCell>{enrollment.profile.email}</TableCell>
                        <TableCell>{enrollment.profile.phone}</TableCell>
                        <TableCell>
                          {enrollment.city}, {enrollment.state} {enrollment.zip}
                        </TableCell>
                        <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                        <TableCell>
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenReview(enrollment)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
          </DialogHeader>

          {selectedEnrollment && (
            <div className="space-y-4">
              {/* Applicant Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{selectedEnrollment.profile.full_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedEnrollment.profile.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedEnrollment.profile.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Current Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedEnrollment.status)}</div>
                </div>
              </div>

              {/* Address */}
              <div className="border-t pt-4">
                <Label className="text-muted-foreground">Service Address</Label>
                <p className="font-medium">
                  {selectedEnrollment.address}
                  <br />
                  {selectedEnrollment.city}, {selectedEnrollment.state} {selectedEnrollment.zip}
                </p>
              </div>

              {/* Documents */}
              <div className="border-t pt-4 space-y-2">
                <Label>Uploaded Documents</Label>
                <div className="flex flex-col gap-2">
                  {selectedEnrollment.utility_bill_url && (
                    <Button variant="outline" size="sm" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Utility Bill
                    </Button>
                  )}
                  {selectedEnrollment.benefit_proof_url && (
                    <Button variant="outline" size="sm" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Benefit Proof
                    </Button>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="border-t pt-4">
                <Label htmlFor="adminNotes">Admin Notes</Label>
                <Textarea
                  id="adminNotes"
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes for the applicant (required)"
                  className="mt-2"
                />
              </div>

              {/* Timestamps */}
              {selectedEnrollment.reviewed_at && (
                <div className="text-xs text-muted-foreground border-t pt-4">
                  <p>Last reviewed: {new Date(selectedEnrollment.reviewed_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-1">
              <Button
                onClick={() => handleUpdateStatus("approved")}
                className="bg-green-500 hover:bg-green-600"
                disabled={actionLoading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => handleUpdateStatus("resubmit_required")}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
                disabled={actionLoading}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Request Resubmit
              </Button>
              <Button
                onClick={() => handleUpdateStatus("rejected")}
                variant="destructive"
                disabled={actionLoading}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
            <Button variant="outline" onClick={handleDelete} disabled={actionLoading}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
