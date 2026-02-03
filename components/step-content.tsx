"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download, CheckCircle2, Clock, TrendingUp, Send, Flag, AlertTriangle } from "lucide-react"

type Cycle = "monthly" | "quarterly" | "annual"
type Role = "client" | "staff"

interface StepContentProps {
  stepId: number
  cycle: Cycle
  role: Role
}

// Monthly Cycle Content
function MonthlyStepContent({ stepId, role }: { stepId: number; role: Role }) {
  switch (stepId) {
    case 1: // Collect Accounting Data
      return (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Collect Accounting Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {role === "client"
                  ? "Please gather and submit all accounting documents for January 2026."
                  : "Review client submissions and request any missing documents."}
              </p>
            </div>

            {role === "client" ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Bank Statements</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Uploaded Jan 5, 2026</p>
                </div>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium">Invoice Batch #45</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload More Documents
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-900">2 documents missing</p>
                      <p className="text-yellow-800 text-xs">Expense receipts and payroll records needed</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Request Missing Documents
                </Button>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Internal Checklist</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Bank statements verified
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Invoices cross-checked
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Payroll records received
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )

    case 2: // Bookkeeping & Reconciliation
      return (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bookkeeping & Reconciliation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {role === "client"
                  ? "We are processing your accounting data and reconciling all transactions."
                  : "Process client data and prepare reconciliation summary."}
              </p>
            </div>

            {role === "client" ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">In Progress</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    Processing 127 transactions across 3 bank accounts. Expected completion: Jan 12, 2026
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task List</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Categorize transactions
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Reconcile bank accounts
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Verify inter-company transfers
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Reconciliation Notes</label>
                  <Textarea placeholder="Add internal notes about reconciliation..." className="mt-2 text-sm" />
                </div>
              </div>
            )}
          </div>
        </>
      )

    case 3: // Accounting Reports Generated
      return (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Accounting Reports Generated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {role === "client"
                  ? "Review General Ledger, Subsidiary Ledger, and Trial Balance."
                  : "Generate and validate accounting reports for client review."}
              </p>
            </div>

            {role === "client" ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="text-sm font-medium mb-1">General Ledger</p>
                  <p className="text-xs text-muted-foreground mb-3">Generated Jan 8, 2026</p>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="text-sm font-medium mb-1">Subsidiary Ledger</p>
                  <p className="text-xs text-muted-foreground mb-3">Generated Jan 8, 2026</p>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="text-sm font-medium mb-1">Trial Balance</p>
                  <p className="text-xs text-muted-foreground mb-3">Generated Jan 8, 2026</p>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Validation</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      General Ledger verified
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Subsidiary Ledger reconciled
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Trial Balance balanced
                    </label>
                  </div>
                </div>
                <Button className="w-full">Generate Accounting Reports</Button>
                <div>
                  <label className="text-sm font-medium">Report Notes</label>
                  <Textarea placeholder="Add any notes about accounting reports..." className="mt-2 text-sm" />
                </div>
              </div>
            )}
          </div>
        </>
      )

    case 4: // Tax Filing
      return (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tax Filing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {role === "client"
                  ? "Your tax return has been filed. Find the receipt below."
                  : "Submit tax return and upload filing receipt."}
              </p>
            </div>

            {role === "client" ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Filed Successfully</span>
                  </div>
                  <p className="text-xs text-green-800">Filed on Jan 11, 2026</p>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button className="w-full">Mark as Filed</Button>
                <div>
                  <label className="text-sm font-medium">Upload Filing Receipt</label>
                  <Button className="w-full mt-2 bg-transparent" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Attach Receipt
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )

    case 5: // Monthly Reports Delivered
      return (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Monthly Reports Delivered</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {role === "client"
                  ? "Download your completed monthly accounting and tax reports."
                  : "Upload completed report pack and close the month."}
              </p>
            </div>

            {role === "client" ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Ready to Download</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Tax Summary
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Monthly Report Pack
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button className="w-full">Upload Report Pack</Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Close Month
                </Button>
              </div>
            )}
          </div>
        </>
      )

    default:
      return null
  }
}

// Quarterly Cycle Content
function QuarterlyStepContent({ stepId, role }: { stepId: number; role: Role }) {
  switch (stepId) {
    case 1:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quarter Data Review</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client" ? "Review the quarterly data compilation." : "Compile and review all quarterly data."}
            </p>
          </div>
          {role === "staff" && (
            <Button className="w-full bg-transparent" variant="outline">
              Request Missing Q1 Data
            </Button>
          )}
        </div>
      )
    case 2:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quarterly Tax Calculation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "VAT/PIT/CIT provisional calculations for Q1 2026."
                : "Calculate provisional taxes (VAT/PIT/CIT) for the quarter."}
            </p>
          </div>
          {role === "client" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Q1 VAT Provisional</p>
                <p className="text-lg font-semibold">35,200,000 VND</p>
              </div>
              <div className="border rounded-lg p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Q1 CIT Provisional</p>
                <p className="text-lg font-semibold">22,800,000 VND</p>
              </div>
            </div>
          ) : (
            <Button className="w-full">Generate Quarterly Tax Calculations</Button>
          )}
        </div>
      )
    case 3:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Client Review</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Review and approve quarterly tax calculations."
                : "Monitor client review and approval status."}
            </p>
          </div>
          {role === "client" ? (
            <Button className="w-full">Send Approval</Button>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">Awaiting client approval...</p>
            </div>
          )}
        </div>
      )
    case 4:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Filing & Submission</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Quarterly tax returns have been filed."
                : "File quarterly returns with tax authorities."}
            </p>
          </div>
          {role === "staff" && <Button className="w-full">Mark Quarterly Filing Complete</Button>}
        </div>
      )
    case 5:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quarter Closed</h3>
            <p className="text-sm text-muted-foreground">Q1 2026 accounting and tax cycle completed.</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

// Annual Cycle Content
function AnnualStepContent({ stepId, role }: { stepId: number; role: Role }) {
  switch (stepId) {
    case 1:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Year-End Data Finalization</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Finalize all accounting data for FY 2025."
                : "Compile and finalize year-end accounting data."}
            </p>
          </div>
          {role === "staff" && (
            <Button className="w-full bg-transparent" variant="outline">
              Request Year-End Adjustments
            </Button>
          )}
        </div>
      )
    case 2:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Financial Statements Preparation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Review your financial statements for FY 2025."
                : "Prepare audited financial statements."}
            </p>
          </div>
          {role === "staff" && <Button className="w-full">Generate Financial Statements</Button>}
        </div>
      )
    case 3:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Tax Finalization</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Final PIT/CIT calculations and adjustments."
                : "Finalize PIT/CIT calculations with any adjustments."}
            </p>
          </div>
          {role === "staff" && <Button className="w-full">Finalize Annual Taxes</Button>}
        </div>
      )
    case 4:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Filing & Submission</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {role === "client"
                ? "Annual tax returns have been filed with authorities."
                : "Submit annual returns to tax authorities."}
            </p>
          </div>
          {role === "staff" && <Button className="w-full">Submit Annual Returns</Button>}
        </div>
      )
    case 5:
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Year Closed</h3>
            <p className="text-sm text-muted-foreground">FY 2025 accounting and tax cycle completed.</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

export function StepContent({ stepId, cycle, role }: StepContentProps) {
  if (cycle === "monthly") {
    return <MonthlyStepContent stepId={stepId} role={role} />
  } else if (cycle === "quarterly") {
    return <QuarterlyStepContent stepId={stepId} role={role} />
  } else if (cycle === "annual") {
    return <AnnualStepContent stepId={stepId} role={role} />
  }

  return null
}
