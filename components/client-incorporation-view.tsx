"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { Stepper } from "@/components/stepper"
import { DraftDocumentsCardClient } from "@/components/draft-documents-card-client"
import { CheckCircle2, Clock, Upload, FileText, AlertCircle, MessageSquare, Plus, X, Save } from "lucide-react"
import { useState } from "react"

export function ClientIncorporationView() {
  const [companyName, setCompanyName] = useState("Tech Innovations Vietnam Co., Ltd.")
  const [registeredAddress, setRegisteredAddress] = useState("District 1, Ho Chi Minh City")
  const [businessActivities, setBusinessActivities] = useState("Software development and IT consulting services")
  const [charterCapital, setCharterCapital] = useState("50000")
  const [legalRepName, setLegalRepName] = useState("John Smith")
  const [legalRepEmail, setLegalRepEmail] = useState("john.smith@example.com")
  const [legalRepPhone, setLegalRepPhone] = useState("+84 123 456 789")
  const [shareholders, setShareholders] = useState([
    { id: 1, name: "John Smith", ownership: "60", nationality: "USA" },
    { id: 2, name: "Jane Doe", ownership: "40", nationality: "Singapore" },
  ])

  const addShareholder = () => {
    setShareholders([...shareholders, { id: Date.now(), name: "", ownership: "", nationality: "" }])
  }

  const removeShareholder = (id: number) => {
    setShareholders(shareholders.filter((s) => s.id !== id))
  }

  const updateShareholder = (id: number, field: string, value: string) => {
    setShareholders(shareholders.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const steps = [
    { id: 1, name: "Provide Company Information", status: "completed" as const },
    { id: 2, name: "Identity Documents", status: "completed" as const },
    { id: 3, name: "Draft Documents Review", status: "current" as const },
    { id: 4, name: "Government Submission", status: "upcoming" as const },
    { id: 5, name: "Business License Issued", status: "upcoming" as const },
    { id: 6, name: "Post-Registration Setup", status: "upcoming" as const },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Company Incorporation" role="client" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6 space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance">Company Incorporation</h1>
              <p className="mt-2 text-muted-foreground">Track your company registration progress</p>
            </div>

            {/* Service Summary Card */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>Service Overview</CardTitle>
                    <CardDescription>Vietnam Company Registration</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    <Clock className="mr-1.5 size-3.5" />
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="mt-1 text-base font-medium">In Progress</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estimated Completion</p>
                    <p className="mt-1 text-base font-medium">5–10 working days</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned Specialist</p>
                    <p className="mt-1 text-base font-medium">Jane Nguyen</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="default">
                    <MessageSquare className="mr-2 size-4" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 size-4" />
                    Upload Documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stepper */}
            <Stepper steps={steps} />

            {/* Auto-Generated Draft Documents card below stepper */}
            <DraftDocumentsCardClient step1Completed={true} />

            {/* Next Action Card */}
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="size-5 text-primary" />
                  Next Action Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90">
                  Please review and approve the draft documents to proceed with government submission.
                </p>
              </CardContent>
            </Card>

            {/* Step 1 of 6 — Provide Company Information */}
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Step 1 of 6 — Provide Company Information
                      <CheckCircle2 className="size-5 text-green-600" />
                    </CardTitle>
                    <CardDescription className="mt-2">Please provide the basic details of your company</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instructions */}
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    This information is required by the authorities to prepare and submit your incorporation
                    application.
                  </p>
                  <div>
                    <p className="text-sm font-medium mb-2">You will be asked to provide:</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>Proposed company name</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>Registered office address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>Business activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>Shareholders / members information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>Legal representative details</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground italic">You can save your progress and continue later.</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      Proposed Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your proposed company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Must end with "Co., Ltd." or "Limited Liability Company"
                    </p>
                  </div>

                  {/* Registered Address */}
                  <div className="space-y-2">
                    <Label htmlFor="registeredAddress">
                      Registered Office Address <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="registeredAddress"
                      placeholder="Enter your registered office address"
                      value={registeredAddress}
                      onChange={(e) => setRegisteredAddress(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Business Activities */}
                  <div className="space-y-2">
                    <Label htmlFor="businessActivities">
                      Business Activities <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="businessActivities"
                      placeholder="Describe your business activities"
                      value={businessActivities}
                      onChange={(e) => setBusinessActivities(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Please describe your main business activities and services
                    </p>
                  </div>

                  {/* Charter Capital */}
                  <div className="space-y-2">
                    <Label htmlFor="charterCapital">
                      Charter Capital (USD) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="charterCapital"
                      type="number"
                      placeholder="50000"
                      value={charterCapital}
                      onChange={(e) => setCharterCapital(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Minimum recommended: $10,000 USD</p>
                  </div>

                  {/* Shareholders Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>
                        Shareholders / Members Information <span className="text-destructive">*</span>
                      </Label>
                      <Button type="button" variant="outline" size="sm" onClick={addShareholder}>
                        <Plus className="mr-2 size-4" />
                        Add Shareholder
                      </Button>
                    </div>

                    {shareholders.map((shareholder, index) => (
                      <div key={shareholder.id} className="rounded-lg border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Shareholder {index + 1}</p>
                          {shareholders.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeShareholder(shareholder.id)}
                            >
                              <X className="size-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor={`shareholder-name-${shareholder.id}`}>Full Name</Label>
                            <Input
                              id={`shareholder-name-${shareholder.id}`}
                              placeholder="Enter full name"
                              value={shareholder.name}
                              onChange={(e) => updateShareholder(shareholder.id, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`shareholder-ownership-${shareholder.id}`}>Ownership (%)</Label>
                            <Input
                              id={`shareholder-ownership-${shareholder.id}`}
                              type="number"
                              placeholder="50"
                              value={shareholder.ownership}
                              onChange={(e) => updateShareholder(shareholder.id, "ownership", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`shareholder-nationality-${shareholder.id}`}>Nationality</Label>
                            <Input
                              id={`shareholder-nationality-${shareholder.id}`}
                              placeholder="Country"
                              value={shareholder.nationality}
                              onChange={(e) => updateShareholder(shareholder.id, "nationality", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <p className="text-xs text-muted-foreground">
                      Total ownership must equal 100%. At least 1 shareholder is required.
                    </p>
                  </div>

                  {/* Legal Representative */}
                  <div className="space-y-4">
                    <Label className="text-base">
                      Legal Representative Details <span className="text-destructive">*</span>
                    </Label>
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="legalRepName">Full Name</Label>
                          <Input
                            id="legalRepName"
                            placeholder="Enter full name"
                            value={legalRepName}
                            onChange={(e) => setLegalRepName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="legalRepEmail">Email Address</Label>
                          <Input
                            id="legalRepEmail"
                            type="email"
                            placeholder="email@example.com"
                            value={legalRepEmail}
                            onChange={(e) => setLegalRepEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="legalRepPhone">Phone Number</Label>
                          <Input
                            id="legalRepPhone"
                            placeholder="+84 123 456 789"
                            value={legalRepPhone}
                            onChange={(e) => setLegalRepPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button size="lg" disabled>
                    <Save className="mr-2 size-4" />
                    Save and Continue
                  </Button>
                  <Button variant="outline" size="lg" disabled>
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 of 6 — Identity Documents */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">Step 2 of 6 — Identity Documents</CardTitle>
                    <CardDescription className="mt-2">
                      Upload required identity documents to continue processing
                    </CardDescription>
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
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Uploaded
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Shareholder ID / Passport</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Uploaded
                    </Badge>
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

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Accepted formats: PDF, JPG, PNG. Max 10MB per file.</p>
                </div>

                <Button disabled>
                  <Upload className="mr-2 size-4" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>

            {/* Step 3 of 6 — Draft Documents Review */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 3 of 6 — Draft Documents Review</CardTitle>
                    <CardDescription className="mt-2">Review and approve your incorporation documents</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Current</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your draft documents have been generated and are ready for review. Please review each document
                  carefully and approve them to proceed with government submission.
                </p>
                <DraftDocumentsCardClient step1Completed={true} />
              </CardContent>
            </Card>

            {/* Step 4 of 6 — Government Submission */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 4 of 6 — Government Submission</CardTitle>
                    <CardDescription className="mt-2">
                      Application submitted to the Department of Planning & Investment
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </CardHeader>
              <CardContent>
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

                <div className="mt-4 rounded-lg bg-muted/50 p-3">
                  <p className="text-sm text-muted-foreground">No action required from you at this stage.</p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 of 6 — Business License Issued */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Step 5 of 6 — Business License Issued</CardTitle>
                    <CardDescription className="mt-2">
                      Business registration certificate and tax code will be available here
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button disabled>
                  <FileText className="mr-2 size-4" />
                  Download Documents
                </Button>
              </CardContent>
            </Card>

            {/* Step 6 of 6 — Post-Registration Setup */}
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
              <CardContent>
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
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Consultation on company type and setup",
                    "Preparation of all legal documents",
                    "Submission to authorities",
                    "Government fees included",
                    "Initial tax advisory support",
                    "Seal creation & optional bank support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
