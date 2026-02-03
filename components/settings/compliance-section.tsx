"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Save, X, Info, Download } from "lucide-react"

interface ComplianceSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function ComplianceSection({ role, onHasUnsavedChanges }: ComplianceSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    retention_years_default: 10,
    consent_e_signature: true,
    audit_log_enabled: true,
  })

  const canEdit = role === "admin"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Data Retention & Compliance</CardTitle>
            <CardDescription>Document retention policies and compliance settings</CardDescription>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Legal Retention Requirements</p>
              <p className="text-xs text-blue-800">
                Accounting and tax records must be retained for the legally required period (minimum 5 years in Vietnam).
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Default Retention Period (Years)</Label>
            <Input
              type="number"
              min="5"
              max="30"
              value={formData.retention_years_default}
              onChange={(e) => setFormData({ ...formData, retention_years_default: Number(e.target.value) })}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 5 years required by law. Accounting & tax records retained for {formData.retention_years_default} years.
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Compliance Options</h4>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.consent_e_signature}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent_e_signature: checked as boolean })}
                  disabled={!isEditing}
                />
                <span className="text-sm font-medium">E-Signature Consent</span>
              </label>
              <p className="text-xs text-muted-foreground ml-6">
                Client consents to receive and sign documents electronically.
              </p>

              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <Checkbox
                  checked={formData.audit_log_enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, audit_log_enabled: checked as boolean })}
                  disabled={!isEditing}
                />
                <span className="text-sm font-medium">Audit Log Enabled</span>
              </label>
              <p className="text-xs text-muted-foreground ml-6">
                All data changes are logged and tracked for compliance audits.
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Archive Policy</h4>

            <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Automatic Archive</p>
                  <p className="text-xs text-muted-foreground">Documents archived after {formData.retention_years_default} years</p>
                </div>
                <span className="text-sm font-medium">Enabled</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>

      {canEdit && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Admin Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Settings (JSON)
            </Button>
            <p className="text-xs text-muted-foreground">
              Export all company settings for backup or import into another company.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
