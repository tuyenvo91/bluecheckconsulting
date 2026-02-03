"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { CheckCircle2, Circle, Download, MessageSquare, FileText, Flag } from "lucide-react"

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
    verified: true,
  },
  {
    id: 2,
    type: "Salary Change",
    employee: "Tran Thi B",
    date: "Jan 5, 2026",
    status: "completed",
    documents: ["Salary Adjustment Notice"],
    verified: true,
  },
  {
    id: 3,
    type: "Employee Termination",
    employee: "Le Van C",
    date: "Dec 28, 2025",
    status: "completed",
    documents: ["Termination Letter", "Final Settlement"],
    verified: true,
  },
  {
    id: 4,
    type: "New Employee Registration",
    employee: "Pham Thi D",
    date: "Jan 15, 2026",
    status: "pending",
    documents: ["Employment Contract", "ID Copy"],
    verified: false,
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

export function StaffPayrollView() {
  const [cycle, setCycle] = useState<Cycle>("monthly")
  const [period, setPeriod] = useState("Jan 2026")
  const [selectedStep, setSelectedStep] = useState(3)
  const [staffNotes, setStaffNotes] = useState(
    "Checked employee roster - all data current. Ready for salary calculation.",
  )

  const config = cycleConfig[cycle]
  const steps = config.steps
  const currentStep = steps.find((s) => s.status === "current") || steps[0]
  const activeStep = steps.find((s) => s.id === selectedStep) || currentStep

  const completedCount = steps.filter((s) => s.status === "completed").length
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0

  const stepContent = {
    1: {
      title: "Collect Payroll Inputs",
      description: "Verify and manage employee and salary data.",
      staffOnly: (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <div className="flex gap-2">
              <Flag className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Review Required</p>
                <p className="text-xs text-yellow-800">1 employee with pending salary change</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Staff Notes</label>
            <Textarea
              value={staffNotes}
              onChange={(e) => setStaffNotes(e.target.value)}
              placeholder="Add internal notes..."
              className="text-xs"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">Request Changes</Button>
            <Button variant="outline" className="flex-1 text-sm bg-transparent">
              Resolve Issue
            </Button>
          </div>
        </div>
      ),
    },
    2: {
      title: "Salary Calculation",
      description: "Monitor and manage salary calculations and deductions.",
      staffOnly: (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Calculation Validation</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs">Gross pay formula verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs">Deductions calculated</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-neutral-400" />
                <span className="text-xs">Final review pending</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Staff Notes</label>
            <Textarea placeholder="Add calculation notes..." className="text-xs" rows={2} />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">Approve Calculations</Button>
        </div>
      ),
    },
    3: {
      title: "Payslip Generation & Review",
      description: "Generate and review payslips before client approval.",
      staffOnly: (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <p className="text-xs text-neutral-600 mb-1">Generated</p>
              <p className="font-bold">12</p>
            </div>
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
              <p className="text-xs text-neutral-600 mb-1">Pending Review</p>
              <p className="font-bold">12</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Staff Notes</label>
            <Textarea placeholder="Add review notes..." className="text-xs" rows={2} />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">Generate Payslips</Button>
            <Button variant="outline" className="flex-1 text-sm bg-transparent">
              Regenerate
            </Button>
          </div>
        </div>
      ),
    },
    4: {
      title: "PIT Declaration",
      description: "Manage personal income tax declarations.",
      staffOnly: (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-600">Declaration ID:</span>
              <span className="font-medium">PIT-202601-001</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-600">Submitted by:</span>
              <span className="font-medium">Tran Thi Lan</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-600">Submission time:</span>
              <span className="font-medium">Jan 10, 2:30 PM</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Staff Notes</label>
            <Textarea placeholder="Add declaration notes..." className="text-xs" rows={2} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-sm bg-transparent">
              View Declaration
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">Mark as Filed</Button>
          </div>
        </div>
      ),
    },
    5: {
      title: "Social Insurance Reporting",
      description: "Manage social insurance reports and close payroll cycles.",
      staffOnly: (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
            <p className="text-sm font-medium text-emerald-900">Month Closed</p>
            <p className="text-xs text-emerald-800">All payroll processes completed</p>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 block mb-2">Staff Notes</label>
            <Textarea placeholder="Add closure notes..." className="text-xs" rows={2} />
          </div>
          <Button variant="outline" className="w-full text-sm bg-transparent">
            Archive Period
          </Button>
        </div>
      ),
    },
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar activeItem="Payroll & Social Insurance" role="staff" /> {/* added props */}
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Service Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">Payroll & Social Insurance</h1>
                <p className="text-neutral-600 mt-1">Staff view - Internal payroll management</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Staff Only</Badge>
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
                        <div className="h-full bg-purple-600 transition-all" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="space-y-3">
                      {steps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setSelectedStep(step.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedStep === step.id ? "bg-purple-50 border border-purple-200" : "hover:bg-neutral-100"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {step.status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : step.status === "current" ? (
                                <div className="w-5 h-5 rounded-full bg-purple-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-neutral-300" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  selectedStep === step.id ? "text-purple-900" : "text-neutral-900"
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
                      <div>
                        <p className="text-xs font-medium text-purple-600 mb-1">
                          Step {activeStep.id} of {steps.length}
                        </p>
                        <CardTitle className="text-2xl">{stepContent[activeStep.id].title}</CardTitle>
                        <p className="text-neutral-600 text-sm mt-2">{stepContent[activeStep.id].description}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">{stepContent[activeStep.id].staffOnly}</CardContent>
                  </Card>
                </div>
              ) : (
                <div className="col-span-9">
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Insurance Events - Staff View</CardTitle>
                      <p className="text-neutral-600 text-sm mt-2">Verify and manage employee events</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {eventsSample.map((event) => (
                          <div key={event.id} className="border border-neutral-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-medium text-neutral-900">{event.type}</p>
                                <p className="text-sm text-neutral-600">{event.employee}</p>
                              </div>
                              <div className="flex gap-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    event.status === "completed"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {event.status === "completed" ? "Completed" : "Pending"}
                                </span>
                                {event.verified && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 mb-2">{event.date}</p>
                            <p className="text-xs text-neutral-600 mb-3">Documents: {event.documents.join(", ")}</p>
                            {!event.verified && (
                              <div className="flex gap-2">
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs h-8">
                                  Verify & Approve
                                </Button>
                                <Button variant="outline" className="flex-1 text-xs h-8 bg-transparent">
                                  Request Info
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Right: Internal Actions + Documents */}
              <div className="col-span-3 space-y-4">
                {/* Internal Actions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Internal Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {cycle !== "events" && activeStep.id <= 3 ? (
                      <>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm h-9">
                          {activeStep.id === 1 && "Validate Employee Data"}
                          {activeStep.id === 2 && "Review Calculations"}
                          {activeStep.id === 3 && "Send to Client"}
                        </Button>
                        <Button variant="outline" className="w-full text-sm h-9 bg-transparent">
                          Add Note
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-neutral-600">No pending actions</p>
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
