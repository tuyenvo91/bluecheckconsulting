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
import { Edit2, Save, X, Lock } from "lucide-react"

interface AccountingSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function AccountingSettingsSection({ role }: AccountingSettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    accountingStartDate: "2024-01-01",
    bookkeepingBasis: "Accrual",
    accountingMethod: "Standard",
    currency: "VND",
    accountingTool: "MISA",
    coaVersion: "2024",
    closePeriodRule: "Monthly",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isReadOnly = role === "client"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Accounting Profile</CardTitle>
            <CardDescription>Accounting standards and configuration</CardDescription>
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
          <div className="grid gap-2">
            <Label htmlFor="accountingStartDate">Accounting Start Date</Label>
            <Input
              id="accountingStartDate"
              type="date"
              value={formData.accountingStartDate}
              onChange={(e) => handleChange("accountingStartDate", e.target.value)}
              disabled={!isEditing || isReadOnly}
              className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bookkeepingBasis">Bookkeeping Basis</Label>
            <Select
              value={formData.bookkeepingBasis}
              onValueChange={(value) => handleChange("bookkeepingBasis", value)}
              disabled={!isEditing || isReadOnly}
            >
              <SelectTrigger
                id="bookkeepingBasis"
                disabled={!isEditing || isReadOnly}
                className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash Basis</SelectItem>
                <SelectItem value="Accrual">Accrual Basis</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {role === "client" && "Staff can configure this setting"}
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountingMethod">Accounting Method</Label>
            <Select
              value={formData.accountingMethod}
              onValueChange={(value) => handleChange("accountingMethod", value)}
              disabled={!isEditing || isReadOnly}
            >
              <SelectTrigger
                id="accountingMethod"
                disabled={!isEditing || isReadOnly}
                className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard Method</SelectItem>
                <SelectItem value="Simplified">Simplified Method</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Input
              id="currency"
              value={formData.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              disabled={true}
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Cannot be changed after initial setup</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountingTool">Accounting Tool</Label>
            <Select
              value={formData.accountingTool}
              onValueChange={(value) => handleChange("accountingTool", value)}
              disabled={!isEditing || isReadOnly}
            >
              <SelectTrigger
                id="accountingTool"
                disabled={!isEditing || isReadOnly}
                className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MISA">MISA</SelectItem>
                <SelectItem value="FAST">FAST</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="coaVersion">Chart of Accounts Version</Label>
            <Input
              id="coaVersion"
              value={formData.coaVersion}
              onChange={(e) => handleChange("coaVersion", e.target.value)}
              disabled={!isEditing || isReadOnly}
              className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="closePeriodRule">Period Close Rule</Label>
            <Select
              value={formData.closePeriodRule}
              onValueChange={(value) => handleChange("closePeriodRule", value)}
              disabled={!isEditing || isReadOnly}
            >
              <SelectTrigger
                id="closePeriodRule"
                disabled={!isEditing || isReadOnly}
                className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isReadOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex gap-2">
                <Lock className="size-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">View-Only Mode</p>
                  <p className="text-xs text-blue-800">Contact your staff member to make changes to accounting settings</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by Accountant User</p>
      </div>
    </div>
  )
}
