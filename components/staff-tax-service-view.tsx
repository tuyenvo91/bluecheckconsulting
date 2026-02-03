"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { Download, Upload, CheckCircle2, Circle, Lock, Flag, AlertTriangle } from "lucide-react"

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
      subtitle: "Generate and review tax calculations",
      status: "completed" as const,
    },
    {
      id: 3,
      name: "Client Confirmation",
      subtitle: "Monitor client approval status",
      status: "current" as const,
    },
    { id: 4, name: "Official Filing & Payment", subtitle: "File and process payments", status: "upcoming" as const },
    { id: 5, name: "Archived", subtitle: "Tax filing completed", status: "upcoming" as const },
  ],
}

const messages = [
  {
    author: "Client (John Smith)",
    message: "Please clarify the VAT calculation",
    date: "Today 10:00 AM",
    role: "client",
  },
  { author: "You", message: "The VAT calculation includes input credit adjustments.", date: "Today 10:15 AM", role: "staff" },
]

export function StaffTaxServiceView() {
  const [period, setPeriod] = useState("Jan 2026")
  const [selectedStep, setSelectedStep] = useState(3)

  const config = cycleConfig
  const currentStep = config.steps.find((s) => s.status === "current") || config.steps[0]
  const activeStep = config.steps.find((s) => s.id === selectedStep) || currentStep

  const completedCount = config.steps.filter((s) => s.status === "completed").length
  const progressPercent = Math.round((completedCount / config.steps.length) * 100)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Tax Service" role="staff" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Tax Service</h1>
                <p className="text-muted-foreground mt-1">Manage client tax declarations and filings</p>
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
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Import or adjust tax calculation data from accounting reports.
                        </p>
                        <Button className="w-full bg-transparent" variant="outline">
                          Import Tax Data
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          Adjust Tax Calculations
                        </Button>
                      </div>
                    )}

                    {/* Step 2: Draft Tax Declaration */}
                    {activeStep.id === 2 && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Generate draft tax declaration for client review.
                        </p>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="flex gap-2">
                            <Flag className="w-4 h-4 text-orange-700 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-orange-900">Review Risk Flags</p>
                              <p className="text-orange-800 text-xs">High VAT input credit ratio detected</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full">Generate Draft Tax Return</Button>
                        <Button className="w-full bg-transparent" variant="outline">
                          Request Client Confirmation
                        </Button>
                      </div>
                    )}

                    {/* Step 3: Client Confirmation */}
                    {activeStep.id === 3 && (
                      <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900">Awaiting client confirmation...</p>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/30">
                          <p className="text-sm font-medium mb-2">Confirmation Timeline</p>
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <p>Sent to client: Jan 10, 2026</p>
                            <p>Awaiting response until: Jan 15, 2026</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Official Filing & Payment */}
                    {activeStep.id === 4 && (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          File tax returns and manage payment processing.
                        </p>
                        <Button className="w-full">Mark as Filed</Button>
                        <div>
                          <label className="text-sm font-medium">Upload Filing Receipt</label>
                          <Button className="w-full mt-2 bg-transparent" variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Attach Receipt
                          </Button>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Upload Payment Receipt</label>
                          <Button className="w-full mt-2 bg-transparent" variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Attach Payment
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Archived */}
                    {activeStep.id === 5 && (
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-900">Tax filing for this period is completed and archived.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right: Action Panels */}
              <div className="space-y-4">
                {/* Next Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Next Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-orange-900">Complete by Jan 15</p>
                        <p className="text-xs text-muted-foreground">Tax filing deadline</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Internal Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Add internal notes..." className="text-sm" />
                  </CardContent>
                </Card>

                {/* Client Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Client Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {messages.map((msg, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {msg.role}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                      </div>
                    ))}
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
