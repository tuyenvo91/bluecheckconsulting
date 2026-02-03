"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Edit3,
  Send,
  RefreshCw,
  Shield,
  Flag,
} from "lucide-react"
import { useState } from "react"

interface DraftDocumentsCardStaffProps {
  step1Completed?: boolean
}

export function DraftDocumentsCardStaff({ step1Completed = true }: DraftDocumentsCardStaffProps) {
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Validate company name format", checked: true },
    { id: 2, label: "Confirm address completeness", checked: true },
    { id: 3, label: "Map business activities to industry codes (VSIC)", checked: true },
    { id: 4, label: "Verify shareholder/member structure", checked: false },
    { id: 5, label: "Confirm legal representative details", checked: true },
  ])

  const documents = [
    {
      id: 1,
      name: "Giấy đề nghị đăng ký doanh nghiệp",
      nameEn: "(Business Registration Application)",
      status: "generated" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
      metadata: {
        generatedFrom: "Step 1 submission v3",
        templateVersion: "v1.2",
        validationWarnings: 0,
      },
    },
    {
      id: 2,
      name: "Điều lệ công ty",
      nameEn: "(Company Charter)",
      status: "generated" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
      metadata: {
        generatedFrom: "Step 1 submission v3",
        templateVersion: "v1.2",
        validationWarnings: 0,
      },
    },
    {
      id: 3,
      name: "Danh sách thành viên/cổ đông",
      nameEn: "(Members/Shareholders List)",
      status: "needs-revision" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
      metadata: {
        generatedFrom: "Step 1 submission v3",
        templateVersion: "v1.2",
        validationWarnings: 1,
      },
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not-generated":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Not Generated
          </Badge>
        )
      case "generating":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            <Loader2 className="mr-1.5 size-3 animate-spin" />
            Generating
          </Badge>
        )
      case "generated":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1.5 size-3" />
            Generated
          </Badge>
        )
      case "needs-revision":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="mr-1.5 size-3" />
            Needs Revision
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1.5 size-3" />
            Approved
          </Badge>
        )
      default:
        return null
    }
  }

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  if (!step1Completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Draft Documents</CardTitle>
          <CardDescription>Staff controls for managing draft document generation and review</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="size-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Waiting for client to complete Step 1</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Generated Draft Documents</CardTitle>
        <CardDescription>Staff controls for managing draft document generation and review</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Documents List */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.nameEn}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last updated: {doc.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">{getStatusBadge(doc.status)}</div>
              </div>

              {/* Staff Metadata */}
              <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="size-3" />
                  <span className="font-medium">Staff Only:</span>
                </div>
                <p>
                  Generated from: <span className="font-medium">{doc.metadata.generatedFrom}</span>
                </p>
                <p>
                  Template version: <span className="font-medium">{doc.metadata.templateVersion}</span>
                </p>
                <p className={doc.metadata.validationWarnings > 0 ? "text-amber-700" : ""}>
                  Validation warnings: <span className="font-medium">{doc.metadata.validationWarnings}</span>
                </p>
              </div>

              {/* Staff Actions */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 size-4" />
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 size-4" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Edit3 className="mr-2 size-4" />
                  Edit Draft
                </Button>
                <Button size="sm" variant="outline">
                  <RefreshCw className="mr-2 size-4" />
                  Regenerate
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Internal Checklist */}
        <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Shield className="size-4 text-accent-foreground" />
            <span>Internal Validation Checklist (Staff Only)</span>
          </div>
          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <Checkbox
                  id={`checklist-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => toggleChecklistItem(item.id)}
                />
                <label htmlFor={`checklist-${item.id}`} className="text-sm cursor-pointer leading-relaxed">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Actions */}
        <div className="flex flex-wrap gap-3">
          <Button>
            <Send className="mr-2 size-4" />
            Send to Client for Review
          </Button>
          <Button variant="outline">
            <CheckCircle2 className="mr-2 size-4" />
            Mark as Ready
          </Button>
          <Button variant="outline">
            <CheckCircle2 className="mr-2 size-4" />
            Mark as Approved
          </Button>
          <Button variant="outline">
            <Flag className="mr-2 size-4" />
            Request Client Clarification
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
