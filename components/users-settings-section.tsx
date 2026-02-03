"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Lock } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: "client" | "staff" | "admin"
  subRole: string
  status: "active" | "pending" | "inactive"
}

interface UsersSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function UsersSettingsSection({ role }: UsersSettingsSectionProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyen.van.a@techinnovations.vn",
      role: "client",
      subRole: "Signer",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tran.thi.b@techinnovations.vn",
      role: "client",
      subRole: "Viewer",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "le.van.c@serviceprovider.vn",
      role: "staff",
      subRole: "Accountant",
      status: "active",
    },
  ])

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "client",
    subRole: "Viewer",
  })

  const isReadOnly = role === "client"
  const canInvite = role === "admin" || role === "staff" || role === "client"

  const handleInviteUser = () => {
    if (inviteData.email) {
      setUsers([
        ...users,
        {
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          name: inviteData.email.split("@")[0],
          email: inviteData.email,
          role: (inviteData.role as "client" | "staff") || "client",
          subRole: inviteData.subRole,
          status: "pending",
        },
      ])
      setInviteData({ email: "", role: "client", subRole: "Viewer" })
      setShowInviteForm(false)
    }
  }

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const getRoleColor = (role: string) => {
    return role === "admin" ? "destructive" : role === "staff" ? "secondary" : "default"
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : status === "pending" ? "secondary" : "outline"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Portal Users</CardTitle>
            <CardDescription>Manage users and their roles</CardDescription>
          </div>
          {canInvite && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => setShowInviteForm(true)}
            >
              <Plus className="size-4" />
              Invite User
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Invite Form */}
          {showInviteForm && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
              <h4 className="font-medium">Invite New User</h4>

              <div className="grid gap-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="user@example.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inviteRole">Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) => setInviteData({ ...inviteData, role: value })}
                >
                  <SelectTrigger id="inviteRole">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client User</SelectItem>
                    {role === "admin" && <SelectItem value="staff">Staff</SelectItem>}
                    {role === "admin" && <SelectItem value="admin">Admin</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inviteSubRole">Sub-Role</Label>
                <Select
                  value={inviteData.subRole}
                  onValueChange={(value) => setInviteData({ ...inviteData, subRole: value })}
                >
                  <SelectTrigger id="inviteSubRole">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {inviteData.role === "client" && (
                      <>
                        <SelectItem value="Signer">Signer</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </>
                    )}
                    {inviteData.role === "staff" && (
                      <>
                        <SelectItem value="Accountant">Accountant</SelectItem>
                        <SelectItem value="Tax Specialist">Tax Specialist</SelectItem>
                        <SelectItem value="HR Manager">HR Manager</SelectItem>
                      </>
                    )}
                    {inviteData.role === "admin" && <SelectItem value="System Admin">System Admin</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <p className="text-xs text-muted-foreground">
                An invitation email will be sent to {inviteData.email}. All role changes are logged.
              </p>

              <div className="flex gap-2">
                <Button size="sm" onClick={handleInviteUser}>
                  Send Invite
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => setShowInviteForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                  <th className="px-4 py-2 text-left font-medium">Role</th>
                  <th className="px-4 py-2 text-left font-medium">Sub-Role</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  {(role === "admin" || role === "staff") && <th className="px-4 py-2 text-left font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-2">
                      <Badge variant={getRoleColor(user.role) as any}>{user.role}</Badge>
                    </td>
                    <td className="px-4 py-2">{user.subRole}</td>
                    <td className="px-4 py-2">
                      <Badge variant={getStatusColor(user.status) as any}>{user.status}</Badge>
                    </td>
                    {(role === "admin" || role === "staff") && (
                      <td className="px-4 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveUser(user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-900">
              All role changes are logged and audited. User invitation emails contain secure links for account activation.
            </p>
          </div>

          {isReadOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex gap-2">
                <Lock className="size-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Limited Permissions</p>
                  <p className="text-xs text-blue-800">You can only invite additional client viewers</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. All role changes are tracked. Last modified: Jan 18, 2026 by Admin</p>
      </div>
    </div>
  )
}
