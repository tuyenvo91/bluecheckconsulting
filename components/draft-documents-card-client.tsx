"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download, Eye, CheckCircle2, Loader2, AlertCircle, MessageSquare, Upload } from "lucide-react"
import { useState } from "react"

interface DraftDocumentsCardClientProps {
  step1Completed?: boolean
}

export function DraftDocumentsCardClient({ step1Completed = true }: DraftDocumentsCardClientProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasDrafts, setHasDrafts] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [approvalConfirmed, setApprovalConfirmed] = useState(false)
  const [changeRequestText, setChangeRequestText] = useState("")

  const documents = [
    {
      id: 1,
      name: "Giấy đề nghị đăng ký doanh nghiệp",
      nameEn: "(Business Registration Application)",
      status: "generated" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
    },
    {
      id: 2,
      name: "Điều lệ công ty",
      nameEn: "(Company Charter)",
      status: "generated" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
    },
    {
      id: 3,
      name: "Danh sách thành viên/cổ đông",
      nameEn: "(Members/Shareholders List)",
      status: "generated" as const,
      lastUpdated: "Jan 5, 2025 at 2:30 PM",
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

  const handleGenerateDrafts = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setHasDrafts(true)
    }, 2000)
  }

  const handleApproveDrafts = () => {
    if (approvalConfirmed) {
      alert("Drafts approved successfully!")
      setApprovalConfirmed(false)
    }
  }

  // Empty state - Step 1 not completed
  if (!step1Completed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Draft Documents</CardTitle>
          <CardDescription>
            Based on the information you provided, we can generate draft documents for your review before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="size-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Complete Step 1 to generate draft documents.</p>
          <Button variant="outline">Go to Step 1</Button>
        </CardContent>
      </Card>
    )
  }

  // Step 1 completed but no drafts generated
  if (!hasDrafts && !isGenerating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Draft Documents</CardTitle>
          <CardDescription>
            Based on the information you provided, we can generate draft documents for your review before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="size-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Ready to generate draft documents based on your company information.
          </p>
          <Button onClick={handleGenerateDrafts}>Generate Drafts</Button>
        </CardContent>
      </Card>
    )
  }

  // Generating state
  if (isGenerating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Draft Documents</CardTitle>
          <CardDescription>
            Based on the information you provided, we can generate draft documents for your review before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Loader2 className="size-12 text-primary mb-4 animate-spin" />
          <p className="text-sm font-medium">Generating drafts...</p>
          <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (hasError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Auto-Generated Draft Documents</CardTitle>
          <CardDescription>
            Based on the information you provided, we can generate draft documents for your review before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="size-12 text-destructive mb-4" />
          <p className="text-sm font-medium text-destructive mb-4">Failed to generate draft documents</p>
          <Button variant="outline" onClick={handleGenerateDrafts}>
            Retry Generation
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Documents generated - show table
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Generated Draft Documents</CardTitle>
        <CardDescription>
          Based on the information you provided, we can generate draft documents for your review before submission.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Documents List */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.nameEn}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last updated: {doc.lastUpdated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                {getStatusBadge(doc.status)}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-2 size-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 size-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Approval Section */}
        <div className="rounded-lg bg-muted/50 p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="approval-confirm"
              checked={approvalConfirmed}
              onCheckedChange={(checked) => setApprovalConfirmed(checked as boolean)}
            />
            <label htmlFor="approval-confirm" className="text-sm leading-relaxed cursor-pointer">
              I confirm the information is correct and I approve these drafts for submission.
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleApproveDrafts} disabled={!approvalConfirmed}>
            <CheckCircle2 className="mr-2 size-4" />
            Approve Drafts
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="mr-2 size-4" />
                Request Changes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Changes</DialogTitle>
                <DialogDescription>
                  Describe the changes you would like to make to the draft documents.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Please describe the changes you need..."
                  value={changeRequestText}
                  onChange={(e) => setChangeRequestText(e.target.value)}
                  rows={5}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attach Supporting Documents (Optional)</label>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Upload className="mr-2 size-4" />
                    Upload Files
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setChangeRequestText("")}>
                  Cancel
                </Button>
                <Button onClick={() => alert("Change request submitted!")}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
