"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Lock } from "lucide-react"

interface BankingAccount {
  id: string
  bank_name: string
  account_number: string
  account_holder: string
  is_primary: boolean
  currency: string
}

interface BankingSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function BankingSection({ role, onHasUnsavedChanges }: BankingSectionProps) {
  const [accounts, setAccounts] = useState<BankingAccount[]>([
    {
      id: "1",
      bank_name: "Vietcombank",
      account_number: "•••••••••••••2024",
      account_holder: "Tech Innovations Vietnam",
      is_primary: true,
      currency: "VND",
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const canEdit = role === "staff" || role === "admin"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Bank Accounts</CardTitle>
            <CardDescription>{accounts.length} account(s) configured</CardDescription>
          </div>
          {canEdit && (
            <Button size="sm" className="gap-2 bg-transparent" variant="outline" onClick={() => setIsAdding(!isAdding)} className="bg-transparent">
              <Plus className="w-4 h-4" />
              Add Account
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Secure Storage</p>
              <p className="text-xs text-blue-800">Account numbers are securely stored and masked in the UI for your protection.</p>
            </div>
          </div>

          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{account.bank_name}</h4>
                      {account.is_primary && <Badge>Primary</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{account.account_holder}</p>
                    <p className="text-sm font-mono mt-1">{account.account_number}</p>
                    <p className="text-xs text-muted-foreground mt-2">Currency: {account.currency}</p>
                  </div>
                  {canEdit && (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isAdding && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Bank Name</Label>
                <Input placeholder="e.g., Vietcombank, Techcombank" />
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">Account Number</Label>
                <Input placeholder="Enter account number (will be masked)" type="password" />
                <p className="text-xs text-muted-foreground">Account number will be securely encrypted</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">Account Holder Name</Label>
                <Input placeholder="Legal account holder name" />
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">Currency</Label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option>VND</option>
                  <option>USD</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button size="sm">Save Account</Button>
                <Button size="sm" variant="outline" onClick={() => setIsAdding(false)} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
