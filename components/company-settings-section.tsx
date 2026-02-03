"use client"

import { useState, useCallback } from "react"
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
import { Edit2, Save, X, Lock, AlertCircle, Check } from "lucide-react"
import { useFormValidation } from "@/hooks/use-form-validation"
import { useFormSubmission } from "@/hooks/use-form-submission"

interface CompanySettingsSectionProps {
  role: "client" | "staff" | "admin"
}

const validationSchema = {
  legalNameVi: {
    required: true,
    minLength: 5,
    maxLength: 255,
    message: "Vietnamese legal name is required and must be between 5-255 characters",
  },
  contactEmail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  contactPhone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]+$/,
    message: "Please enter a valid phone number",
  },
  primaryContact: {
    required: true,
    minLength: 2,
    message: "Contact name is required",
  },
}

export function CompanySettingsSection({ role }: CompanySettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    clientCode: "C-2024-0521",
    legalNameVi: "Công ty TNHH Một Thành Viên Đổi Mới Công Nghệ Việt Nam",
    legalNameEn: "Tech Innovations Vietnam Co., Ltd.",
    shortName: "Tech Innovations",
    companyType: "TNHH1TV",
    status: "active",
    primaryContact: "Nguyễn Văn A",
    contactEmail: "contact@techinnovations.vn",
    contactPhone: "+84 28 1234 5678",
    preferredChannel: "Portal",
  })

  const { errors, validate, clearErrors, clearFieldError } = useFormValidation()
  const { isSubmitting, saveSuccess, error, handleSubmit } = useFormSubmission({
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Company settings saved:", data)
    },
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      clearFieldError(field)
    }
  }

  const handleSave = useCallback(async () => {
    if (validate(formData, validationSchema)) {
      await handleSubmit(formData)
      setIsEditing(false)
    }
  }, [formData, validate, handleSubmit])

  const isReadOnly = role === "client" || role === "staff"

  const statusOptions = role === "admin" ? ["Prospect", "Active", "Paused", "Closed"] : []

  return (
    <div className="space-y-4">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2 animate-in">
          <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-900">Settings saved successfully</p>
            <p className="text-xs text-green-800">All changes have been saved and logged.</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-900">Error saving settings</p>
            <p className="text-xs text-red-800">{error.message}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Company Identity</CardTitle>
            <CardDescription>Basic company information</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(true)
                    clearErrors()
                  }}
                  className="gap-2 bg-transparent"
                >
                  <Edit2 className="size-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="size-4 border-2 border-background border-r-primary rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false)
                      clearErrors()
                    }}
                    disabled={isSubmitting}
                    className="gap-2 bg-transparent"
                  >
                    <X className="size-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client Code - Read Only */}
          <div className="grid gap-2">
            <Label htmlFor="clientCode" className="flex items-center gap-2">
              Client Code
              <span className="text-destructive">*</span>
              <Lock className="size-3 text-muted-foreground" />
            </Label>
            <Input
              id="clientCode"
              value={formData.clientCode}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Automatically assigned and cannot be changed</p>
          </div>

          {/* Legal Name VI */}
          <div className="grid gap-2">
            <Label htmlFor="legalNameVi" className="flex items-center gap-2">
              Legal Name (Vietnamese)
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="legalNameVi"
              value={formData.legalNameVi}
              onChange={(e) => handleChange("legalNameVi", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : errors.legalNameVi ? "border-red-500" : ""}
            />
            {errors.legalNameVi && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.legalNameVi}
              </p>
            )}
            <p className="text-xs text-muted-foreground">Required for business registration</p>
          </div>

          {/* Legal Name EN */}
          <div className="grid gap-2">
            <Label htmlFor="legalNameEn">Legal Name (English)</Label>
            <Input
              id="legalNameEn"
              value={formData.legalNameEn}
              onChange={(e) => handleChange("legalNameEn", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
            <p className="text-xs text-muted-foreground">Optional for international operations</p>
          </div>

          {/* Short Name */}
          <div className="grid gap-2">
            <Label htmlFor="shortName">Short Name</Label>
            <Input
              id="shortName"
              value={formData.shortName}
              onChange={(e) => handleChange("shortName", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          {/* Company Type */}
          <div className="grid gap-2">
            <Label htmlFor="companyType">Company Type</Label>
            <Select
              value={formData.companyType}
              onValueChange={(value) => handleChange("companyType", value)}
              disabled={!isEditing}
            >
              <SelectTrigger id="companyType" disabled={!isEditing} className={!isEditing ? "bg-muted" : ""}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DNTN">DNTN (Individual Enterprise)</SelectItem>
                <SelectItem value="TNHH1TV">TNHH1TV (Single-member LLC)</SelectItem>
                <SelectItem value="TNHH2TV">TNHH2TV (Multi-member LLC)</SelectItem>
                <SelectItem value="JSC">JSC (Joint Stock Company)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status - Admin Only */}
          {role === "admin" && (
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
                disabled={!isEditing}
              >
                <SelectTrigger id="status" disabled={!isEditing} className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Only Admin can change status</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contacts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Primary Contact</CardTitle>
            <CardDescription>Main point of contact for this company</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">


          <div className="grid gap-2">
            <Label htmlFor="primaryContact" className="flex items-center gap-2">
              Contact Name
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="primaryContact"
              value={formData.primaryContact}
              onChange={(e) => handleChange("primaryContact", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : errors.primaryContact ? "border-red-500" : ""}
            />
            {errors.primaryContact && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.primaryContact}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contactEmail" className="flex items-center gap-2">
              Email
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.contactEmail}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contactPhone" className="flex items-center gap-2">
              Phone
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : errors.contactPhone ? "border-red-500" : ""}
            />
            {errors.contactPhone && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.contactPhone}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="preferredChannel">Preferred Communication Channel</Label>
            <Select
              value={formData.preferredChannel}
              onValueChange={(value) => handleChange("preferredChannel", value)}
              disabled={!isEditing}
            >
              <SelectTrigger id="preferredChannel" disabled={!isEditing} className={!isEditing ? "bg-muted" : ""}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Portal">Portal</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by Admin User</p>
      </div>
    </div>
  )
}
