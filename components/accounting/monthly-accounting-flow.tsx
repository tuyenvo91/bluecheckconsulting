"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, CheckCircle2, Circle, AlertCircle, User, Calendar } from "lucide-react"
import { ProcessHeader } from "./process-header"
import { StagDeadlineDisplay } from "./stage-deadline"
import { ClientActionItem } from "./client-action-item"
import { type ProcessStatus, type StageStatus, type ActionStatus } from "@/lib/accounting-deadlines"

interface MonthlyAccountingFlowProps {
  role: "client" | "staff"
  fiscalYear: string
  month: string
  onFiscalYearChange: (year: string) => void
  onMonthChange: (month: string) => void
}

const monthOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const yearOptions = ["2026", "2025", "2024", "2023"]

export function MonthlyAccountingFlow({
  role,
  fiscalYear,
  month,
  onFiscalYearChange,
  onMonthChange,
}: MonthlyAccountingFlowProps) {
  const [selectedStage, setSelectedStage] = useState(1)
  const [monthlyStatus, setMonthlyStatus] = useState<"draft" | "submitted" | "completed">("draft")
  const [checklist, setChecklist] = useState({
    salesInvoices: false,
    purchaseInvoices: false,
    bankAccount: false,
    payroll: false,
    fixedAssets: false,
  })
  const [issues, setIssues] = useState([
    { type: "Missing", description: "Bank statement for November", status: "Open" },
    { type: "Invalid", description: "Sales invoice format incorrect", status: "Resolved" },
  ])

  // Process-level deadlines
  const [processStartDate] = useState("2026-01-01")
  const [processDeadline] = useState("2026-02-15")
  const [processStatus] = useState<ProcessStatus>("in-progress")

  // Stage deadlines
  const stageDeadlines: Record<number, { deadline: string; status: StageStatus }> = {
    1: { deadline: "2026-02-05", status: selectedStage >= 1 && monthlyStatus !== "draft" ? "completed" : "in-progress" },
    2: { deadline: "2026-02-10", status: selectedStage >= 2 ? "completed" : "upcoming" as any },
    3: { deadline: "2026-02-12", status: selectedStage >= 3 ? "completed" : "upcoming" as any },
    4: { deadline: "2026-02-13", status: selectedStage >= 4 ? "completed" : "upcoming" as any },
    5: { deadline: "2026-02-15", status: selectedStage === 5 ? "waiting-for-client" : "upcoming" as any },
  }

  const stages = [
    { id: 1, name: "Monthly Information", subtitle: "Client", icon: CheckCircle2 },
    { id: 2, name: "Accounting Posting", subtitle: "Staff", icon: Circle },
    { id: 3, name: "Reconciliation", subtitle: "Staff", icon: Circle },
    { id: 4, name: "Monthly Reports", subtitle: "Staff", icon: Circle },
    { id: 5, name: "Completion & Confirmation", subtitle: "Client", icon: Circle },
  ]

  const isClientStage = (stageId: number) => stageId === 1 || stageId === 5
  const isStaffStage = (stageId: number) => stageId >= 2 && stageId <= 4
  const canEdit = role === "client" && isClientStage(selectedStage)

  return (
    <div className="space-y-6">
      {/* Process Header with Deadlines */}
      <ProcessHeader
        fiscalYear={fiscalYear}
        periodType="monthly"
        month={month}
        processStartDate={processStartDate}
        processDeadline={processDeadline}
        processStatus={processStatus}
      />

      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex gap-4">
          <div className="flex-1">
            <Label htmlFor="fiscal-year" className="text-sm font-medium block mb-2">Fiscal Year</Label>
            <Select value={fiscalYear} onValueChange={onFiscalYearChange}>
              <SelectTrigger id="fiscal-year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="month" className="text-sm font-medium block mb-2">Month</Label>
            <Select value={month} onValueChange={onMonthChange}>
              <SelectTrigger id="month">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Monthly Accounting Status</p>
          <Badge variant={monthlyStatus === "completed" ? "default" : "secondary"} className="mt-1">
            {monthlyStatus.charAt(0).toUpperCase() + monthlyStatus.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Stages */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`w-full text-left transition-all p-3 rounded-lg border-l-4 ${
                      selectedStage === stage.id
                        ? "border-l-primary bg-primary/5"
                        : "border-l-transparent hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <stage.icon className={`w-5 h-5 ${selectedStage >= stage.id ? "text-primary" : "text-muted-foreground"}`} />
                        {index < stages.length - 1 && (
                          <div className={`w-0.5 h-8 mt-1 ${selectedStage > stage.id ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{stage.name}</p>
                        <p className="text-xs text-muted-foreground">{stage.subtitle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center & Right: Stage Content */}
        <div className="col-span-2 space-y-4">
          {/* Stage 1: Monthly Information Collection */}
          {selectedStage === 1 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stage 1: Monthly Information Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Monthly Accounting Checklist</h3>
                    <div className="space-y-3">
                      {[
                        { key: "salesInvoices", label: "Sales invoices occurred this month" },
                        { key: "purchaseInvoices", label: "Purchase invoices occurred this month" },
                        { key: "bankAccount", label: "Bank account used" },
                        { key: "payroll", label: "Payroll occurred" },
                        { key: "fixedAssets", label: "Fixed asset transactions occurred" },
                      ].map(({ key, label }) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={checklist[key as keyof typeof checklist]}
                            onCheckedChange={(checked) =>
                              setChecklist((prev) => ({ ...prev, [key]: checked }))
                            }
                            disabled={!canEdit}
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {canEdit && (
                    <Button 
                      onClick={() => setMonthlyStatus("submitted")}
                      className="w-full"
                    >
                      Submit Checklist
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">File Upload Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {canEdit ? (
                    <>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition">
                        <Upload className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Sales Documents</p>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition">
                        <Upload className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Purchase Documents</p>
                      </div>
                      {checklist.bankAccount && (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition">
                          <Upload className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Bank Statement</p>
                        </div>
                      )}
                      {checklist.payroll && (
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition">
                          <Upload className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Payroll File</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Documents have been submitted by client</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Stage 2: Accounting Posting */}
          {selectedStage === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 2: Accounting Posting</CardTitle>
                <p className="text-xs text-muted-foreground">Staff only • Not visible to client during preparation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-medium text-sm text-blue-900">Posting Completion</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p><span className="font-medium">Accounting Software:</span> MISA</p>
                    <p><span className="font-medium">Posted by:</span> Nguyễn Văn B</p>
                    <p><span className="font-medium">Posted at:</span> Nov 8, 2025 14:30</p>
                    <p><span className="font-medium">Notes:</span> Documents successfully posted. No discrepancies found.</p>
                  </div>
                </div>

                {issues.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm mb-3">Issues & Missing Information Log</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Issue Type</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                            <th className="px-4 py-2 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {issues.map((issue, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-4 py-3">{issue.type}</td>
                              <td className="px-4 py-3">{issue.description}</td>
                              <td className="px-4 py-3">
                                <Badge variant={issue.status === "Open" ? "destructive" : "secondary"}>
                                  {issue.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Reconciliation */}
          {selectedStage === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 3: Reconciliation</CardTitle>
                <p className="text-xs text-muted-foreground">Staff only • Not visible to client during preparation</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <p className="font-medium text-sm mb-2">Bank Reconciliation Summary</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Difference Amount</p>
                      <p className="font-medium">0 VND</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Explanation</p>
                      <p className="font-medium">Fully reconciled</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="font-medium text-sm mb-2">AR/AP Reconciliation Summary</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Difference Amount</p>
                      <p className="font-medium">0 VND</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Explanation</p>
                      <p className="font-medium">No outstanding items</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 4: Monthly Reports */}
          {selectedStage === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 4: Monthly Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">Trial Balance (Monthly)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fiscal Year: {fiscalYear} • Month: {month}
                    </p>
                    <p className="text-xs text-muted-foreground">Generated: Nov 8, 2025</p>
                    <Badge className="mt-2">Key Deliverable</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">Management Report Pack</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fiscal Year: {fiscalYear} • Month: {month}
                    </p>
                    <p className="text-xs text-muted-foreground">Generated: Nov 8, 2025</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 5: Completion & Confirmation */}
          {selectedStage === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 5: Monthly Completion & Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-medium text-sm text-green-900">Monthly Accounting Pack</p>
                  <p className="text-xs text-green-800 mt-2">All documents bundled for download</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download Bundle
                  </Button>
                </div>

                {canEdit && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Client Confirmation</Label>
                      <div className="mt-3 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="confirmation" defaultChecked className="cursor-pointer" />
                          <span className="text-sm">Confirm accounting completed</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="confirmation" className="cursor-pointer" />
                          <span className="text-sm">Request revision</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="comment" className="text-sm font-medium">Comments (optional)</Label>
                      <Textarea 
                        id="comment"
                        placeholder="Add any feedback..."
                        className="mt-2 text-sm"
                      />
                    </div>

                    <Button className="w-full">Confirm</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
