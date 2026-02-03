"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Save, X, AlertCircle, Check, Lock } from "lucide-react"

interface AccountingSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function AccountingSection({ role, onHasUnsavedChanges }: AccountingSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    accounting_start_date: "2024-01-01",
    bookkeeping_basis: "Accrual",
    accounting_method: "IFRS",
    currency: "VND",
    accounting_tool: "MISA",
    coa_version: "2024",
    period_close_rule: "Monthly",
  })

  const canEdit = role === "staff" || role === "admin"
  const isClientReadOnly = role === "client"

  const getFieldPermission = (field: string) => {
    if (role === "admin") return "editable"
    if (role === "staff") return "editable"
    return "readonly"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Accounting Profile</CardTitle>
            <CardDescription>Accounting system configuration and settings</CardDescription>
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
          {isClientReadOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
              <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">View Only</p>
                <p className="text-xs text-blue-800">Staff members manage these settings. Contact support to request changes.</p>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              Accounting Start Date
              {getFieldPermission("accounting_start_date") === "readonly" && (
                <Lock className="w-3 h-3 text-muted-foreground" title="Only Staff/Admin can change this setting." />
              )}
            </Label>
            <Input
              type="date"
              value={formData.accounting_start_date}
              onChange={(e) => setFormData({ ...formData, accounting_start_date: e.target.value })}
              disabled={!isEditing || !canEdit}
              className={!isEditing || !canEdit ? "bg-muted" : ""}
            />
            <p className="text-xs text-muted-foreground">The date your accounting records begin</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Bookkeeping Basis
                {getFieldPermission("bookkeeping_basis") === "readonly" && (
                  <Lock className="w-3 h-3 text-muted-foreground" title="Only Staff/Admin can change this setting." />
                )}
              </Label>
              <Select value={formData.bookkeeping_basis} onValueChange={(value) => setFormData({ ...formData, bookkeeping_basis: value })} disabled={!isEditing || !canEdit}>
                <SelectTrigger className={!isEditing || !canEdit ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash Basis</SelectItem>
                  <SelectItem value="Accrual">Accrual Basis</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Method for recording transactions</p>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-medium">Accounting Method</Label>
              <Select value={formData.accounting_method} onValueChange={(value) => setFormData({ ...formData, accounting_method: value })} disabled={!isEditing || !canEdit}>
                <SelectTrigger className={!isEditing || !canEdit ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IFRS">IFRS</SelectItem>
                  <SelectItem value="Vietnam-GAAP">Vietnam GAAP</SelectItem>
                  <SelectItem value="SME">SME Accounting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })} disabled={!isEditing || !canEdit}>
                <SelectTrigger className={!isEditing || !canEdit ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND (Vietnamese Dong)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Period Close Rule
                {getFieldPermission("period_close_rule") === "readonly" && (
                  <Lock className="w-3 h-3 text-muted-foreground" title="Only Staff/Admin can change this setting." />
                )}
              </Label>
              <Select value={formData.period_close_rule} onValueChange={(value) => setFormData({ ...formData, period_close_rule: value })} disabled={!isEditing || !canEdit}>
                <SelectTrigger className={!isEditing || !canEdit ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Accounting Tool</Label>
              <Select value={formData.accounting_tool} onValueChange={(value) => setFormData({ ...formData, accounting_tool: value })} disabled={!isEditing || !canEdit}>
                <SelectTrigger className={!isEditing || !canEdit ? "bg-muted" : ""}>
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
              <Label className="text-sm font-medium">Chart of Accounts Version</Label>
              <Input
                value={formData.coa_version}
                onChange={(e) => setFormData({ ...formData, coa_version: e.target.value })}
                disabled={!isEditing || !canEdit}
                className={!isEditing || !canEdit ? "bg-muted" : ""}
                placeholder="e.g., 2024"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-900">Staff Management</p>
            <p className="text-xs text-amber-800">Staff members are responsible for maintaining accurate accounting configurations.</p>
          </div>
        </div>
      )}
    </div>
  )
}
