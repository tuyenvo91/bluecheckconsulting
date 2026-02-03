"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { CheckCircle2, Circle, AlertCircle, Shield, Send, Flag, CheckSquare } from "lucide-react"

const phases = [
  {
    id: 1,
    name: "Phase 1: Pre-check & Planning",
    tasks: [
      {
        id: 1,
        name: "Free legal consultation & dissolution eligibility review",
        owner: "Staff",
        status: "completed" as const,
        evidence: [{ name: "Consultation Notes", status: "verified" as const }],
        notes: "Company eligible for standard dissolution",
        internalNotes: "No blocking issues identified. Proceed to next phase.",
      },
      {
        id: 2,
        name: "Collect company basic info & dissolution intent confirmation",
        owner: "Client",
        status: "completed" as const,
        evidence: [{ name: "Company Info Form", status: "uploaded" as const }],
        notes: "All required information received",
        internalNotes: "Verified completeness and accuracy.",
      },
      {
        id: 3,
        name: "Create debt inventory",
        owner: "Staff",
        status: "in-progress" as const,
        evidence: [],
        notes: "Reviewing financial records",
        internalNotes: "Found preliminary tax liability of $5,000. Need to verify with tax authority.",
      },
    ],
  },
  {
    id: 2,
    name: "Phase 2: Prepare Dissolution Documents",
    tasks: [
      {
        id: 4,
        name: "Draft dissolution decision & meeting minutes",
        owner: "Staff",
        status: "in-progress" as const,
        evidence: [],
        notes: "Documents being prepared",
        internalNotes: "Draft ready, pending legal review before sending to client.",
      },
      {
        id: 5,
        name: "Client review & sign dissolution documents",
        owner: "Client",
        status: "waiting-client" as const,
        evidence: [],
        notes: "Action required: Please review and sign",
        dueDate: "Jan 20, 2026",
        internalNotes: "Sent for signature on Jan 10. Follow up if not signed by due date.",
      },
      {
        id: 6,
        name: "Prepare creditor/debt list & employee list",
        owner: "Client + Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "Pending client signature on Phase 2 documents",
      },
    ],
  },
  {
    id: 3,
    name: "Phase 3: Settle Debts & Obligations",
    tasks: [
      {
        id: 7,
        name: "Confirm employee obligations & settlements",
        owner: "Client",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "Will activate after debt inventory is complete",
      },
      {
        id: 8,
        name: "Tax obligations review and plan",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "",
      },
    ],
  },
  {
    id: 4,
    name: "Phase 4: Government Submission",
    tasks: [
      {
        id: 9,
        name: "Submit dissolution dossier",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "",
      },
    ],
  },
  {
    id: 5,
    name: "Phase 5: Tax Code Closure",
    tasks: [
      {
        id: 10,
        name: "Tax code closure procedure",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "",
      },
    ],
  },
  {
    id: 6,
    name: "Phase 6: Final Handover",
    tasks: [
      {
        id: 11,
        name: "Final result handover",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
        internalNotes: "",
      },
    ],
  },
]

export function StaffDissolutionView() {
  const [selectedTaskId, setSelectedTaskId] = useState(5)
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2, 3])
  const [internalNotes, setInternalNotes] = useState("")

  const allTasks = phases.flatMap((p) => p.tasks)
  const selectedTask = allTasks.find((t) => t.id === selectedTaskId)

  const completedCount = allTasks.filter((t) => t.status === "completed").length
  const progressPercent = Math.round((completedCount / allTasks.length) * 100)
  const waitingForClientCount = allTasks.filter((t) => t.status === "waiting-client").length

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) => (prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "waiting-client":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "blocked":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      completed: "Completed",
      "in-progress": "In Progress",
      "waiting-client": "Awaiting Client",
      blocked: "Blocked",
      "not-started": "Not Started",
    }
    return labels[status] || status
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Company Dissolution" role="staff" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Company Dissolution</h1>
                <p className="mt-1 text-muted-foreground">Case: TechCorp Vietnam Co., Ltd. | Staff Management</p>
              </div>
            </div>

            {/* Overall Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Case Progress & Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      {completedCount} of {allTasks.length} tasks completed
                    </span>
                    <span className="text-sm font-medium">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Awaiting Client</p>
                    <p className="font-semibold">{waitingForClientCount} task(s)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">In Progress</p>
                    <p className="font-semibold">{allTasks.filter((t) => t.status === "in-progress").length} task(s)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-semibold">Today 2:30 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content - 3 Column Layout */}
            <div className="grid grid-cols-3 gap-6">
              {/* Left: Checklist Navigation */}
              <div className="space-y-4">
                {phases.map((phase) => (
                  <Card key={phase.id}>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 pb-3" onClick={() => togglePhase(phase.id)}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{phase.name}</CardTitle>
                        <span className="text-xs text-muted-foreground font-normal">
                          {phase.tasks.filter((t) => t.status === "completed").length}/{phase.tasks.length}
                        </span>
                      </div>
                    </CardHeader>
                    {expandedPhases.includes(phase.id) && (
                      <CardContent className="space-y-2">
                        {phase.tasks.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => setSelectedTaskId(task.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedTaskId === task.id
                                ? "border-primary bg-primary/5"
                                : "border-transparent hover:bg-muted/30"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {task.status === "completed" ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                ) : task.status === "waiting-client" ? (
                                  <AlertCircle className="w-4 h-4 text-orange-600" />
                                ) : task.status === "in-progress" ? (
                                  <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium leading-tight truncate">{task.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs h-5 py-0">
                                    {task.owner}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {/* Center: Task Details & Actions */}
              {selectedTask && (
                <div>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{selectedTask.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{selectedTask.notes}</p>
                        </div>
                        <Badge className={`${getStatusColor(selectedTask.status)} text-xs`}>
                          {getStatusLabel(selectedTask.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Task Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">Owner</p>
                          <p className="mt-1">{selectedTask.owner}</p>
                        </div>
                        {selectedTask.dueDate && (
                          <div>
                            <p className="font-medium text-muted-foreground">Due Date</p>
                            <p className="mt-1">{selectedTask.dueDate}</p>
                          </div>
                        )}
                      </div>

                      {/* Staff Actions */}
                      <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Shield className="w-4 h-4" />
                          <span>Staff Actions</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            <CheckSquare className="mr-2 w-4 h-4" />
                            Mark Complete
                          </Button>
                          <Button size="sm" variant="outline">
                            <Flag className="mr-2 w-4 h-4" />
                            Set Blocked
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="mr-2 w-4 h-4" />
                            Request Documents
                          </Button>
                        </div>
                      </div>

                      {/* Internal Notes */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">Internal Notes</h4>
                        <div className="text-sm text-muted-foreground mb-2 p-3 bg-muted/30 rounded">
                          {selectedTask.internalNotes}
                        </div>
                        <Textarea
                          placeholder="Add staff notes here..."
                          className="text-sm"
                          value={internalNotes}
                          onChange={(e) => setInternalNotes(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Right: Internal Tools */}
              <div className="space-y-4">
                {/* Next Action */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Next Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Follow up on client signature for dissolution documents. Due: Jan 20, 2026
                    </p>
                    <Button size="sm" className="w-full mt-3">
                      Send Reminder
                    </Button>
                  </CardContent>
                </Card>

                {/* Internal Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Not visible to client - for staff coordination only
                    </p>
                    <Textarea placeholder="Add case notes..." className="text-sm" rows={4} />
                  </CardContent>
                </Card>

                {/* Case Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Case Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Simplified Checklist</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Customs Clearance Required</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Social Insurance Confirmation</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
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
