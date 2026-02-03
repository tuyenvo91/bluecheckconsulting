"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, Upload } from "lucide-react"
import { type ActionStatus, getStatusLabel, getDaysUntilDeadline } from "@/lib/accounting-deadlines"

interface ClientActionItemProps {
  id: string
  actionType: "upload" | "confirm" | "revise"
  requiredDocument?: string
  deadline: string
  status: ActionStatus
  submittedTimestamp?: string
  causedDelay?: "client" | "staff"
  onAction?: () => void
}

export function ClientActionItem({
  id,
  actionType,
  requiredDocument,
  deadline,
  status,
  submittedTimestamp,
  causedDelay,
  onAction,
}: ClientActionItemProps) {
  const daysRemaining = getDaysUntilDeadline(deadline)
  const isLate = status === "late"
  const isSubmitted = status === "submitted"

  const getActionIcon = () => {
    switch (actionType) {
      case "upload":
        return <Upload className="w-4 h-4" />
      case "confirm":
        return <CheckCircle2 className="w-4 h-4" />
      case "revise":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getActionLabel = () => {
    switch (actionType) {
      case "upload":
        return "Upload Required"
      case "confirm":
        return "Confirmation Required"
      case "revise":
        return "Revision Required"
      default:
        return "Action Required"
    }
  }

  const getStatusColor = () => {
    if (isSubmitted) return "bg-green-50 border-green-200"
    if (isLate) return "bg-red-50 border-red-200"
    return ""
  }

  return (
    <Card className={`border ${getStatusColor()}`}>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-2 rounded-lg ${isSubmitted ? "bg-green-100" : isLate ? "bg-red-100" : "bg-blue-100"}`}>
                {getActionIcon()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{getActionLabel()}</p>
                {requiredDocument && (
                  <p className="text-xs text-muted-foreground">
                    Document: <span className="font-medium">{requiredDocument}</span>
                  </p>
                )}
                {isSubmitted && submittedTimestamp && (
                  <p className="text-xs text-green-700 mt-1">Submitted on {submittedTimestamp}</p>
                )}
              </div>
            </div>
            <Badge
              variant={isSubmitted ? "default" : isLate ? "destructive" : "secondary"}
              className="flex-shrink-0"
            >
              {getStatusLabel(status)}
            </Badge>
          </div>

          {/* Deadline */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{deadline}</span>
            </div>
            <span className={`text-sm font-medium ${isLate ? "text-red-600" : ""}`}>
              {isSubmitted ? "Submitted" : isLate ? `${Math.abs(daysRemaining)} days late` : `${daysRemaining} days left`}
            </span>
          </div>

          {/* Delay Attribution */}
          {causedDelay && (
            <div
              className={`text-xs p-2 rounded flex items-start gap-2 ${
                causedDelay === "client"
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>
                Delay caused by:{" "}
                <strong>{causedDelay === "client" ? "Client (you)" : "Accounting Staff"}</strong>
              </span>
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted && (
            <Button
              onClick={onAction}
              variant={isLate ? "destructive" : "default"}
              size="sm"
              className="w-full"
            >
              {actionType === "upload" ? "Upload Document" : actionType === "confirm" ? "Confirm" : "Request Revision"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
