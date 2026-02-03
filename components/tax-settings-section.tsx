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
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Edit2, Save, X } from "lucide-react"

interface TaxSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function TaxSettingsSection({ role }: TaxSettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    taxAuthority: "Tax Department - Ho Chi Minh City",
    fiscalYearStartMonth: "1",
    vatMethod: "Credit",
    vatFrequency: "Monthly",
    pitFrequency: "Monthly",
    citFrequency: "Quarterly",
    enabledTaxTypes: ["VAT", "PIT", "CIT"],
    contractorTaxEnabled: false,
  })

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTaxTypeToggle = (taxType: string) => {
    const current = formData.enabledTaxTypes
    const updated = current.includes(taxType)
      ? current.filter((t) => t !== taxType)
      : [...current, taxType]
    handleChange("enabledTaxTypes", updated)
  }

  const isReadOnly = role === "client"

  return (
    <div className="space-y-4">
      {/* Fiscal Year Warning */}
      {formData.fiscalYearStartMonth !== "1" && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="size-4 text-amber-700 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Non-Standard Fiscal Year</p>
            <p className="text-xs text-amber-800">
              Reports and filings will be grouped by fiscal year (Month {formData.fiscalYearStartMonth} - Month {formData.fiscalYearStartMonth === "1" ? "12" : String(Number(formData.fiscalYearStartMonth) - 1)})
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Tax Profile</CardTitle>
            <CardDescription>Tax configuration and filing preferences</CardDescription>
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
            <Label htmlFor="taxAuthority">Tax Authority</Label>
            <Input
              id="taxAuthority"
              value={formData.taxAuthority}
              onChange={(e) => handleChange("taxAuthority", e.target.value)}
              disabled={!isEditing || isReadOnly}
              className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fiscalYearStart">Fiscal Year Start Month</Label>
            <Select
              value={formData.fiscalYearStartMonth}
              onValueChange={(value) => handleChange("fiscalYearStartMonth", value)}
              disabled={!isEditing || isReadOnly}
            >
              <SelectTrigger
                id="fiscalYearStart"
                disabled={!isEditing || isReadOnly}
                className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={String(month)}>
                    Month {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Tax Methods & Frequencies</h4>

            <div className="grid gap-2">
              <Label htmlFor="vatMethod">VAT Method</Label>
              <Select
                value={formData.vatMethod}
                onValueChange={(value) => handleChange("vatMethod", value)}
                disabled={!isEditing || isReadOnly}
              >
                <SelectTrigger
                  id="vatMethod"
                  disabled={!isEditing || isReadOnly}
                  className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit">Credit Method (Input VAT Credit)</SelectItem>
                  <SelectItem value="Direct">Direct Method</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="vatFrequency">VAT Filing Frequency</Label>
              <Select
                value={formData.vatFrequency}
                onValueChange={(value) => handleChange("vatFrequency", value)}
                disabled={!isEditing || isReadOnly}
              >
                <SelectTrigger
                  id="vatFrequency"
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

            <div className="grid gap-2 mt-4">
              <Label htmlFor="pitFrequency">PIT Filing Frequency</Label>
              <Select
                value={formData.pitFrequency}
                onValueChange={(value) => handleChange("pitFrequency", value)}
                disabled={!isEditing || isReadOnly}
              >
                <SelectTrigger
                  id="pitFrequency"
                  disabled={!isEditing || isReadOnly}
                  className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="None">None / Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="citFrequency">CIT Filing Frequency</Label>
              <Select
                value={formData.citFrequency}
                onValueChange={(value) => handleChange("citFrequency", value)}
                disabled={!isEditing || isReadOnly}
              >
                <SelectTrigger
                  id="citFrequency"
                  disabled={!isEditing || isReadOnly}
                  className={(!isEditing || isReadOnly) ? "bg-muted" : ""}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="None">None / Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Enabled Tax Types</h4>
            <div className="space-y-2">
              {["VAT", "PIT", "CIT", "CONTRACTOR_TAX", "EXCISE", "RESOURCE", "ENVIRONMENT"].map((taxType) => (
                <label key={taxType} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.enabledTaxTypes.includes(taxType)}
                    onCheckedChange={() => handleTaxTypeToggle(taxType)}
                    disabled={!isEditing || isReadOnly}
                  />
                  <span className="text-sm">
                    {taxType === "CONTRACTOR_TAX"
                      ? "Contractor Tax (3%)"
                      : taxType === "EXCISE"
                      ? "Excise Tax"
                      : taxType === "RESOURCE"
                      ? "Natural Resource Tax"
                      : taxType === "ENVIRONMENT"
                      ? "Environmental Protection Tax"
                      : taxType}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {formData.enabledTaxTypes.includes("CONTRACTOR_TAX") && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-blue-900 font-medium">
                Contractor Tax is enabled. Ensure supplier invoices are properly documented.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by Tax Specialist</p>
      </div>
    </div>
  )
}
