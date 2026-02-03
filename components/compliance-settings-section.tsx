"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"

interface ComplianceSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function ComplianceSettingsSection({ role }: ComplianceSettingsSectionProps) {
  return (
    <div className="space-y-4">
      {/* Data Retention Card */}
      <Card>
        <CardHeader>
          <CardTitle>Data Retention & Compliance</CardTitle>
          <CardDescription>Document retention policies and compliance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Accounting Records</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    General Ledger, Trial Balance, Bank Statements
                  </p>
                </div>
                <Badge variant="secondary">10 Years</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Required by Vietnamese law. Retained for full fiscal year plus 10 years.
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Tax Records</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tax Declarations, Invoices, Supporting Documents
                  </p>
                </div>
                <Badge variant="secondary">10 Years</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Required by Vietnamese tax law. Retained in secure, encrypted storage.
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Payroll & HR Records</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Employment Contracts, Payslips, SI Contributions
                  </p>
                </div>
                <Badge variant="secondary">5 Years</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Required by Vietnamese labor law. Securely archived after period ends.
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Communications & Audit Trail</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Emails, Messages, Document Uploads, Changes
                  </p>
                </div>
                <Badge variant="secondary">3 Years</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Maintained for audit and dispute resolution purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E-Signature & Security Card */}
      <Card>
        <CardHeader>
          <CardTitle>E-Signature & Security Consent</CardTitle>
          <CardDescription>Document signature and security policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border">
              <Checkbox defaultChecked disabled id="esignature" className="mt-1" />
              <div>
                <p className="font-medium text-sm">E-Signature Consent</p>
                <p className="text-xs text-muted-foreground mt-1">
                  I agree to accept electronic signatures on contracts, tax documents, and other official records.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border">
              <Checkbox defaultChecked disabled id="dataProcessing" className="mt-1" />
              <div>
                <p className="font-medium text-sm">Data Processing Consent</p>
                <p className="text-xs text-muted-foreground mt-1">
                  I authorize processing of company and employee data for accounting, tax, and payroll services.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border">
              <Checkbox defaultChecked disabled id="encryption" className="mt-1" />
              <div>
                <p className="font-medium text-sm">Encryption & Secure Storage</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All sensitive financial and personal data is encrypted and stored securely in compliance with regulations.
                </p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Card */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>System and document changes are logged</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex gap-3">
              <AlertCircle className="size-5 text-blue-600 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium">Comprehensive Audit Trail</p>
                <p className="text-blue-800 mt-1">
                  All settings changes, document uploads, user actions, and file modifications are logged with timestamps and user information. This audit trail is retained for compliance purposes and can be requested by authorities.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-blue-900">
              <p className="font-medium">Logged Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Who made the change (user ID, name, role)</li>
                <li>What was changed (field, old value, new value)</li>
                <li>When the change occurred (date, time, timezone)</li>
                <li>From where (IP address, device)</li>
                <li>For tax documents: all access and export events</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Archive Policy Card */}
      <Card>
        <CardHeader>
          <CardTitle>Archive & Retrieval Policy</CardTitle>
          <CardDescription>How to retrieve archived documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              Documents are automatically archived at the end of their retention period. To retrieve archived documents:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Contact your service provider with the document type and period needed</li>
              <li>Submit request with verification of authorization</li>
              <li>Archived documents are retrieved within 5 business days</li>
              <li>Access is logged and time-limited for security</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Admin Only Settings */}
      {role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-900">Admin-Only Settings</CardTitle>
            <CardDescription>System-level compliance configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="defaultRetention">Default Retention Years</Label>
              <Input
                id="defaultRetention"
                type="number"
                value="10"
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Cannot be changed - set per regulation</p>
            </div>

            <label className="flex items-center gap-2 p-3 rounded-lg border">
              <Checkbox defaultChecked disabled id="auditLogEnabled" />
              <span className="text-sm">Audit Logging Enabled (required)</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-lg border">
              <Checkbox defaultChecked disabled id="encryptionEnabled" />
              <span className="text-sm">End-to-End Encryption Enabled (required)</span>
            </label>
          </CardContent>
        </Card>
      )}

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Compliance settings are managed by administrators. Last reviewed: Jan 18, 2026</p>
      </div>
    </div>
  )
}
