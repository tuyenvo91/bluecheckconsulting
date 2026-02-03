"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { type StageStatus, getStatusLabel, getStatusBadgeColor, getDaysUntilDeadline } from "@/lib/accounting-deadlines"

interface StagDeadlineProps {
  stageId: number
  stageName: string
  responsibleRole: "client" | "accounting-staff"
  stageDeadline: string
  stageStatus: StageStatus
  overdueReasonIfAny?: string
  onOverdueReasonChange?: (reason: string) => void
}

export function StagDeadlineDisplay({
  stageId,
  stageName,
  responsibleRole,
  stageDeadline,
  stageStatus,
  overdueReasonIfAny,
  onOverdueReasonChange,
}: StagDeadlineProps) {
  const [blockingReason, setBlockingReason] = useState(overdueReasonIfAny || "")
  const daysRemaining = getDaysUntilDeadline(stageDeadline)
  const isOverdue = stageStatus === "overdue"

  return (
    <Card className={isOverdue ? "border-red-200 bg-red-50" : ""}>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{stageName}</p>
              <p className="text-xs text-muted-foreground">
                Responsible: {responsibleRole === "client" ? "You (Client)" : "Accounting Staff"}
              </p>
            </div>
            <Badge variant={stageStatus === "completed" ? "default" : stageStatus === "overdue" ? "destructive" : "secondary"}>
              {getStatusLabel(stageStatus)}
            </Badge>
          </div>

          {/* Deadline & Days */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground">Stage Deadline</p>
                <p className="text-sm font-medium">{stageDeadline}</p>
              </div>
            </div>
            <div className={`text-right ${isOverdue ? "text-red-600" : ""}`}>
              <p className="text-xs font-medium text-muted-foreground">
                {isOverdue ? "Overdue" : "Days Remaining"}
              </p>
              <p className="text-sm font-bold">{isOverdue ? `${Math.abs(daysRemaining)} days` : `${daysRemaining} days`}</p>
            </div>
          </div>

          {/* Overdue Blocking Reason */}
          {isOverdue && (
            <div className="pt-2 border-t">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-red-900">This stage is overdue. What is causing the delay?</p>
                  <p className="text-xs text-red-800 mt-0.5">Please provide a brief reason for tracking purposes.</p>
                </div>
              </div>
              <Textarea
                placeholder="Enter blocking reason..."
                value={blockingReason}
                onChange={(e) => {
                  setBlockingReason(e.target.value)
                  onOverdueReasonChange?.(e.target.value)
                }}
                className="text-sm"
                rows={2}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
