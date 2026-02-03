"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X, AlertCircle, Check, Upload } from "lucide-react"
import { useFormValidation } from "@/hooks/use-form-validation"
import { useFormSubmission } from "@/hooks/use-form-submission"

interface CompanySectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

const validationSchema = {
  legal_name_vi: {
    required: true,
    minLength: 5,
    maxLength: 255,
    message: "Vietnamese legal name is required (5-255 characters)",
  },
  contact_email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  contact_phone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]{10,}$/,
    message: "Please enter a valid phone number",
  },
  primary_contact_name: {
    required: true,
    minLength: 2,
    message: "Contact name is required",
  },
}

export function CompanySection({ role, onHasUnsavedChanges }: CompanySectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [originalData, setOriginalData] = useState({
    client_code: "C-2024-0521",
    legal_name_vi: "Công ty TNHH Một Thành Viên Đổi Mới Công Nghệ Việt Nam",
    legal_name_en: "Tech Innovations Vietnam Co., Ltd.",
    short_name: "Tech Innovations",
    company_type: "TNHH1TV",
    status: "active",
    primary_contact_name: "Nguyễn Văn A",
    contact_email: "contact@techinnovations.vn",
    contact_phone: "+84 28 1234 5678",
    preferred_channel: "Portal",
  })

  const [formData, setFormData] = useState(originalData)
  const { errors, validate, clearErrors, clearFieldError } = useFormValidation()
  const { isSubmitting, saveSuccess, error, handleSubmit } = useFormSubmission({
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)

  // Notify parent of unsaved changes
  useCallback(() => {
    onHasUnsavedChanges?.(hasChanges && isEditing)
  }, [hasChanges, isEditing, onHasUnsavedChanges])()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      clearFieldError(field)
    }
  }

  const handleSave = useCallback(async () => {
    if (validate(formData, validationSchema)) {
      await handleSubmit(formData)
      setOriginalData(formData)
      setIsEditing(false)
    }
  }, [formData, validate, handleSubmit])

  const handleCancel = () => {
    setFormData(originalData)
    clearErrors()
    setIsEditing(false)
  }

  const isReadOnlyField = (field: string) => {
    if (role === "admin") return false
    if (field === "client_code") return true
    if (role === "client" && ["status"].includes(field)) return true
    return false
  }

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2 animate-in">
          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-900">Changes saved successfully</p>
            <p className="text-xs text-green-800">All changes have been logged.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-900">Error saving changes</p>
            <p className="text-xs text-red-800">{error.message}</p>
          </div>
        </div>
      )}

      {/* Company Identity Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Company Identity</CardTitle>
            <CardDescription>Basic company information and contacts</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => { setIsEditing(true); clearErrors() }} className="gap-2 bg-transparent">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={handleSave} disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-r-primary rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSubmitting} className="gap-2 bg-transparent">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Client Code */}
          <div className="grid gap-2">
            <Label htmlFor="client_code" className="text-sm font-medium">
              Client Code
            </Label>
            <Input
              id="client_code"
              value={formData.client_code}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">Read-only identifier</p>
          </div>

          {/* Legal Name VI */}
          <div className="grid gap-2">
            <Label htmlFor="legal_name_vi" className="text-sm font-medium flex items-center gap-1">
              Legal Name (Vietnamese) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="legal_name_vi"
              value={formData.legal_name_vi}
              onChange={(e) => handleChange("legal_name_vi", e.target.value)}
              disabled={!isEditing || isReadOnlyField("legal_name_vi")}
              className={!isEditing ? "bg-muted" : errors.legal_name_vi ? "border-red-500" : ""}
            />
            {errors.legal_name_vi && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.legal_name_vi}
              </p>
            )}
          </div>

          {/* Legal Name EN */}
          <div className="grid gap-2">
            <Label htmlFor="legal_name_en" className="text-sm font-medium">
              Legal Name (English)
            </Label>
            <Input
              id="legal_name_en"
              value={formData.legal_name_en}
              onChange={(e) => handleChange("legal_name_en", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          {/* Short Name & Company Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="short_name" className="text-sm font-medium">
                Short Name
              </Label>
              <Input
                id="short_name"
                value={formData.short_name}
                onChange={(e) => handleChange("short_name", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company_type" className="text-sm font-medium">
                Company Type
              </Label>
              <Select value={formData.company_type} onValueChange={(value) => handleChange("company_type", value)} disabled={!isEditing}>
                <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DNTN">Sole Proprietor (DNTN)</SelectItem>
                  <SelectItem value="TNHH1TV">Single-Member LLC (TNHH1TV)</SelectItem>
                  <SelectItem value="TNHH2TV">Multi-Member LLC (TNHH2TV)</SelectItem>
                  <SelectItem value="JSC">Joint Stock Company (JSC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status (Admin only) */}
          {role === "admin" && (
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} disabled={!isEditing}>
                <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Primary Contact</h4>
            <div className="space-y-4">
              {/* Contact Name */}
              <div className="grid gap-2">
                <Label htmlFor="primary_contact_name" className="text-sm font-medium flex items-center gap-1">
                  Contact Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="primary_contact_name"
                  value={formData.primary_contact_name}
                  onChange={(e) => handleChange("primary_contact_name", e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : errors.primary_contact_name ? "border-red-500" : ""}
                />
                {errors.primary_contact_name && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.primary_contact_name}
                  </p>
                )}
              </div>

              {/* Contact Email */}
              <div className="grid gap-2">
                <Label htmlFor="contact_email" className="text-sm font-medium flex items-center gap-1">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleChange("contact_email", e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : errors.contact_email ? "border-red-500" : ""}
                />
                {errors.contact_email && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.contact_email}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div className="grid gap-2">
                <Label htmlFor="contact_phone" className="text-sm font-medium flex items-center gap-1">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : errors.contact_phone ? "border-red-500" : ""}
                />
                {errors.contact_phone && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.contact_phone}
                  </p>
                )}
              </div>

              {/* Preferred Channel */}
              <div className="grid gap-2">
                <Label htmlFor="preferred_channel" className="text-sm font-medium">
                  Preferred Communication Channel
                </Label>
                <Select value={formData.preferred_channel} onValueChange={(value) => handleChange("preferred_channel", value)} disabled={!isEditing}>
                  <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Portal">Portal</SelectItem>
                    <SelectItem value="Zalo">Zalo</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>

      {/* Supporting Documents */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Upload Supporting Documents
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Link to Documents section for file uploads</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
