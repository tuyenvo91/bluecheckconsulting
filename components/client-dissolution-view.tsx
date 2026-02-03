"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import {
  CheckCircle2,
  Circle,
  FileText,
  AlertCircle,
  Clock,
  Download,
  Upload,
  MessageSquare,
  Paperclip,
  AlertTriangle,
} from "lucide-react"

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
        notes: "Your company is eligible for standard dissolution process.",
      },
      {
        id: 2,
        name: "Collect company basic info & dissolution intent confirmation",
        owner: "Client",
        status: "completed" as const,
        evidence: [{ name: "Company Info Form", status: "uploaded" as const }],
        notes: "We have received all required information.",
      },
      {
        id: 3,
        name: "Create debt inventory (tax, social insurance, creditors)",
        owner: "Staff",
        status: "in-progress" as const,
        evidence: [] as any[],
        notes: "We are reviewing your financial records.",
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
        notes: "Documents are being prepared based on your information.",
      },
      {
        id: 5,
        name: "Client review & sign dissolution documents",
        owner: "Client",
        status: "waiting-client" as const,
        evidence: [],
        notes: "Action required: Please review and sign the attached documents.",
        dueDate: "Jan 20, 2026",
      },
      {
        id: 6,
        name: "Prepare creditor/debt list & employee list",
        owner: "Client + Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
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
      },
      {
        id: 8,
        name: "Tax obligations review and plan",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 9,
        name: "Social insurance obligations review and plan",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 10,
        name: "Optional: Customs clearance confirmation",
        owner: "Client",
        status: "not-started" as const,
        evidence: [],
        notes: "Only required if your company has import/export activities.",
      },
    ],
  },
  {
    id: 4,
    name: "Phase 4: Government Submission & Public Notice",
    tasks: [
      {
        id: 11,
        name: "Submit dissolution dossier to Department of Planning and Investment",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 12,
        name: "Public dissolution announcement on National Portal",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
    ],
  },
  {
    id: 5,
    name: "Phase 5: Tax Code Closure & Finalization",
    tasks: [
      {
        id: 13,
        name: "Tax code closure procedure with tax authority",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 14,
        name: "Social insurance no-debt confirmation",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 15,
        name: "Seal cancellation / stamp disposal procedure",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
    ],
  },
  {
    id: 6,
    name: "Phase 6: Final Handover",
    tasks: [
      {
        id: 16,
        name: "Final result handover & archival document package",
        owner: "Staff",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
      {
        id: 17,
        name: "Client confirmation of completion",
        owner: "Client",
        status: "not-started" as const,
        evidence: [],
        notes: "",
      },
    ],
  },
]

const messages = [
  {
    author: "Your Specialist (Jane Nguyen)",
    message: "Hi! I've reviewed your dissolution eligibility. Everything looks good to proceed.",
    date: "Today 10:30 AM",
    role: "staff",
  },
  {
    author: "You",
    message: "Great! What are the next steps?",
    date: "Today 10:45 AM",
    role: "client",
  },
  {
    author: "Your Specialist (Jane Nguyen)",
    message: "I'll prepare the dissolution documents and send them to you for review by tomorrow.",
    date: "Today 11:00 AM",
    role: "staff",
  },
]

export function ClientDissolutionView() {
  const [selectedTaskId, setSelectedTaskId] = useState(5)
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2, 3, 4, 5, 6])

  const allTasks = phases.flatMap((p) => p.tasks)
  const selectedTask = allTasks.find((t) => t.id === selectedTaskId)

  const completedCount = allTasks.filter((t) => t.status === "completed").length
  const progressPercent = Math.round((completedCount / allTasks.length) * 100)
  const waitingForClientCount = allTasks.filter((t) => t.status === "waiting-client").length
  const blockedCount = allTasks.filter((t) => t.status === "blocked").length

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) => (prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "current":
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
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "current":
        return "Current"
      case "waiting-client":
        return "Waiting for You"
      case "blocked":
        return "Blocked"
      case "not-started":
        return "Not Started"
      default:
        return status
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Company Dissolution" role="client" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Company Dissolution</h1>
              <p className="mt-1 text-muted-foreground">Track your company dissolution progress transparently</p>
            </div>

            {/* Overall Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Overall Progress</CardTitle>
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
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-muted-foreground">{waitingForClientCount} awaiting your action</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-muted-foreground">Last updated Jan 10, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-muted-foreground">{blockedCount} task(s) blocked</span>
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
                                ) : task.status === "blocked" ? (
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                ) : task.status === "in-progress" ? (
                                  <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium leading-tight truncate">{task.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs h-5">
                                    {task.owner}
                                  </Badge>
                                  {task.evidence.length > 0 && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Paperclip className="w-3 h-3" />
                                      {task.evidence.length}
                                    </span>
                                  )}
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

              {/* Center: Task Details */}
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

                      {/* Evidence Requirements */}
                      {selectedTask.evidence.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-3">Required Evidence</h4>
                          <div className="space-y-2">
                            {selectedTask.evidence.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{item.name}</span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200 text-xs"
                                >
                                  {item.status === "verified" ? "Verified" : "Uploaded"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {selectedTask.status === "waiting-client" && (
                        <div className="space-y-2">
                          <Button className="w-full">
                            <Upload className="mr-2 w-4 h-4" />
                            Upload Documents
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <FileText className="mr-2 w-4 h-4" />
                            View Draft Documents
                          </Button>
                        </div>
                      )}

                      {selectedTask.status === "completed" && (
                        <Button variant="outline" className="w-full bg-transparent">
                          <Download className="mr-2 w-4 h-4" />
                          Download Evidence
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Right: Actions & Messages */}
              <div className="space-y-4">
                {/* Next Action Card */}
                {waitingForClientCount > 0 && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Action Required
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">
                        Please review and sign the dissolution documents. This is required to proceed to the next phase.
                      </p>
                      <p className="text-xs text-muted-foreground">Due: Jan 20, 2026</p>
                      <Button size="sm" className="w-full">
                        Review Now
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {messages.slice(0, 3).map((msg, i) => (
                      <div key={i} className="space-y-1 text-xs pb-3 border-b last:border-b-0">
                        <p className="font-medium">{msg.author}</p>
                        <p className="text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <MessageSquare className="mr-2 w-3 h-3" />
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>

                {/* Evidence Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Evidence Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        {allTasks.flatMap((t) => t.evidence).length} of {allTasks.length * 2} items provided
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Paperclip className="mr-2 w-3 h-3" />
                      View All Evidence
                    </Button>
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
