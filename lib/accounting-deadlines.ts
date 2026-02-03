export type ProcessStatus = "draft" | "in-progress" | "waiting-for-client" | "completed" | "overdue"
export type StageStatus = "not-started" | "in-progress" | "waiting-for-client" | "completed" | "overdue"
export type ActionStatus = "pending" | "submitted" | "late"

export interface ProcessDeadlines {
  processStartDate: string
  processDeadline: string
  processStatus: ProcessStatus
}

export interface StageDeadline {
  stageId: number
  stageName: string
  responsibleRole: "client" | "accounting-staff"
  stageDeadline: string
  stageStatus: StageStatus
  overdueReasonIfAny?: string
}

export interface ClientAction {
  id: string
  actionType: "upload" | "confirm" | "revise"
  requiredDocument?: string
  deadline: string
  status: ActionStatus
  submittedTimestamp?: string
  causedDelay?: "client" | "staff"
}

export function calculateProcessStatus(
  currentDate: string,
  deadline: string,
  isCompleted: boolean
): ProcessStatus {
  if (isCompleted) return "completed"

  const today = new Date(currentDate)
  const deadlineDate = new Date(deadline)

  if (today > deadlineDate) {
    return "overdue"
  }

  return "in-progress"
}

export function calculateStageStatus(
  currentDate: string,
  stageDeadline: string,
  isCompleted: boolean,
  isWaitingForClient: boolean
): StageStatus {
  if (isCompleted) return "completed"
  if (isWaitingForClient) return "waiting-for-client"

  const today = new Date(currentDate)
  const deadline = new Date(stageDeadline)

  if (today > deadline) {
    return "overdue"
  }

  return "in-progress"
}

export function calculateActionStatus(
  currentDate: string,
  deadline: string,
  isSubmitted: boolean
): ActionStatus {
  if (isSubmitted) return "submitted"

  const today = new Date(currentDate)
  const actionDeadline = new Date(deadline)

  if (today > actionDeadline) {
    return "late"
  }

  return "pending"
}

export function getDaysUntilDeadline(deadline: string, currentDate: string = new Date().toISOString()): number {
  const today = new Date(currentDate)
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getOverdayDays(deadline: string, currentDate: string = new Date().toISOString()): number {
  const days = getDaysUntilDeadline(deadline, currentDate)
  return days < 0 ? Math.abs(days) : 0
}

export function getStatusBadgeColor(status: StageStatus | ProcessStatus | ActionStatus): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "waiting-for-client":
      return "bg-amber-100 text-amber-800"
    case "overdue":
    case "late":
      return "bg-red-100 text-red-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    case "not-started":
      return "bg-gray-100 text-gray-800"
    case "pending":
      return "bg-blue-100 text-blue-800"
    case "submitted":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Draft",
    "in-progress": "In Progress",
    "waiting-for-client": "Waiting for Client",
    completed: "Completed",
    overdue: "Overdue",
    "not-started": "Not Started",
    pending: "Pending",
    submitted: "Submitted",
    late: "Late",
  }
  return labels[status] || "Unknown"
}
