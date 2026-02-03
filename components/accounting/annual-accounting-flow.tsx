"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, CheckCircle2, Circle } from "lucide-react"
import { ProcessHeader } from "./process-header"
import { StagDeadlineDisplay } from "./stage-deadline"
import { ClientActionItem } from "./client-action-item"
import { type ProcessStatus, type StageStatus } from "@/lib/accounting-deadlines"

interface AnnualAccountingFlowProps {
  role: "client" | "staff"
  fiscalYear: string
  onFiscalYearChange: (year: string) => void
}

const yearOptions = ["2025", "2024", "2023", "2022"]

export function AnnualAccountingFlow({
  role,
  fiscalYear,
  onFiscalYearChange,
}: AnnualAccountingFlowProps) {
  const [selectedStage, setSelectedStage] = useState(1)

  // Process-level deadlines for annual
  const [processStartDate] = useState("2026-01-15")
  const [processDeadline] = useState("2026-03-31")
  const [processStatus] = useState<ProcessStatus>("in-progress")

  // Stage deadlines
  const stageDeadlines: Record<number, { deadline: string; status: StageStatus }> = {
    1: { deadline: "2026-02-28", status: selectedStage >= 1 ? "completed" : "in-progress" },
    2: { deadline: "2026-03-15", status: selectedStage >= 2 ? "completed" : "upcoming" as any },
    3: { deadline: "2026-03-31", status: selectedStage === 3 ? "waiting-for-client" : "upcoming" as any },
  }

  const stages = [
    { id: 1, name: "Year-end Review", subtitle: "Staff" },
    { id: 2, name: "Financial Statements", subtitle: "Staff" },
    { id: 3, name: "Annual Handover", subtitle: "Client" },
  ]

  const canEdit = role === "client" && selectedStage === 3

  return (
    <div className="space-y-6">
      {/* Process Header with Deadlines */}
      <ProcessHeader
        fiscalYear={fiscalYear}
        periodType="annual"
        processStartDate={processStartDate}
        processDeadline={processDeadline}
        processStatus={processStatus}
      />

      {/* Fiscal Year Selector */}
      <div>
        <Label htmlFor="fiscal-year" className="text-sm font-medium block mb-2">Fiscal Year</Label>
        <Select value={fiscalYear} onValueChange={onFiscalYearChange}>
          <SelectTrigger id="fiscal-year" className="w-48">
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
                        <CheckCircle2 className={`w-5 h-5 ${selectedStage >= stage.id ? "text-primary" : "text-muted-foreground"}`} />
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
          {/* Stage 1: Year-end Review */}
          {selectedStage === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 1: Year-end Review</CardTitle>
                <p className="text-xs text-muted-foreground">Staff only • Not visible to client during preparation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-sm mb-4">Year-end Review Checklist</h3>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <p className="text-sm">All monthly periods reviewed and approved</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <p className="text-sm">Year-end adjustments recorded</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <p className="text-sm">Depreciation and amortization calculated</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <p className="text-sm">Final reconciliations completed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-medium text-sm text-blue-900">Adjustment Summary</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p><span className="font-medium">Adjustments Made:</span> 5</p>
                    <p><span className="font-medium">Total Adjustment Amount:</span> 2,500,000 VND</p>
                    <p><span className="font-medium">Review Status:</span> Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage 2: Financial Statements */}
          {selectedStage === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 2: Financial Statements</CardTitle>
                <p className="text-xs text-muted-foreground">Key deliverables for fiscal year {fiscalYear}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Balance Sheet", description: "Assets, Liabilities, Equity" },
                  { name: "Income Statement", description: "Revenues and Expenses" },
                  { name: "Cash Flow Statement", description: "Operating, Investing, Financing Activities" },
                  { name: "Notes to Financial Statements", description: "Detailed explanations and accounting policies" },
                ].map((statement, idx) => (
                  <div key={idx} className="border rounded-lg p-4 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{statement.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{statement.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Generated: Dec 15, 2025</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Stage 3: Annual Handover & Confirmation */}
          {selectedStage === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stage 3: Annual Handover & Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-medium text-sm text-green-900">Annual Accounting Handover Pack</p>
                  <p className="text-xs text-green-800 mt-2">Complete financial statements and supporting documents</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download Package
                  </Button>
                </div>

                {canEdit && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Annual Confirmation</Label>
                      <div className="mt-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="annual-confirmation" defaultChecked className="cursor-pointer" />
                          <span className="text-sm">Confirm annual accounting completed</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="annual-comment" className="text-sm font-medium">Comments (optional)</Label>
                      <Textarea 
                        id="annual-comment"
                        placeholder="Add any feedback or questions..."
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
