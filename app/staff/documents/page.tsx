"use client"

import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { DocumentsList } from "@/components/documents/documents-list"

export default function StaffDocumentsPage() {
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
                <h1 className="text-3xl font-semibold tracking-tight">Documents Management</h1>
                <p className="text-muted-foreground mt-1">
                  Review and validate client documents, request missing evidence
                </p>
              </div>
            </div>

            {/* Documents List Component */}
            <DocumentsList role="staff" clientCode="ABC" />
          </div>
        </main>
      </div>
    </div>
  )
}
