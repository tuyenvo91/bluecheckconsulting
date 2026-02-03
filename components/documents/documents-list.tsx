"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, Eye, History, Lock, Search, Upload, ChevronRight } from "lucide-react"
import { UploadModal } from "./upload-modal"

interface Document {
  id: string
  filename: string
  documentType: string
  period: string
  fiscalYear: string
  uploadedBy: string
  uploadedAt: string
  status: "active" | "archived"
  isLocked: boolean
  size: string
  bankName?: string
  accountMasked?: string
}

interface DocumentsListProps {
  role: "client" | "staff" | "admin"
  clientCode: string
}

const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: "1",
    filename: "ABC-F-A06-001-JAN_2026_BANK-V1.0-2026-01-10.pdf",
    documentType: "Bank Statement",
    period: "2026-01",
    fiscalYear: "2026",
    uploadedBy: "John Client",
    uploadedAt: "Jan 10, 2026 2:30 PM",
    status: "active",
    isLocked: false,
    size: "2.4 MB",
    bankName: "Vietcombank",
    accountMasked: "****5678",
  },
  {
    id: "2",
    filename: "ABC-F-E25-001-SALES_INVOICE-V1.0-2026-01-08.xlsx",
    documentType: "Sales Invoice",
    period: "2026-01",
    fiscalYear: "2026",
    uploadedBy: "Jane Staff",
    uploadedAt: "Jan 8, 2026 10:15 AM",
    status: "active",
    isLocked: false,
    size: "1.2 MB",
  },
  {
    id: "3",
    filename: "ABC-F-A06-002-RECEIPT_VOUCHERS-V1.0-2026-01-05.pdf",
    documentType: "Receipt Voucher",
    period: "2026-01",
    fiscalYear: "2026",
    uploadedBy: "John Client",
    uploadedAt: "Jan 5, 2026 4:45 PM",
    status: "active",
    isLocked: false,
    size: "3.1 MB",
  },
  {
    id: "4",
    filename: "ABC-F-D20-001-GENERAL_LEDGER-V1.0-2025-12-28.xlsx",
    documentType: "General Ledger",
    period: "2025-12",
    fiscalYear: "2025",
    uploadedBy: "System",
    uploadedAt: "Dec 28, 2025 3:00 PM",
    status: "archived",
    isLocked: true,
    size: "4.5 MB",
  },
]

export function DocumentsList({ role, clientCode }: DocumentsListProps) {
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState("all")
  const [fiscalYearFilter, setFiscalYearFilter] = useState("2026")
  const [periodTypeFilter, setPeriodTypeFilter] = useState("monthly")
  const [periodFilter, setPeriodFilter] = useState("2026-01")
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = documents.filter((doc) => {
    if (fiscalYearFilter !== "all" && doc.fiscalYear !== fiscalYearFilter) return false
    if (periodFilter && doc.period !== periodFilter) return false
    if (documentTypeFilter !== "all" && doc.documentType !== documentTypeFilter) return false
    if (statusFilter !== "all" && doc.status !== statusFilter) return false
    if (searchQuery && !doc.filename.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleUpload = (data: any) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      filename: data.file.name,
      documentType: data.documentType,
      period: `${data.fiscalYear}-${String(parseInt(data.period) + 1).padStart(2, "0")}`,
      fiscalYear: data.fiscalYear,
      uploadedBy: role === "client" ? "Current User" : "Staff Member",
      uploadedAt: new Date().toLocaleString(),
      status: "active",
      isLocked: false,
      size: `${(data.file.size / 1024 / 1024).toFixed(1)} MB`,
      bankName: data.bankName,
      accountMasked: data.accountMasked,
    }
    setDocuments([newDoc, ...documents])
  }

  const getStatusBadge = (status: string, isLocked: boolean) => {
    if (isLocked) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <Lock className="mr-1 h-3 w-3" />
          Archived
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Active
      </Badge>
    )
  }

  const canUpload = role === "client" || role === "staff"
  const canManageArchive = role === "admin"

  return (
    <div className="space-y-6">
      {/* Archive Banner */}
      {statusFilter === "archived" && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex gap-3">
          <Lock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-medium">This period is closed</p>
            <p className="text-xs">Documents are read-only. Only administrators can unlock periods.</p>
          </div>
        </div>
      )}

      {/* Sticky Filter Bar */}
      <Card className="sticky top-0 z-10">
        <CardHeader>
          <CardTitle className="text-base">Filter Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top Row Filters */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-5 lg:grid-cols-6">
            {/* Service Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Service</label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="accounting">Accounting</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fiscal Year Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Fiscal Year</label>
              <Select value={fiscalYearFilter} onValueChange={setFiscalYearFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Period Type</label>
              <Select value={periodTypeFilter} onValueChange={setPeriodTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Period</label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-01">Jan 2026</SelectItem>
                  <SelectItem value="2026-02">Feb 2026</SelectItem>
                  <SelectItem value="2026-03">Mar 2026</SelectItem>
                  <SelectItem value="2025-12">Dec 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Document Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Type</label>
              <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                  <SelectItem value="Sales Invoice">Sales Invoice</SelectItem>
                  <SelectItem value="Purchase Invoice">Purchase Invoice</SelectItem>
                  <SelectItem value="Receipt Voucher">Receipt Voucher</SelectItem>
                  <SelectItem value="Payment Voucher">Payment Voucher</SelectItem>
                  <SelectItem value="General Ledger">General Ledger</SelectItem>
                  <SelectItem value="Trial Balance">Trial Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Upload */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by filename, bank, or serial number..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {canUpload && (
              <Button onClick={() => setIsUploadModalOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documents</CardTitle>
          <CardDescription>{filteredDocs.length} document{filteredDocs.length !== 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No documents found for this period</p>
              {canUpload && (
                <Button onClick={() => setIsUploadModalOpen(true)} variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload First Document
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedDocId(doc.id)}
                    >
                      <TableCell className="font-mono text-sm max-w-xs truncate">
                        {doc.filename}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.documentType}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{doc.period}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {doc.uploadedBy}
                      </TableCell>
                      <TableCell>{getStatusBadge(doc.status, doc.isLocked)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!doc.isLocked && (
                            <>
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost">
                            <History className="h-4 w-4" />
                          </Button>
                          {doc.isLocked && canManageArchive && (
                            <Button size="sm" variant="ghost">
                              <Lock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        clientCode={clientCode}
      />

      {/* Details Drawer would be shown when selectedDocId is set */}
      {selectedDocId && (
        <DocumentDetailsDrawer
          documentId={selectedDocId}
          document={documents.find((d) => d.id === selectedDocId)}
          onClose={() => setSelectedDocId(null)}
          role={role}
        />
      )}
    </div>
  )
}

function DocumentDetailsDrawer({ documentId, document, onClose, role }: { documentId: string; document?: Document; onClose: () => void; role: string }) {
  if (!document) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center md:justify-end">
      <div className="bg-white w-full md:w-96 h-full md:h-auto md:max-h-[90vh] rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Document Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Filename and Metadata */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Filename</p>
            <p className="font-mono text-sm break-all">{document.filename}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Document Type</p>
              <p className="text-sm font-medium">{document.documentType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Period</p>
              <p className="text-sm font-medium">{document.period}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Fiscal Year</p>
              <p className="text-sm font-medium">{document.fiscalYear}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              {document.isLocked ? (
                <Badge className="w-fit bg-red-100 text-red-700 border-red-200">
                  <Lock className="mr-1 h-3 w-3" />
                  Archived
                </Badge>
              ) : (
                <Badge className="w-fit bg-green-100 text-green-700 border-green-200">Active</Badge>
              )}
            </div>
          </div>

          {document.bankName && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Bank Information</p>
              <div className="text-sm space-y-1">
                <p>Bank: {document.bankName}</p>
                <p>Account: {document.accountMasked}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Upload Information</p>
            <div className="text-sm space-y-1">
              <p>Uploaded by: {document.uploadedBy}</p>
              <p>Date: {document.uploadedAt}</p>
              <p>Size: {document.size}</p>
            </div>
          </div>

          {/* Version History */}
          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium">Version History</p>
            <div className="space-y-2">
              <div className="rounded-lg border p-3 text-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">V1.0</span>
                  <span className="text-xs text-muted-foreground">Current</span>
                </div>
                <p className="text-xs text-muted-foreground">Uploaded on {document.uploadedAt}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 border-t pt-4">
            {!document.isLocked && (
              <>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Add New Version
                </Button>
              </>
            )}
            {role === "admin" && document.isLocked && (
              <Button className="w-full" variant="destructive">
                <Lock className="mr-2 h-4 w-4" />
                Unlock Period
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
