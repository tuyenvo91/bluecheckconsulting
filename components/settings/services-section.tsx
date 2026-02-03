"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"

interface Service {
  id: string
  name: string
  status: "Active" | "Paused" | "Not Started" | "Completed"
  start_date: string
  assigned_staff: string
  sla_level: string
}

interface ServicesectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function ServicesSection({ role, onHasUnsavedChanges }: ServicesectionProps) {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Company Incorporation",
      status: "Completed",
      start_date: "2024-03-01",
      assigned_staff: "Nguyễn Trung Kiên",
      sla_level: "Standard",
    },
    {
      id: "2",
      name: "Accounting Service",
      status: "Active",
      start_date: "2024-04-01",
      assigned_staff: "Phạm Thị Hương",
      sla_level: "Premium",
    },
    {
      id: "3",
      name: "Tax Service",
      status: "Active",
      start_date: "2024-04-01",
      assigned_staff: "Võ Văn Sơn",
      sla_level: "Standard",
    },
    {
      id: "4",
      name: "Payroll & Social Insurance",
      status: "Not Started",
      start_date: "-",
      assigned_staff: "-",
      sla_level: "-",
    },
  ])

  const canEdit = role === "admin"

  const getStatusColor = (status: string) => {
    if (status === "Active") return "default"
    if (status === "Completed") return "secondary"
    if (status === "Paused") return "outline"
    return "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{service.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={getStatusColor(service.status)}>{service.status}</Badge>
                    {service.sla_level !== "-" && <Badge variant="outline">{service.sla_level}</Badge>}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{service.start_date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned Staff</p>
                  <p className="font-medium">{service.assigned_staff}</p>
                </div>
                <div className="text-right">
                  {canEdit && (
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
