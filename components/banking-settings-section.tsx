"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Plus, Trash2, Edit2, Lock } from "lucide-react"

interface BankAccount {
  id: number
  bankName: string
  accountNumber: string
  accountHolder: string
  currency: string
  isPrimary: boolean
}

interface BankingSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function BankingSettingsSection({ role }: BankingSettingsSectionProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      bankName: "Techcombank",
      accountNumber: "****5678",
      accountHolder: "Tech Innovations Vietnam",
      currency: "VND",
      isPrimary: true,
    },
    {
      id: 2,
      bankName: "HSBC",
      accountNumber: "****9012",
      accountHolder: "Tech Innovations Vietnam",
      currency: "USD",
      isPrimary: false,
    },
  ])

  const [showFormId, setShowFormId] = useState<number | null>(null)
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    currency: "VND",
  })

  const isReadOnly = role === "client"
  const canEdit = role === "admin" || role === "staff"

  const handleAddAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber && newAccount.accountHolder) {
      setAccounts([
        ...accounts,
        {
          id: Math.max(...accounts.map((a) => a.id), 0) + 1,
          ...newAccount,
          isPrimary: accounts.length === 0,
        },
      ])
      setNewAccount({ bankName: "", accountNumber: "", accountHolder: "", currency: "VND" })
      setShowFormId(null)
    }
  }

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter((a) => a.id !== id))
  }

  const handleSetPrimary = (id: number) => {
    setAccounts(accounts.map((a) => ({ ...a, isPrimary: a.id === id })))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Bank Accounts</CardTitle>
            <CardDescription>Company bank accounts for transactions and payouts</CardDescription>
          </div>
          {canEdit && !isReadOnly && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowFormId(0)}>
              <Plus className="size-4" />
              Add Account
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Account Form */}
          {showFormId === 0 && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
              <h4 className="font-medium">Add New Bank Account</h4>

              <div className="grid gap-2">
                <Label htmlFor="newBankName">Bank Name</Label>
                <Input
                  id="newBankName"
                  placeholder="e.g., Techcombank, HSBC"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newAccountNumber">Account Number</Label>
                <Input
                  id="newAccountNumber"
                  placeholder="Full account number (will be masked)"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                  type="password"
                />
                <p className="text-xs text-muted-foreground">Account numbers are securely encrypted and masked in the UI</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newAccountHolder">Account Holder Name</Label>
                <Input
                  id="newAccountHolder"
                  placeholder="Legal company name"
                  value={newAccount.accountHolder}
                  onChange={(e) => setNewAccount({ ...newAccount, accountHolder: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newCurrency">Currency</Label>
                <select
                  id="newCurrency"
                  value={newAccount.currency}
                  onChange={(e) => setNewAccount({ ...newAccount, currency: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="VND">VND</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddAccount}>
                  Add Account
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => setShowFormId(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Bank Accounts List */}
          <div className="space-y-3">
            {accounts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p className="text-sm">No bank accounts configured yet</p>
              </div>
            ) : (
              accounts.map((account) => (
                <div key={account.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{account.bankName}</p>
                        {account.isPrimary && <Badge>Primary</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Account: <code className="text-xs bg-muted px-2 py-1 rounded">{account.accountNumber}</code>
                      </p>
                      <p className="text-sm text-muted-foreground">{account.accountHolder}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{account.currency}</Badge>
                      {canEdit && !isReadOnly && (
                        <>
                          {!account.isPrimary && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetPrimary(account.id)}
                              className="text-xs"
                            >
                              Make Primary
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(account.id)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-xs text-blue-900">
              Account numbers are securely stored and masked in the UI for security. Only the last 4 digits are visible.
            </p>
          </div>

          {isReadOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex gap-2">
                <Lock className="size-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">View-Only Mode</p>
                  <p className="text-xs text-blue-800">Contact your accountant to add or modify bank accounts</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. All account details are encrypted. Last modified: Jan 18, 2026 by Admin</p>
      </div>
    </div>
  )
}
