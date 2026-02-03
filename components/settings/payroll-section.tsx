"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X } from "lucide-react"

interface PayrollSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function PayrollSection({ role, onHasUnsavedChanges }: PayrollSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    has_employees: true,
    payroll_cycle: "Monthly",
    salary_pay_day: 25,
    payroll_tool: "Third-party",
    pit_withholding: true,
    si_status: "Registered",
    si_agency: "Social Insurance Office - Ho Chi Minh City",
    si_registration_date: "2023-03-15",
  })

  const canEdit = role === "staff" || role === "admin"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Payroll & Social Insurance</CardTitle>
            <CardDescription>Employee payroll and SI configuration</CardDescription>
          </div>
          {canEdit && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2 bg-transparent">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" className="gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-2 bg-transparent">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Payroll Configuration</h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Has Employees</Label>
                  <p className="text-xs text-muted-foreground">Does your company have employees?</p>
                </div>
                <Checkbox
                  checked={formData.has_employees}
                  onCheckedChange={(checked) => setFormData({ ...formData, has_employees: checked as boolean })}
                  disabled={!isEditing}
                />
              </div>

              {formData.has_employees && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-sm font-medium">Payroll Cycle</Label>
                      <Select value={formData.payroll_cycle} onValueChange={(value) => setFormData({ ...formData, payroll_cycle: value })} disabled={!isEditing}>
                        <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-sm font-medium">Salary Pay Day</Label>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        value={formData.salary_pay_day}
                        onChange={(e) => setFormData({ ...formData, salary_pay_day: Number(e.target.value) })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                      <p className="text-xs text-muted-foreground">Day of month (1-31)</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">Payroll Tool</Label>
                    <Select value={formData.payroll_tool} onValueChange={(value) => setFormData({ ...formData, payroll_tool: value })} disabled={!isEditing}>
                      <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Third-party">Third-party Service</SelectItem>
                        <SelectItem value="Internal">Internal HR Module</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">PIT Withholding</Label>
                      <p className="text-xs text-muted-foreground">Withhold personal income tax from salaries</p>
                    </div>
                    <Checkbox
                      checked={formData.pit_withholding}
                      onCheckedChange={(checked) => setFormData({ ...formData, pit_withholding: checked as boolean })}
                      disabled={!isEditing}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Social Insurance Status</h4>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">SI Status</Label>
                <div className="flex items-center gap-2">
                  <Select value={formData.si_status} onValueChange={(value) => setFormData({ ...formData, si_status: value })} disabled={!isEditing}>
                    <SelectTrigger className={!isEditing ? "bg-muted" : "w-full"}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Registered">Not Registered</SelectItem>
                      <SelectItem value="Registered">Registered</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant={formData.si_status === "Registered" ? "default" : "secondary"}>
                    {formData.si_status}
                  </Badge>
                </div>
              </div>

              {formData.si_status === "Registered" && (
                <>
                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">SI Agency</Label>
                    <Input
                      value={formData.si_agency}
                      onChange={(e) => setFormData({ ...formData, si_agency: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">SI Registration Date</Label>
                    <Input
                      type="date"
                      value={formData.si_registration_date}
                      onChange={(e) => setFormData({ ...formData, si_registration_date: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
