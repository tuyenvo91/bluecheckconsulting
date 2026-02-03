"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { Download, Upload, CheckCircle2, Circle, Lock } from "lucide-react"

type Period = string

const cycleConfig = {
  periods: ["Jan 2026", "Dec 2025", "Nov 2025", "Oct 2025", "Sep 2025"],
  steps: [
    {
      id: 1,
      name: "Prepare Tax Data",
      subtitle: "Source data from accounting reports",
      status: "completed" as const,
    },
    {
      id: 2,
      name: "Draft Tax Declaration (Estimated)",
      subtitle: "Review estimated tax calculations",
      status: "completed" as const,
    },
    {
      id: 3,
      name: "Client Confirmation",
      subtitle: "Confirm and approve tax declaration",
      status: "current" as const,
    },
    { id: 4, name: "Official Filing & Payment", subtitle: "Submit and pay taxes", status: "upcoming" as const },
    { id: 5, name: "Archived", subtitle: "Tax filing completed", status: "upcoming" as const },
  ],
}

export function ClientTaxServiceView() {
  const [period, setPeriod] = useState("Jan 2026")
  const [selectedStep, setSelectedStep] = useState(3)
  const [confirmationComment, setConfirmationComment] = useState("")

  const config = cycleConfig
  const currentStep = config.steps.find((s) => s.status === "current") || config.steps[0]
  const activeStep = config.steps.find((s) => s.id === selectedStep) || currentStep

  const completedCount = config.steps.filter((s) => s.status === "completed").length
  const progressPercent = Math.round((completedCount / config.steps.length) * 100)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Tax Service" role="client" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Tax Service</h1>
                <p className="text-muted-foreground mt-1">Manage tax declarations, filings, and payments</p>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Select Period:</span>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {config.periods.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Main Content - 3 Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left: Stepper with Progress */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Step {activeStep.id} of {config.steps.length} • {progressPercent}% completed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {config.steps.map((step, index) => (
                        <button
                          key={step.id}
                          onClick={() => setSelectedStep(step.id)}
                          className={`w-full text-left transition-all ${
                            selectedStep === step.id
                              ? "border-l-4 border-primary bg-muted/50 pl-3"
                              : "border-l-4 border-transparent pl-3 hover:bg-muted/30"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              {step.status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : step.status === "current" ? (
                                <Circle className="w-5 h-5 text-primary fill-primary" />
                              ) : step.id === 5 ? (
                                <Lock className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                              {index < config.steps.length - 1 && (
                                <div
                                  className={`w-0.5 h-8 mt-1 ${step.status === "completed" ? "bg-green-600" : "bg-muted"}`}
                                />
                              )}
                            </div>
                            <div className="flex-1 py-1">
                              <p className={`text-sm font-medium ${selectedStep === step.id ? "text-foreground" : ""}`}>
                                {step.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center: Step Content */}
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Step {activeStep.id} of {config.steps.length} — {activeStep.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Step 1: Prepare Tax Data */}
                    {activeStep.id === 1 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Tax data is prepared from your accounting reports for {period}.
                        </p>
                        <div className="space-y-3">
                          <div className="border rounded-lg p-3 bg-blue-50">
                            <p className="text-sm font-medium text-blue-900">Source: Accounting Reports</p>
                            <p className="text-xs text-blue-800 mt-1">Period: {period}</p>
                          </div>
                          <div className="border rounded-lg p-3 bg-muted/30">
                            <p className="text-sm font-medium">Status</p>
                            <Badge className="mt-2">Data Ready</Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Draft Tax Declaration */}
                    {activeStep.id === 2 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Review the estimated tax calculations for {period}.
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="border rounded p-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground">VAT</p>
                              <p className="font-semibold">12,500,000 VND</p>
                            </div>
                            <div className="border rounded p-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground">PIT</p>
                              <p className="font-semibold">5,400,000 VND</p>
                            </div>
                            <div className="border rounded p-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground">CIT</p>
                              <p className="font-semibold">8,200,000 VND</p>
                            </div>
                            <div className="border rounded p-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground">Contractor Tax</p>
                              <p className="font-semibold">0 VND</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Draft Declaration
                        </Button>
                      </div>
                    )}

                    {/* Step 3: Client Confirmation */}
                    {activeStep.id === 3 && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-900">Total Estimated Tax Payable</p>
                          <p className="text-2xl font-bold text-blue-900 mt-2">26,100,000 VND</p>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Draft Declaration
                        </Button>
                        <div>
                          <label className="text-sm font-medium">Comments</label>
                          <Textarea
                            placeholder="Add any comments or questions..."
                            value={confirmationComment}
                            onChange={(e) => setConfirmationComment(e.target.value)}
                            className="mt-2 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">Confirm</Button>
                          <Button className="flex-1 bg-transparent" variant="outline">
                            Request Adjustment
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Official Filing & Payment */}
                    {activeStep.id === 4 && (
                      <div className="space-y-4">
                        <div className="border rounded-lg p-3 bg-green-50">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Filing Status: Filed</span>
                          </div>
                          <p className="text-xs text-green-800 mt-1">Filed on Jan 11, 2026</p>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/30">
                          <p className="text-sm font-medium">Payment Status</p>
                          <Badge className="mt-2">Paid</Badge>
                          <p className="text-xs text-muted-foreground mt-2">Paid on Jan 12, 2026</p>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Filing Receipt
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Payment Receipt
                        </Button>
                      </div>
                    )}

                    {/* Step 5: Archived */}
                    {activeStep.id === 5 && (
                      <div className="space-y-4">
                        <div className="border rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">
                              Tax filing for this period is completed and archived.
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right: Actions */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Your Action Required</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeStep.id === 3 ? (
                      <>
                        <p className="text-sm">Please review and confirm the tax declaration</p>
                        <p className="text-xs text-muted-foreground">Complete by Jan 15, 2026</p>
                      </>
                    ) : activeStep.status === "upcoming" ? (
                      <p className="text-sm text-muted-foreground">Waiting for next phase to begin</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No action required at this time</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
