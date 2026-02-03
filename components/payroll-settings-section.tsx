"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Save, X, Lock } from "lucide-react"

interface PayrollSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function PayrollSettingsSection({ role }: PayrollSettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    hasEmployees: true,
    payrollCycle: "Monthly",
    salaryPayDay: "25",
    payrollTool: "Third-party",
    pitWithholding: true,
    siStatus: "Registered",
    siAgency: "Social Insurance Agency - Ho Chi Minh City",
    siRegistrationDate: "2024-03-01",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isReadOnly = role === "client"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Payroll & Social Insurance Profile</CardTitle>
            <CardDescription>Employee payroll and SI configuration</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-transparent"
                >
                  <Edit2 className="size-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={() => setIsEditing(false)} className="gap-2">
                    <Save className="size-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-2 bg-transparent">
                    <X className="size-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Checkbox
              checked={formData.hasEmployees}
              onCheckedChange={(checked) => handleChange("hasEmployees", checked)}
              disabled={!isEditing || isReadOnly}
              id="hasEmployees"
            />
            <Label htmlFor="hasEmployees" className="cursor-pointer flex-1 mb-0">
              This company has employees
            </Label>
          </div>

          {formData.hasEmployees && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="payrollCycle">Payroll Cycle</Label>
                <Select
                  value={formData.payrollCycle}
                  onValueChange={(value) => handleChange("payrollCycle", value)}
                  disabled={!isEditing || isReadOnly}
                >
                  <SelectTrigger
                    id="payrollCycle"
                    disabled={!isEditing || isReadOnly}
                    className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                  >
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
                <Label htmlFor="salaryPayDay">Salary Pay Day (Day of Month)</Label>
                <Input
                  id="salaryPayDay"
                  type="number"
                  min="1"
                  max="31"
                  value={formData.salaryPayDay}
                  onChange={(e) => handleChange("salaryPayDay", e.target.value)}
                  disabled={!isEditing || isReadOnly}
                  className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payrollTool">Payroll Management Tool</Label>
                <Select
                  value={formData.payrollTool}
                  onValueChange={(value) => handleChange("payrollTool", value)}
                  disabled={!isEditing || isReadOnly}
                >
                  <SelectTrigger
                    id="payrollTool"
                    disabled={!isEditing || isReadOnly}
                    className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Third-party">Third-party HR Software</SelectItem>
                    <SelectItem value="Internal">Internal HR Module</SelectItem>
                    <SelectItem value="Manual">Manual Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Checkbox
                  checked={formData.pitWithholding}
                  onCheckedChange={(checked) => handleChange("pitWithholding", checked)}
                  disabled={!isEditing || isReadOnly}
                  id="pitWithholding"
                />
                <Label htmlFor="pitWithholding" className="cursor-pointer flex-1 mb-0">
                  Withhold PIT from employee salaries
                </Label>
              </div>
            </>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Social Insurance Status</h4>

            <div className="grid gap-2">
              <Label htmlFor="siStatus">SI Registration Status</Label>
              <Select
                value={formData.siStatus}
                onValueChange={(value) => handleChange("siStatus", value)}
                disabled={!isEditing || isReadOnly}
              >
                <SelectTrigger
                  id="siStatus"
                  disabled={!isEditing || isReadOnly}
                  className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Registered">Not Registered</SelectItem>
                  <SelectItem value="Registered">Registered</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.siStatus === "Registered" && (
              <>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="siAgency">Social Insurance Agency</Label>
                  <Input
                    id="siAgency"
                    value={formData.siAgency}
                    onChange={(e) => handleChange("siAgency", e.target.value)}
                    disabled={!isEditing || isReadOnly}
                    className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                  />
                </div>

                <div className="grid gap-2 mt-4">
                  <Label htmlFor="siRegDate">SI Registration Date</Label>
                  <Input
                    id="siRegDate"
                    type="date"
                    value={formData.siRegistrationDate}
                    onChange={(e) => handleChange("siRegistrationDate", e.target.value)}
                    disabled={!isEditing || isReadOnly}
                    className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                  />
                </div>
              </>
            )}
          </div>

          {isReadOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex gap-2">
                <Lock className="size-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">View-Only Mode</p>
                  <p className="text-xs text-blue-800">Contact HR specialist to modify payroll settings</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by HR Manager</p>
      </div>
    </div>
  )
}
