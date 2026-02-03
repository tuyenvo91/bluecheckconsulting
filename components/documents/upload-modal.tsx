"use client"

import React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { generateFilename, sanitizeDescription, CABINET_MAPPINGS } from "@/lib/document-naming"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (data: UploadFormData) => void
  clientCode: string
  clientCodeReadOnly?: boolean
}

export interface UploadFormData {
  service: "accounting" | "tax"
  periodType: "monthly" | "quarterly" | "annual"
  fiscalYear: string
  period: string
  documentType: string
  bankName?: string
  accountMasked?: string
  description: string
  version: string
  date: string
  file?: File
}

const FISCAL_YEARS = ["2025", "2026", "2027"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"]

export function UploadModal({ isOpen, onClose, onUpload, clientCode, clientCodeReadOnly = true }: UploadModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<UploadFormData>({
    service: "accounting",
    periodType: "monthly",
    fiscalYear: new Date().getFullYear().toString(),
    period: new Date().getMonth().toString(),
    documentType: "bank-statement",
    description: "",
    version: "1.0",
    date: new Date().toISOString().split("T")[0],
  })
  const [dragActive, setDragActive] = useState(false)

  const documentTypeInfo = CABINET_MAPPINGS[formData.documentType]
  const generatedFilename = generateFilename({
    clientCode,
    driveCode: documentTypeInfo?.driveCode || "F",
    cabinetCode: documentTypeInfo?.code || "A06",
    description: formData.description || "DOCUMENT",
    version: formData.version,
    date: formData.date,
    extension: formData.file?.name?.split(".").pop() || "pdf",
    serialNo: 1,
  })

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, file: e.dataTransfer.files[0] })
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handlePeriodChange = (value: string) => {
    setFormData({
      ...formData,
      period: value,
    })
  }

  const handleNext = () => {
    if (formData.description.trim()) {
      setStep(2)
    }
  }

  const handleSubmit = () => {
    if (formData.file) {
      onUpload(formData)
      setStep(1)
      setFormData({
        service: "accounting",
        periodType: "monthly",
        fiscalYear: new Date().getFullYear().toString(),
        period: new Date().getMonth().toString(),
        documentType: "bank-statement",
        description: "",
        version: "1.0",
        date: new Date().toISOString().split("T")[0],
      })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Add accounting evidence to your document repository
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step Indicator */}
          <div className="flex items-center gap-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step === 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              2
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 1: Document Metadata</h3>
                <div className="space-y-4">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Select value={formData.service} onValueChange={(value: any) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger id="service">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="tax">Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Period Type */}
                  <div className="space-y-2">
                    <Label htmlFor="periodType">Period Type</Label>
                    <Select value={formData.periodType} onValueChange={(value: any) => setFormData({ ...formData, periodType: value, period: formData.periodType === value ? formData.period : "0" })}>
                      <SelectTrigger id="periodType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fiscal Year */}
                  <div className="space-y-2">
                    <Label htmlFor="fiscalYear">Fiscal Year</Label>
                    <Select value={formData.fiscalYear} onValueChange={(value) => setFormData({ ...formData, fiscalYear: value })}>
                      <SelectTrigger id="fiscalYear">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FISCAL_YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Period Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="period">
                      {formData.periodType === "annual" ? "Year" : formData.periodType === "quarterly" ? "Quarter" : "Month"}
                    </Label>
                    <Select value={formData.period} onValueChange={handlePeriodChange}>
                      <SelectTrigger id="period">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.periodType === "annual" ? (
                          <SelectItem value="0">Full Year</SelectItem>
                        ) : formData.periodType === "quarterly" ? (
                          QUARTERS.map((q, i) => (
                            <SelectItem key={q} value={i.toString()}>
                              {q} {formData.fiscalYear}
                            </SelectItem>
                          ))
                        ) : (
                          MONTHS.map((m, i) => (
                            <SelectItem key={m} value={i.toString()}>
                              {m} {formData.fiscalYear}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Document Type */}
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select value={formData.documentType} onValueChange={(value) => setFormData({ ...formData, documentType: value })}>
                      <SelectTrigger id="documentType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-statement">Bank Statement</SelectItem>
                        <SelectItem value="sales-invoice">Sales Invoice</SelectItem>
                        <SelectItem value="purchase-invoice">Purchase Invoice</SelectItem>
                        <SelectItem value="receipt-voucher">Receipt Voucher</SelectItem>
                        <SelectItem value="payment-voucher">Payment Voucher</SelectItem>
                        <SelectItem value="general-ledger">General Ledger</SelectItem>
                        <SelectItem value="trial-balance">Trial Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bank Name and Account (conditionally shown) */}
                  {formData.documentType === "bank-statement" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name (Optional)</Label>
                          <Input
                            id="bankName"
                            placeholder="e.g., Vietcombank"
                            value={formData.bankName || ""}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountMasked">Account Number (Masked, Optional)</Label>
                          <Input
                            id="accountMasked"
                            placeholder="e.g., ****5678"
                            value={formData.accountMasked || ""}
                            onChange={(e) => setFormData({ ...formData, accountMasked: e.target.value })}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="description"
                      placeholder="e.g., JAN_2026_BANK_STATEMENTS"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: sanitizeDescription(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">Uppercase letters, numbers, and underscores only. Will be auto-sanitized.</p>
                  </div>

                  {/* Version and Date */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="version">Version</Label>
                      <Input
                        id="version"
                        placeholder="1.0"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Naming Preview */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm">Filename Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm break-all">{generatedFilename}</div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 2: Upload File</h3>

                {/* Filename Summary */}
                <div className="mb-6 rounded-lg bg-muted/50 p-4 space-y-2">
                  <p className="text-sm font-medium">Final Filename</p>
                  <div className="font-mono text-sm break-all text-muted-foreground">{generatedFilename}</div>
                </div>

                {/* Drag & Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/30"
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />

                  {formData.file ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                      <p className="font-medium">{formData.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <p className="font-medium">Drag and drop your file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">File will be renamed automatically</p>
                    <p className="text-xs">Your uploaded file will be stored as: <span className="font-mono">{generatedFilename}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 2) {
                setStep(1)
              } else {
                onClose()
              }
            }}
          >
            {step === 2 ? "Back" : "Cancel"}
          </Button>

          {step === 1 ? (
            <Button onClick={handleNext} disabled={!formData.description.trim()}>
              Next Step
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!formData.file}>
              <Upload className="mr-2 h-4 w-4" />
              Upload & Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
