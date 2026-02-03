"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react"

interface ProcessHeaderProps {
  fiscalYear: string
  periodType: "monthly" | "annual"
  month?: string
  processStartDate: string
  processDeadline: string
  processStatus: "draft" | "in-progress" | "waiting-for-client" | "completed" | "overdue"
}

export function ProcessHeader({
  fiscalYear,
  periodType,
  month,
  processStartDate,
  processDeadline,
  processStatus,
}: ProcessHeaderProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "waiting-for-client":
        return "outline"
      case "overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Draft"
      case "in-progress":
        return "In Progress"
      case "waiting-for-client":
        return "Waiting for Client"
      case "completed":
        return "Completed"
      case "overdue":
        return "Overdue"
      default:
        return "Unknown"
    }
  }

  const periodSummary =
    periodType === "monthly"
      ? `Accounting Period: ${month} ${fiscalYear}`
      : `Accounting Period: Fiscal Year ${fiscalYear}`

  const processDeadlineDate = new Date(processDeadline)
  const today = new Date()
  const isOverdue = processStatus === "overdue"

  return (
    <Card className={isOverdue ? "border-red-200 bg-red-50" : ""}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Period Summary */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{periodSummary}</h3>
              <p className="text-xs text-muted-foreground">
                Process Type: {periodType === "monthly" ? "Monthly Accounting" : "Annual Accounting"}
              </p>
            </div>
            <Badge variant={getStatusBadgeVariant(processStatus)}>
              {getStatusLabel(processStatus)}
            </Badge>
          </div>

          {/* Deadline Information */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Process Start</p>
              <p className="text-sm font-medium">{processStartDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Process Deadline</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{processDeadline}</p>
                {isOverdue && <AlertCircle className="w-4 h-4 text-red-600" />}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Days Remaining</p>
              <p className={`text-sm font-medium ${isOverdue ? "text-red-600" : ""}`}>
                {isOverdue ? `${Math.abs(Math.ceil((today.getTime() - processDeadlineDate.getTime()) / (1000 * 60 * 60 * 24)))} days overdue` : `${Math.ceil((processDeadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
