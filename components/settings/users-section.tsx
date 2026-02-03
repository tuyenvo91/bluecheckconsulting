"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, MoreVertical } from "lucide-react"

interface PortalUser {
  id: string
  name: string
  email: string
  role: "client" | "staff" | "admin"
  sub_role: "Viewer" | "Signer" | "Accountant" | "Tax Specialist"
  status: "Active" | "Pending" | "Inactive"
  joined_date: string
}

interface UsersSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

export function UsersSection({ role, onHasUnsavedChanges }: UsersSectionProps) {
  const [users, setUsers] = useState<PortalUser[]>([
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "contact@techinnovations.vn",
      role: "client",
      sub_role: "Signer",
      status: "Active",
      joined_date: "2024-03-15",
    },
    {
      id: "2",
      name: "Lê Thị B",
      email: "info@techinnovations.vn",
      role: "client",
      sub_role: "Viewer",
      status: "Active",
      joined_date: "2024-06-20",
    },
  ])

  const [showInvite, setShowInvite] = useState(false)
  const canManageUsers = role === "staff" || role === "admin"

  const getRoleBadgeColor = (userRole: string) => {
    if (userRole === "admin") return "default"
    if (userRole === "staff") return "secondary"
    return "outline"
  }

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-50"
    if (status === "Pending") return "bg-amber-50"
    return "bg-muted"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Portal Users</CardTitle>
            <CardDescription>{users.length} user(s) have access</CardDescription>
          </div>
          {canManageUsers && (
            <Button size="sm" className="gap-2" onClick={() => setShowInvite(!showInvite)}>
              <Plus className="w-4 h-4" />
              Invite User
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {showInvite && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" placeholder="user@company.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  {role === "admin" && <option>Admin</option>}
                  {(role === "staff" || role === "admin") && <option>Staff - Accountant</option>}
                  {(role === "staff" || role === "admin") && <option>Staff - Tax Specialist</option>}
                  <option>Client - Viewer</option>
                  <option>Client - Signer</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Send Invite
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowInvite(false)} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Name</th>
                  <th className="text-left py-2 px-3 font-medium">Email</th>
                  <th className="text-left py-2 px-3 font-medium">Role</th>
                  <th className="text-left py-2 px-3 font-medium">Status</th>
                  <th className="text-left py-2 px-3 font-medium">Joined</th>
                  {canManageUsers && <th className="text-left py-2 px-3 font-medium"></th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={`border-b ${getStatusColor(user.status)}`}>
                    <td className="py-3 px-3">{user.name}</td>
                    <td className="py-3 px-3 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                        <span className="text-xs text-muted-foreground">{user.sub_role}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{user.joined_date}</td>
                    {canManageUsers && (
                      <td className="py-3 px-3">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">All role changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
