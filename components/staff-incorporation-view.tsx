"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { Stepper } from "@/components/stepper"
import { DraftDocumentsCardStaff } from "@/components/draft-documents-card-staff"
import {
  Upload,
  FileText,
  AlertCircle,
  CheckSquare,
  Square,
  Edit3,
  Send,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  FileCheck,
  UserCheck,
  Flag,
  Shield,
} from "lucide-react"

export function StaffIncorporationView() {
  const steps = [
    { id: 1, name: "Business Information", status: "completed" as const },
    { id: 2, name: "Identity Documents", status: "completed" as const },
    { id: 3, name: "Draft Documents Review", status: "current" as const },
    { id: 4, name: "Government Submission", status: "upcoming" as const },
    { id: 5, name: "Business License Issued", status: "upcoming" as const },
    { id: 6, name: "Post-Registration Setup", status: "upcoming" as const },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Company Incorporation" role="staff" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6 space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance">Company Incorporation</h1>
              <p className="mt-2 text-muted-foreground">Staff Case Management</p>
            </div>

            {/* Case Summary Card */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>Tech Innovations Vietnam Co., Ltd.</CardTitle>
                    <CardDescription>Case ID: INC-2025-00142</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Client Name</p>
                    <p className="mt-1 text-base font-medium">John Smith</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                    <p className="mt-1 text-base font-medium">Company Incorporation</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Started Date</p>
                    <p className="mt-1 text-base font-medium">Jan 2, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Target Completion</p>
                    <p className="mt-1 text-base font-medium">Jan 15, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stepper */}
            <Stepper steps={steps} />

            {/* Auto-Generated Draft Documents card below stepper */}
            <DraftDocumentsCardStaff step1Completed={true} />

            {/* Staff Actions Card */}
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="size-5 text-primary" />
                  Required Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90 mb-4">
                  Review shareholder structure validation and send drafts to client for approval.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Send className="mr-2 size-4" />
                    Send to Client
                  </Button>
                  <Button variant="outline">
                    <CheckCircle2 className="mr-2 size-4" />
                    Mark Step Completed
                  </Button>
                  <Button variant="outline">
                    <Edit3 className="mr-2 size-4" />
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Case Summary Card */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Step 1 of 6 — Business Information
                      <CheckCircle2 className="size-5 text-green-600" />
                    </CardTitle>
                    <CardDescription className="mt-2">Basic information required to register company</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Proposed Company Name</p>
                    <p className="mt-1 text-sm">Tech Innovations Vietnam Co., Ltd.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Business Address</p>
                    <p className="mt-1 text-sm">District 1, Ho Chi Minh City</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Charter Capital</p>
                    <p className="mt-1 text-sm">$50,000 USD</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Legal Representative</p>
                    <p className="mt-1 text-sm">John Smith</p>
                  </div>
                </div>

                {/* Staff-only actions for Step 1 */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="size-4 text-accent-foreground" />
                    <span>Staff Actions (Hidden from Client)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Edit3 className="mr-2 size-4" />
                      Edit Information
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileCheck className="mr-2 size-4" />
                      Verify Name Availability
                    </Button>
                    <Button size="sm" variant="outline">
                      <CheckCircle2 className="mr-2 size-4" />
                      Approve Step
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="mr-2 size-4" />
                      Request Corrections
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-accent/20">
                    <p className="text-xs text-muted-foreground mb-2">Internal Validation Status:</p>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <span className="text-green-700">Name available & VSIC code mapped</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identity Documents Card */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 2 of 6 — Identity Documents</CardTitle>
                    <CardDescription className="mt-2">Upload and verify required identity documents</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Legal Representative ID / Passport</p>
                        <p className="text-xs text-muted-foreground">Uploaded Jan 2, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Shareholder ID / Passport</p>
                        <p className="text-xs text-muted-foreground">Uploaded Jan 3, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Proof of Business Address</p>
                        <p className="text-xs text-muted-foreground">Optional</p>
                      </div>
                    </div>
                    <Badge variant="outline">Not Provided</Badge>
                  </div>
                </div>

                {/* Staff-only actions for Step 2 */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="size-4 text-accent-foreground" />
                    <span>Staff Actions (Hidden from Client)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="mr-2 size-4" />
                      Upload on Behalf
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserCheck className="mr-2 size-4" />
                      Verify Documents
                    </Button>
                    <Button size="sm" variant="outline">
                      <XCircle className="mr-2 size-4" />
                      Reject Document
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="mr-2 size-4" />
                      Send Reminder
                    </Button>
                    <Button size="sm" variant="outline">
                      <CheckCircle2 className="mr-2 size-4" />
                      Approve All Documents
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-accent/20">
                    <p className="text-xs text-muted-foreground mb-2">Document Verification Checklist:</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span className="text-green-700">Document clarity check passed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span className="text-green-700">Expiration date validated</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span className="text-green-700">All required documents received</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Draft Documents Review Card */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 3 of 6 — Draft Documents Review</CardTitle>
                    <CardDescription className="mt-2">Prepare and review draft incorporation documents</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Current</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Draft documents have been generated from the client's submission. Review the validation checklist and
                  send to client for approval.
                </p>
                <DraftDocumentsCardStaff step1Completed={true} />
              </CardContent>
            </Card>

            {/* Government Submission Card */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 4 of 6 — Government Submission</CardTitle>
                    <CardDescription className="mt-2">
                      Submit application to Department of Planning & Investment
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Submission Date</p>
                    <p className="mt-1 text-sm">Pending</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="mt-1 text-sm">Waiting for submission</p>
                  </div>
                </div>

                {/* Staff-only actions for Step 4 */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3 opacity-50">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="size-4 text-accent-foreground" />
                    <span>Staff Actions (Hidden from Client)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <Send className="mr-2 size-4" />
                      Submit to DPI
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Eye className="mr-2 size-4" />
                      Check Submission Status
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Flag className="mr-2 size-4" />
                      Flag Issue
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Upload className="mr-2 size-4" />
                      Upload Supporting Docs
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-accent/20">
                    <Input placeholder="DPI Reference Number" className="text-sm" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business License Issued Card */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 5 of 6 — Business License Issued</CardTitle>
                    <CardDescription className="mt-2">Business registration certificate and tax code</CardDescription>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Staff-only actions for Step 5 */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3 opacity-50">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="size-4 text-accent-foreground" />
                    <span>Staff Actions (Hidden from Client)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <Upload className="mr-2 size-4" />
                      Upload License
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Download className="mr-2 size-4" />
                      Download from DPI
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Send className="mr-2 size-4" />
                      Notify Client
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <FileCheck className="mr-2 size-4" />
                      Verify Certificate
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-accent/20 space-y-2">
                    <Input placeholder="Business License Number" className="text-sm" disabled />
                    <Input placeholder="Tax Identification Number" className="text-sm" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Post-Registration Setup Card */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 6 of 6 — Post-Registration Setup</CardTitle>
                    <CardDescription className="mt-2">Complete essential post-registration tasks</CardDescription>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    "Company seal creation",
                    "Tax registration",
                    "Initial tax declaration",
                    "Electronic invoice setup",
                    "Bank account support (optional)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border p-3 opacity-50">
                      <div className="size-5 rounded-full border-2" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Staff-only actions for Step 6 */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3 opacity-50">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="size-4 text-accent-foreground" />
                    <span>Staff Actions (Hidden from Client)</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <CheckCircle2 className="mr-2 size-4" />
                      Mark Task Complete
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Send className="mr-2 size-4" />
                      Schedule Follow-up
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Upload className="mr-2 size-4" />
                      Upload Seal Design
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <FileCheck className="mr-2 size-4" />
                      Close Case
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Internal Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Internal Checklist</CardTitle>
                <CardDescription>Internal validation and preparation tasks (not visible to client)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-green-50/50 border-green-200">
                    <CheckSquare className="size-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Name availability check</p>
                      <p className="text-xs text-muted-foreground">Verified: Name is available</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-green-50/50 border-green-200">
                    <CheckSquare className="size-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">VSIC code mapping</p>
                      <p className="text-xs text-muted-foreground">Mapped to: 6201 - Computer programming activities</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-primary/5 border-primary/50">
                    <Square className="size-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Legal validation</p>
                      <p className="text-xs text-muted-foreground">Pending document verification</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 opacity-60">
                    <Square className="size-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Draft document preparation</p>
                      <p className="text-xs text-muted-foreground">Awaiting previous step</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 opacity-60">
                    <Square className="size-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">DPI submission tracking</p>
                      <p className="text-xs text-muted-foreground">Not started</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Internal Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
                <CardDescription>Staff notes (not visible to client)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">Jane Nguyen • Jan 5, 2025 10:30 AM</p>
                    </div>
                    <p className="text-sm">
                      Client requested expedited processing. Confirmed additional fee payment received. Prioritizing
                      case.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">Jane Nguyen • Jan 3, 2025 2:15 PM</p>
                    </div>
                    <p className="text-sm">
                      Name availability confirmed with DPI. VSIC code 6201 approved for stated business activities. No
                      risk flags detected.
                    </p>
                  </div>
                </div>

                <div>
                  <Textarea placeholder="Add internal note..." className="min-h-[100px]" />
                  <Button className="mt-3" size="sm">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Management */}
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Upload official documents and manage client submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Legal Representative Passport</p>
                        <p className="text-xs text-muted-foreground">Uploaded by client • Jan 2, 2025</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 size-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline">
                  <Upload className="mr-2 size-4" />
                  Upload Official Documents
                </Button>
              </CardContent>
            </Card>

            {/* Risk Assessment (Staff Only) */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Internal risk evaluation (not visible to client)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-600" />
                      <span className="text-sm font-medium">Compliance Risk</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Low
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-600" />
                      <span className="text-sm font-medium">Document Verification</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-600" />
                      <span className="text-sm font-medium">Payment Status</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Confirmed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
