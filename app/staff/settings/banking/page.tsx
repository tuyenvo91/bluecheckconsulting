"use client"

import { useState } from "react"
import { SettingsLayout } from "@/components/settings-layout"
import { BankingSection } from "@/components/settings/banking-section"

export default function BankingSettingsPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  return (
    <SettingsLayout role="staff" activeSection="banking">
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
          <div className="text-sm text-amber-900">
            <p className="font-medium">Unsaved Changes</p>
            <p className="text-xs">You have unsaved changes. Click Save to keep them.</p>
          </div>
        </div>
      )}
      <BankingSection role="staff" onHasUnsavedChanges={setHasUnsavedChanges} />
    </SettingsLayout>
  )
}
