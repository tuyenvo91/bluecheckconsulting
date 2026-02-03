"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { CheckCircle2, AlertCircle, Clock, FileText, TrendingUp, Calendar, ChevronRight } from "lucide-react"
import { useState } from "react"

export function ClientDashboardView() {
  const [fiscalYear, setFiscalYear] = useState("2026")
  const [periodType, setPeriodType] = useState("monthly")
  const [period, setPeriod] = useState("Jan 2026")

  const periods = {
    monthly: ["Jan 2026", "Dec 2025", "Nov 2025", "Oct 2025"],
    quarterly: ["Q1 2026", "Q4 2025", "Q3 2025"],
    annual: ["FY 2026", "FY 2025"],
  }

  const services = [
    {
      id: 1,
      name: "Company Incorporation",
      currentStep: "Draft Documents Review",
      stepNumber: 3,
      totalSteps: 6,
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-900 border-blue-200",
    },
    {
      id: 2,
      name: "Accounting Service",
      currentStep: "Accounting Reports Generated",
      stepNumber: 3,
      totalSteps: 5,
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-900 border-blue-200",
    },
    {
      id: 3,
      name: "Tax Service",
      currentStep: "Client Confirmation",
      stepNumber: 3,
      totalSteps: 5,
      status: "Waiting for Client",
      statusColor: "bg-amber-50 text-amber-900 border-amber-200",
    },
    {
      id: 4,
      name: "Payroll & Social Insurance",
      currentStep: "Monthly Submission",
      stepNumber: 2,
      totalSteps: 4,
      status: "Completed",
      statusColor: "bg-green-50 text-green-900 border-green-200",
    },
  ]

  const hasActionRequired = true
  const actionItems = [
    {
      id: 1,
      type: "tax-confirmation",
      message: "Tax draft for Jan 2026 requires your confirmation",
      action: "Review & Confirm",
      href: "/client/tax",
      icon: AlertCircle,
    },
  ]

  const deadlines = [
    { id: 1, description: "VAT filing deadline", date: "Jan 15, 2026", status: "upcoming", days: 5 },
    { id: 2, description: "PIT payment deadline", date: "Jan 20, 2026", status: "upcoming", days: 10 },
    { id: 3, description: "Payroll submission", date: "Jan 25, 2026", status: "upcoming", days: 15 },
    { id: 4, description: "Monthly accounting closure", date: "Jan 31, 2026", status: "upcoming", days: 21 },
  ]

  const activities = [
    { id: 1, type: "upload", description: "Staff uploaded accounting report", timestamp: "2 hours ago" },
    { id: 2, type: "generate", description: "Tax draft generated", timestamp: "1 day ago" },
    { id: 3, type: "archive", description: "Period archived", timestamp: "3 days ago" },
  ]

  const documents = [
    { id: 1, name: "Jan-ACC-001-001", period: "Jan 2026", type: "Accounting" },
    { id: 2, name: "Jan-TAX-002-001", period: "Jan 2026", type: "Tax" },
    { id: 3, name: "Dec-ACC-001-001", period: "Dec 2025", type: "Accounting" },
    { id: 4, name: "Dec-TAX-002-001", period: "Dec 2025", type: "Tax" },
    { id: 5, name: "Dec-PAY-003-001", period: "Dec 2025", type: "Payroll" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Dashboard" role="client" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6 space-y-6">
            {/* A. Company & Period Overview */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold tracking-tight">Tech Innovations Vietnam</h1>
                      <p className="text-sm text-muted-foreground">Vietnam</p>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      <Badge variant="secondary">Accounting</Badge>
                      <Badge variant="secondary">Tax</Badge>
                      <Badge variant="secondary">Payroll</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Fiscal Year</label>
                      <Select value={fiscalYear} onValueChange={setFiscalYear}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Period Type</label>
                      <Select value={periodType} onValueChange={setPeriodType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-muted-foreground">Period</label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {periods[periodType as keyof typeof periods].map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B. Action Required */}
            {hasActionRequired && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900">Action Required</h3>
                      <p className="text-sm text-amber-800 mt-1">{actionItems[0].message}</p>
                      <Button className="mt-3" size="sm">
                        {actionItems[0].action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!hasActionRequired && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900">No Action Required</h3>
                      <p className="text-sm text-green-800">No action required at the moment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* C. Service Progress Snapshot */}
            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-4">Service Progress</h2>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => {
                  const progress = Math.round((service.stepNumber / service.totalSteps) * 100)
                  return (
                    <Card key={service.id}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{service.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{service.currentStep}</p>
                            </div>
                            <Badge className={`text-xs border ${service.statusColor}`} variant="outline">
                              {service.status}
                            </Badge>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">
                                Step {service.stepNumber} of {service.totalSteps}
                              </span>
                              <span className="text-xs font-medium">{progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            View Details <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* D. Timeline & Deadlines */}
            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-4">Upcoming Deadlines</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {deadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-center gap-4 pb-3 border-b last:border-b-0 last:pb-0">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{deadline.description}</p>
                          <p className="text-xs text-muted-foreground">{deadline.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              deadline.status === "upcoming"
                                ? "bg-blue-50 text-blue-900 border-blue-200"
                                : "bg-red-50 text-red-900 border-red-200"
                            }
                          >
                            {deadline.days}d
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* E. Recent Activities & Documents */}
            <div className="grid grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-4">Recent Activities</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Documents */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-4">Recent Documents</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.period}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="flex-shrink-0">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
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
