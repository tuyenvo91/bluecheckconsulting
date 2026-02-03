"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Lock } from "lucide-react"

interface Service {
  id: number
  name: string
  status: "Not Started" | "Active" | "Paused" | "Completed"
  startDate: string
  assignedStaff: string
  slaLevel: string
}

interface ServicesSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function ServicesSettingsSection({ role }: ServicesSettingsSectionProps) {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Company Incorporation",
      status: "Completed",
      startDate: "2024-05-15",
      assignedStaff: "Nguyễn Văn D",
      slaLevel: "Standard",
    },
    {
      id: 2,
      name: "Accounting Service",
      status: "Active",
      startDate: "2024-06-01",
      assignedStaff: "Trần Thị E",
      slaLevel: "Premium",
    },
    {
      id: 3,
      name: "Tax Service",
      status: "Active",
      startDate: "2024-06-01",
      assignedStaff: "Lê Văn F",
      slaLevel: "Standard",
    },
    {
      id: 4,
      name: "Payroll & Social Insurance",
      status: "Not Started",
      startDate: "-",
      assignedStaff: "-",
      slaLevel: "-",
    },
  ])

  const [showNotes, setShowNotes] = useState<{ [key: number]: boolean }>({})
  const [notes, setNotes] = useState<{ [key: number]: string }>({})

  const isReadOnly = role === "client"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success"
      case "Active":
        return "default"
      case "Paused":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, status: newStatus as any } : s)))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Service Configuration</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Manage active services, SLA levels, and assigned staff
        </p>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Service Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Started {service.startDate !== "-" ? `on ${service.startDate}` : "- Not yet started"}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(service.status) as any}>{service.status}</Badge>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 -mx-6 px-6 py-4">
                  <div>
                    <p className="text-muted-foreground">Assigned Staff</p>
                    <p className="font-medium">{service.assignedStaff}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">SLA Level</p>
                    <p className="font-medium">{service.slaLevel}</p>
                  </div>
                </div>

                {/* Status Control - Admin Only */}
                {(role === "admin" || role === "staff") && (
                  <div className="space-y-3 border-t pt-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Service Status</label>
                      <Select value={service.status} onValueChange={(val) => handleUpdateStatus(service.id, val)}>
                        <SelectTrigger disabled={isReadOnly}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not Started">Not Started</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Paused">Paused</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Internal Notes */}
                    {(role === "admin" || role === "staff") && (
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-muted-foreground"
                          onClick={() =>
                            setShowNotes((prev) => ({ ...prev, [service.id]: !prev[service.id] }))
                          }
                        >
                          <MessageSquare className="size-4" />
                          {showNotes[service.id] ? "Hide" : "Add"} Internal Notes
                        </Button>
                        {showNotes[service.id] && (
                          <textarea
                            className="w-full mt-2 px-3 py-2 border rounded-md text-sm"
                            placeholder="Internal notes (not visible to client)..."
                            value={notes[service.id] || ""}
                            onChange={(e) =>
                              setNotes((prev) => ({ ...prev, [service.id]: e.target.value }))
                            }
                            rows={3}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {isReadOnly && service.status !== "Not Started" && (
                  <div className="border-t pt-4">
                    <Button variant="outline" size="sm" className="gap-2 w-full bg-transparent">
                      <MessageSquare className="size-4" />
                      Message Assigned Staff
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Info Button - Staff Only */}
      {(role === "admin" || role === "staff") && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900">Missing Information?</p>
                <p className="text-sm text-blue-800">Request additional documents or details from the client</p>
              </div>
              <Button size="sm">Request Info from Client</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isReadOnly && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex gap-2">
            <Lock className="size-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">View-Only Mode</p>
              <p className="text-xs text-blue-800">Service management is handled by your assigned staff</p>
            </div>
          </div>
        </div>
      )}

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by Service Manager</p>
      </div>
    </div>
  )
}
