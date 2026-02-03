"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { CheckCircle2, Circle, Download, MessageSquare, FileText } from "lucide-react"

type Cycle = "monthly" | "quarterly" | "events"

const cycleConfig = {
  monthly: {
    periods: ["Jan 2026", "Dec 2025", "Nov 2025", "Oct 2025", "Sep 2025"],
    steps: [
      {
        id: 1,
        name: "Collect Payroll Inputs",
        subtitle: "Confirm employee and salary data",
        status: "completed" as const,
      },
      {
        id: 2,
        name: "Salary Calculation",
        subtitle: "We calculate salaries and deductions",
        status: "completed" as const,
      },
      {
        id: 3,
        name: "Payslip Generation & Review",
        subtitle: "Review and approve payroll drafts",
        status: "current" as const,
      },
      {
        id: 4,
        name: "PIT Declaration",
        subtitle: "We declare personal income tax",
        status: "upcoming" as const,
      },
      {
        id: 5,
        name: "Social Insurance Reporting",
        subtitle: "Social insurance reporting and closure",
        status: "upcoming" as const,
      },
    ],
  },
  quarterly: {
    periods: ["Q1 2026", "Q4 2025", "Q3 2025", "Q2 2025", "Q1 2025"],
    steps: [
      {
        id: 1,
        name: "Quarterly Payroll Review",
        subtitle: "Review Q1 payroll records",
        status: "completed" as const,
      },
      {
        id: 2,
        name: "Quarterly Reconciliation",
        subtitle: "Reconcile all social insurance contributions",
        status: "current" as const,
      },
      {
        id: 3,
        name: "Quarterly Reporting",
        subtitle: "Prepare quarterly payroll reports",
        status: "upcoming" as const,
      },
    ],
  },
  events: {
    periods: ["All Events", "2026", "2025"],
    steps: [],
  },
}

const eventsSample = [
  {
    id: 1,
    type: "New Employee Registration",
    employee: "Nguyen Van A",
    date: "Jan 10, 2026",
    status: "completed",
    documents: ["Employment Contract", "ID Copy"],
  },
  {
    id: 2,
    type: "Salary Change",
    employee: "Tran Thi B",
    date: "Jan 5, 2026",
    status: "completed",
    documents: ["Salary Adjustment Notice"],
  },
  {
    id: 3,
    type: "Employee Termination",
    employee: "Le Van C",
    date: "Dec 28, 2025",
    status: "completed",
    documents: ["Termination Letter", "Final Settlement"],
  },
  {
    id: 4,
    type: "New Employee Registration",
    employee: "Pham Thi D",
    date: "Jan 15, 2026",
    status: "pending",
    documents: ["Employment Contract", "ID Copy"],
  },
]

const recentDocuments = [
  {
    name: "Payslip Batch - Jan 2026",
    type: "Payroll",
    date: "Jan 8, 2026",
    tags: ["draft"],
  },
  {
    name: "PIT Declaration - Dec 2025",
    type: "Tax",
    date: "Jan 3, 2026",
    tags: ["filed"],
  },
  {
    name: "Social Insurance Report - Dec 2025",
    type: "Insurance",
    date: "Jan 2, 2026",
    tags: ["filed"],
  },
]

export function ClientPayrollView() {
  const [cycle, setCycle] = useState<Cycle>("monthly")
  const [period, setPeriod] = useState("Jan 2026")
  const [selectedStep, setSelectedStep] = useState(3)

  const config = cycleConfig[cycle]
  const steps = config.steps
  const currentStep = steps.find((s) => s.status === "current") || steps[0]
  const activeStep = steps.find((s) => s.id === selectedStep) || currentStep

  const completedCount = steps.filter((s) => s.status === "completed").length
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0

  const stepContent = {
    1: {
      title: "Collect Payroll Inputs",
      description: "Please confirm your employee roster and salary information for this period.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 p-4">
            <h4 className="font-medium mb-2">Payroll Checklist</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Employee list updated</span>
              </li>
              <li className="flex items-start gap-3">
                <Circle className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Salary changes confirmed</span>
              </li>
              <li className="flex items-start gap-3">
                <Circle className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Attendance and overtime recorded</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-neutral-600">Current employees: 12 | Salary changes: 1 | Outstanding actions: 1</p>
        </div>
      ),
      cta: "Confirm Payroll Inputs",
    },
    2: {
      title: "Salary Calculation",
      description: "Our team is calculating salaries and deductions based on the inputs provided.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-600 mb-3">Calculation in progress...</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Gross payroll amount:</span>
                <span className="font-medium">Calculating...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Social insurance deductions:</span>
                <span className="font-medium">Calculating...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>PIT deductions:</span>
                <span className="font-medium">Calculating...</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-500">Estimated completion: Today at 5:00 PM</p>
        </div>
      ),
      cta: null,
    },
    3: {
      title: "Payslip Generation & Review",
      description: "Review and approve your payroll before we submit it to authorities.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₫145,500,000</p>
                <p className="text-xs text-neutral-600 mt-1">for 12 employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">PIT Withheld</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₫12,300,000</p>
                <p className="text-xs text-neutral-600 mt-1">to be declared</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-neutral-600">Draft payslips are ready for review. Total records: 12</p>
        </div>
      ),
      cta: "Approve Payroll",
    },
    4: {
      title: "PIT Declaration",
      description: "Personal income tax declaration has been submitted to the tax authorities.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-900 mb-2">Declaration Status: Submitted</p>
            <p className="text-sm text-emerald-800">Submitted on Jan 10, 2026 at 2:30 PM</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">PIT Summary:</p>
            <div className="text-sm space-y-1 text-neutral-600">
              <div className="flex justify-between">
                <span>Total PIT withheld:</span>
                <span>₫12,300,000</span>
              </div>
              <div className="flex justify-between">
                <span>Number of employees:</span>
                <span>12</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-500">No action required at this time.</p>
        </div>
      ),
      cta: null,
    },
    5: {
      title: "Social Insurance Reporting",
      description: "Social insurance contributions have been reported and the month is closed.",
      content: (
        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-900 mb-2">Reporting Status: Complete</p>
            <p className="text-sm text-emerald-800">Month of January 2026 is now closed</p>
          </div>
          <p className="text-sm text-neutral-600">
            All payroll processes for this period have been completed and submitted to authorities.
          </p>
          <p className="text-sm text-neutral-500">Next payroll cycle: February 2026</p>
        </div>
      ),
      cta: null,
    },
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar activeItem="Payroll & Social Insurance" role="client" />
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Service Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-neutral-900">Payroll & Social Insurance</h1>
              <p className="text-neutral-600 mt-1">
                Manage payroll processing, tax declarations, and social insurance reporting
              </p>
            </div>

            {/* Cycle and Period Selection */}
            <div className="flex gap-4 mb-6">
              <div className="w-40">
                <label className="text-xs font-medium text-neutral-600 block mb-2">Cycle Type</label>
                <Select
                  value={cycle}
                  onValueChange={(v) => {
                    setCycle(v as Cycle)
                    setSelectedStep(1)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {cycle !== "events" && (
                <div className="w-40">
                  <label className="text-xs font-medium text-neutral-600 block mb-2">Period</label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
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
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Stepper */}
              {cycle !== "events" && (
                <div className="col-span-3">
                  <div className="sticky top-20">
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-neutral-600">Progress</span>
                        <span className="text-xs font-bold text-neutral-900">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="space-y-3">
                      {steps.map((step, idx) => (
                        <button
                          key={step.id}
                          onClick={() => setSelectedStep(step.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedStep === step.id ? "bg-blue-50 border border-blue-200" : "hover:bg-neutral-100"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {step.status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : step.status === "current" ? (
                                <div className="w-5 h-5 rounded-full bg-blue-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-neutral-300" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  selectedStep === step.id ? "text-blue-900" : "text-neutral-900"
                                }`}
                              >
                                {step.name}
                              </p>
                              <p className="text-xs text-neutral-500 truncate">{step.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Center: Step Details */}
              {cycle !== "events" ? (
                <div className="col-span-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-medium text-blue-600 mb-1">
                            Step {activeStep.id} of {steps.length}
                          </p>
                          <CardTitle className="text-2xl">{stepContent[activeStep.id].title}</CardTitle>
                          <p className="text-neutral-600 text-sm mt-2">{stepContent[activeStep.id].description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {stepContent[activeStep.id].content}
                      {stepContent[activeStep.id].cta && (
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          {stepContent[activeStep.id].cta}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="col-span-9">
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Insurance Events</CardTitle>
                      <p className="text-neutral-600 text-sm mt-2">
                        Track employee registration, salary changes, and terminations
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {eventsSample.map((event) => (
                          <div key={event.id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-neutral-900">{event.type}</p>
                                <p className="text-sm text-neutral-600">{event.employee}</p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  event.status === "completed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {event.status === "completed" ? "Completed" : "Pending"}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 mb-2">{event.date}</p>
                            <p className="text-xs text-neutral-600">Documents: {event.documents.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Right: Next Actions + Messages + Documents */}
              <div className="col-span-3 space-y-4">
                {/* Next Action Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Your Next Action</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {cycle !== "events" && activeStep.id <= 3 ? (
                      <>
                        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                          <p className="text-sm font-medium text-blue-900">
                            {activeStep.id === 1 && "Confirm employee roster"}
                            {activeStep.id === 2 && "Review salary calculations"}
                            {activeStep.id === 3 && "Approve payslips"}
                          </p>
                        </div>
                        <p className="text-xs text-neutral-600">
                          {activeStep.id === 1 && "Due by Jan 25, 2026"}
                          {activeStep.id === 2 && "Automatic processing - no action needed"}
                          {activeStep.id === 3 && "Due by Jan 28, 2026"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-neutral-600">No action required at this time.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Messages Mini */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-neutral-600 text-center py-4">No new messages</p>
                  </CardContent>
                </Card>

                {/* Recent Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Recent Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recentDocuments.map((doc, idx) => (
                      <div key={idx} className="text-xs border-b border-neutral-100 pb-2 last:border-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-neutral-900 truncate">{doc.name}</p>
                            <p className="text-neutral-500">{doc.date}</p>
                          </div>
                          <Download className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex gap-1 mt-1">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
