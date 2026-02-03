"use client"

import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export default function AdminDocumentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Documents" role="staff" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Document Administration</h1>
                <p className="text-muted-foreground mt-1">
                  Manage document mappings, policies, and archive operations
                </p>
              </div>
            </div>

            {/* Admin Features */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {/* Cabinet Mapping Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cabinet Mapping Rules</CardTitle>
                  <CardDescription>Configure document type to cabinet code mappings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Bank Statements</span>
                      <span className="font-mono text-muted-foreground">A06</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Invoices</span>
                      <span className="font-mono text-muted-foreground">E25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ledgers & Reports</span>
                      <span className="font-mono text-muted-foreground">D20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Archive Package</span>
                      <span className="font-mono text-muted-foreground">W90</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Mappings
                  </Button>
                </CardContent>
              </Card>

              {/* Unlock Period */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Period Management</CardTitle>
                  <CardDescription>Lock/unlock closed accounting periods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <p className="text-sm font-medium">Currently Locked Periods</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>2025-12 (Full Year 2025)</li>
                      <li>2025-Q4 (Q4 2025)</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Periods
                  </Button>
                </CardContent>
              </Card>

              {/* Export/Import Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Export</CardTitle>
                  <CardDescription>Export document metadata and audit logs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Export document metadata as CSV for compliance and auditing purposes
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export Document Metadata
                  </Button>
                </CardContent>
              </Card>

              {/* Archive Package Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Archive Package</CardTitle>
                  <CardDescription>Create and manage archive packages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Create archive packages (DriveCode W) for closed periods
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Archive Package
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Document Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Document Statistics</CardTitle>
                <CardDescription>System-wide document metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                    <p className="text-2xl font-semibold">1,247</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Active Periods</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Archived Periods</p>
                    <p className="text-2xl font-semibold">8</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
                    <p className="text-2xl font-semibold">425 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
