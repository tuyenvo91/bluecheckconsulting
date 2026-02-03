"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { StepContent } from "@/components/step-content"
import { Download, AlertTriangle, CheckCircle2, Circle } from "lucide-react"

type Cycle = "monthly" | "quarterly" | "annual"
type Period = string

const cycleConfig = {
  monthly: {
    periods: ["Jan 2026", "Dec 2025", "Nov 2025", "Oct 2025", "Sep 2025"],
    steps: [
      {
        id: 1,
        name: "Collect Accounting Documents",
        subtitle: "Upload invoices and bank statements",
        status: "completed" as const,
      },
      {
        id: 2,
        name: "Bookkeeping & Reconciliation",
        subtitle: "We process and reconcile your records",
        status: "completed" as const,
      },
      {
        id: 3,
        name: "Accounting Reports Generated",
        subtitle: "Review General Ledger and Trial Balance",
        status: "current" as const,
      },
      { id: 4, name: "Client Review", subtitle: "Review accounting summary", status: "upcoming" as const },
      { id: 5, name: "Period Closed & Archived", subtitle: "Period is locked and archived", status: "upcoming" as const },
    ],
  },
  quarterly: {
    periods: ["Q1 2026", "Q4 2025", "Q3 2025", "Q2 2025", "Q1 2025"],
    steps: [
      { id: 1, name: "Collect Accounting Documents", subtitle: "Compile quarterly data", status: "completed" as const },
      { id: 2, name: "Bookkeeping & Reconciliation", subtitle: "Process quarterly records", status: "current" as const },
      { id: 3, name: "Accounting Reports Generated", subtitle: "Generate quarterly reports", status: "upcoming" as const },
      { id: 4, name: "Client Review", subtitle: "Review quarterly summary", status: "upcoming" as const },
      { id: 5, name: "Period Closed & Archived", subtitle: "Period is locked", status: "upcoming" as const },
    ],
  },
  annual: {
    periods: ["FY 2025", "FY 2024", "FY 2023", "FY 2022"],
    steps: [
      { id: 1, name: "Collect Accounting Documents", subtitle: "Finalize year-end data", status: "completed" as const },
      {
        id: 2,
        name: "Bookkeeping & Reconciliation",
        subtitle: "Final reconciliation",
        status: "current" as const,
      },
      { id: 3, name: "Accounting Reports Generated", subtitle: "Generate annual statements", status: "upcoming" as const },
      { id: 4, name: "Client Review", subtitle: "Review annual summary", status: "upcoming" as const },
      { id: 5, name: "Period Closed & Archived", subtitle: "Year is locked", status: "upcoming" as const },
    ],
  },
}

const documentSamples = [
  {
    name: "Tax Summary Report",
    type: "Tax",
    category: "Monthly report pack",
    date: "Jan 8, 2026",
    tags: ["signed"],
    visibility: "both",
  },
  {
    name: "Monthly Report Pack",
    type: "Bookkeeping",
    category: "Monthly report pack",
    date: "Jan 7, 2026",
    tags: ["signed"],
    visibility: "both",
  },
  {
    name: "Bank Statements Jan",
    type: "Bookkeeping",
    category: "Bank statement",
    date: "Jan 6, 2026",
    tags: ["verified"],
    visibility: "both",
  },
  {
    name: "Risk Assessment Note",
    type: "Tax",
    category: "Internal",
    date: "Jan 8, 2026",
    tags: ["staff-only"],
    visibility: "staff",
  },
]

const messages = [
  {
    author: "Client (John Smith)",
    message: "When will we receive the tax summary?",
    date: "Today 9:30 AM",
    role: "client",
  },
  { author: "You", message: "The draft is being reviewed. Will send by EOD.", date: "Today 9:45 AM", role: "staff" },
  { author: "Client (John Smith)", message: "Perfect, thanks!", date: "Today 9:50 AM", role: "client" },
]

export function StaffAccountingTaxView() {
  const [cycle, setCycle] = useState<Cycle>("monthly")
  const [period, setPeriod] = useState("Jan 2026")
  const [selectedStep, setSelectedStep] = useState(3)

  const config = cycleConfig[cycle]
  const currentStep = config.steps.find((s) => s.status === "current") || config.steps[0]
  const activeStep = config.steps.find((s) => s.id === selectedStep) || currentStep

  const completedCount = config.steps.filter((s) => s.status === "completed").length
  const progressPercent = Math.round((completedCount / config.steps.length) * 100)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Accounting Service" role="staff" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Accounting Service</h1>
                <p className="text-muted-foreground mt-1">Manage client accounting documents and reports</p>
              </div>
            </div>

            {/* Cycle Selector */}
            <div className="flex gap-3">
              {(["monthly", "quarterly", "annual"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCycle(c)
                    setSelectedStep(cycleConfig[c].steps.find((s) => s.status === "current")?.id || 1)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    cycle === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
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
                    <p className="text-sm text-muted-foreground mt-2">{activeStep.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <StepContent stepId={activeStep.id} cycle={cycle} role="staff" />
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

                {/* Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Client Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {messages.map((msg, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.author}</span>
                          {msg.role && (
                            <Badge variant="outline" className="text-xs">
                              {msg.role}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">All Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {documentSamples.map((doc, i) => (
                      <div key={i} className="text-xs p-2 border rounded bg-muted/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex gap-1 mt-1">
                              {doc.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-muted-foreground text-xs mt-1">{doc.date}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
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
