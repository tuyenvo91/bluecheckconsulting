"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Save, X, AlertTriangle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface TaxSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function TaxSection({ role, onHasUnsavedChanges }: TaxSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    tax_authority: "Tax Department Ho Chi Minh City",
    fiscal_year_start_month: "1",
    vat_method: "Credit",
    vat_frequency: "Monthly",
    pit_frequency: "Monthly",
    cit_frequency: "Quarterly",
    enabled_tax_types: ["VAT", "PIT", "CIT"],
    contractor_tax_enabled: false,
    contractor_tax_notes: "",
  })

  const canEdit = role === "staff" || role === "admin"

  const handleTaxTypeChange = (taxType: string) => {
    setFormData((prev) => {
      const types = prev.enabled_tax_types
      if (types.includes(taxType)) {
        return { ...prev, enabled_tax_types: types.filter((t) => t !== taxType) }
      }
      return { ...prev, enabled_tax_types: [...types, taxType] }
    })
  }

  const nonJanuaryFiscalYear = formData.fiscal_year_start_month !== "1"

  const taxTypes = ["VAT", "PIT", "CIT", "CONTRACTOR_TAX", "EXCISE", "RESOURCE", "ENVIRONMENT"]

  return (
    <div className="space-y-6">
      {nonJanuaryFiscalYear && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-900">Fiscal Year Offset Detected</p>
            <p className="text-xs text-orange-800">
              Reports and filings will be grouped by fiscal year starting in {monthName(parseInt(formData.fiscal_year_start_month))}.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Tax Profile</CardTitle>
            <CardDescription>Tax authority registration and filing frequencies</CardDescription>
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
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Tax Authority (Optional)</Label>
            <Input
              value={formData.tax_authority}
              onChange={(e) => setFormData({ ...formData, tax_authority: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Fiscal Year Start Month</Label>
            <Select value={formData.fiscal_year_start_month} onValueChange={(value) => setFormData({ ...formData, fiscal_year_start_month: value })} disabled={!isEditing}>
              <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {monthName(i + 1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Tax Filing Frequencies</h4>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">VAT Filing Frequency</Label>
                <Select value={formData.vat_frequency} onValueChange={(value) => setFormData({ ...formData, vat_frequency: value })} disabled={!isEditing}>
                  <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">PIT Filing Frequency</Label>
                <Select value={formData.pit_frequency} onValueChange={(value) => setFormData({ ...formData, pit_frequency: value })} disabled={!isEditing}>
                  <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">CIT Filing Frequency</Label>
                <Select value={formData.cit_frequency} onValueChange={(value) => setFormData({ ...formData, cit_frequency: value })} disabled={!isEditing}>
                  <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Enabled Tax Types</h4>
            <div className="grid grid-cols-2 gap-3">
              {taxTypes.map((taxType) => (
                <label key={taxType} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.enabled_tax_types.includes(taxType)}
                    onCheckedChange={() => handleTaxTypeChange(taxType)}
                    disabled={!isEditing}
                  />
                  <span className="text-sm">{taxTypeLabel(taxType)}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.enabled_tax_types.includes("CONTRACTOR_TAX") && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Contractor Tax Settings</h4>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Notes</Label>
                <Textarea
                  value={formData.contractor_tax_notes}
                  onChange={(e) => setFormData({ ...formData, contractor_tax_notes: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="e.g., default withholding rate, special conditions"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function monthName(month: number) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return months[month - 1]
}

function taxTypeLabel(taxType: string) {
  const labels: Record<string, string> = {
    VAT: "Value Added Tax (VAT)",
    PIT: "Personal Income Tax (PIT)",
    CIT: "Corporate Income Tax (CIT)",
    CONTRACTOR_TAX: "Contractor Tax",
    EXCISE: "Excise Tax",
    RESOURCE: "Resource Tax",
    ENVIRONMENT: "Environmental Tax",
  }
  return labels[taxType]
}
