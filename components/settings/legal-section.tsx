"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X, Plus, Trash2, AlertCircle, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface LegalSectionProps {
  role: "client" | "staff" | "admin"
  onHasUnsavedChanges?: (hasChanges: boolean) => void
}

interface Representative {
  id: string
  full_name: string
  dob: string
  id_type: string
  id_no: string
  issue_date: string
  issue_place: string
  address: string
  phone: string
  email: string
}

interface Owner {
  id: string
  owner_type: "individual" | "organization"
  owner_name: string
  ownership_percentage: number
  contributed_capital: number
  is_ubo: boolean
}

export function LegalSection({ role, onHasUnsavedChanges }: LegalSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    business_registration_no: "0123456789",
    issuing_authority: "Department of Planning and Investment of Ho Chi Minh City",
    registered_address: "123 Nguyen Hue Boulevard, District 1, Ho Chi Minh City",
    province_city: "Ho Chi Minh",
    business_lines: ["6202 - IT Consulting Services", "6209 - Other IT Services"],
    charter_capital: 5000000000,
  })

  const [representatives, setRepresentatives] = useState<Representative[]>([
    {
      id: "1",
      full_name: "Nguyễn Văn A",
      dob: "1985-05-15",
      id_type: "National ID",
      id_no: "123456789",
      issue_date: "2015-01-10",
      issue_place: "Ho Chi Minh City",
      address: "123 Nguyen Hue, District 1",
      phone: "+84 28 1234 5678",
      email: "contact@techinnovations.vn",
    },
  ])

  const [owners, setOwners] = useState<Owner[]>([
    {
      id: "1",
      owner_type: "individual",
      owner_name: "Nguyễn Văn A",
      ownership_percentage: 100,
      contributed_capital: 5000000000,
      is_ubo: true,
    },
  ])

  const canEdit = role === "admin" || role === "staff"

  return (
    <div className="space-y-6">
      {/* Business Registration Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Business Registration</CardTitle>
            <CardDescription>Registration details and business lines</CardDescription>
          </div>
          {canEdit && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2 bg-transparent">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" className="gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-2 bg-transparent">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Business Registration No / Tax Code</Label>
              <Input
                value={registrationData.business_registration_no}
                onChange={(e) => setRegistrationData({ ...registrationData, business_registration_no: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Province/City</Label>
              <Input
                value={registrationData.province_city}
                onChange={(e) => setRegistrationData({ ...registrationData, province_city: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Issuing Authority</Label>
            <Input
              value={registrationData.issuing_authority}
              onChange={(e) => setRegistrationData({ ...registrationData, issuing_authority: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Registered Address</Label>
            <Textarea
              value={registrationData.registered_address}
              onChange={(e) => setRegistrationData({ ...registrationData, registered_address: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Charter Capital (VND)</Label>
            <Input
              type="number"
              value={registrationData.charter_capital}
              onChange={(e) => setRegistrationData({ ...registrationData, charter_capital: Number(e.target.value) })}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {new Intl.NumberFormat("vi-VN").format(registrationData.charter_capital)} VND
            </p>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Business Lines</Label>
            <div className="space-y-2">
              {registrationData.business_lines.map((line, idx) => (
                <Badge key={idx} variant="secondary">
                  {line}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Business Line
              </Button>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">Changes are logged for audit purposes.</p>
          </div>
        </CardContent>
      </Card>

      {/* Legal Representatives Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Legal Representatives</CardTitle>
            <CardDescription>{representatives.length} representative(s)</CardDescription>
          </div>
          {canEdit && (
            <Button size="sm" className="gap-2 bg-transparent" variant="outline" onClick={() => setIsEditing(!isEditing)} className="bg-transparent">
              <Plus className="w-4 h-4" />
              Add Representative
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {representatives.map((rep) => (
              <div key={rep.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{rep.full_name}</p>
                    <p className="text-sm text-muted-foreground">{rep.id_type}: {rep.id_no}</p>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p>{rep.dob}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Issue Place</p>
                    <p>{rep.issue_place}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p>{rep.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p>{rep.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ownership Structure Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Ownership Structure</CardTitle>
            <CardDescription>{owners.length} owner(s)</CardDescription>
          </div>
          {canEdit && (
            <Button size="sm" className="gap-2 bg-transparent" variant="outline" onClick={() => setIsEditing(!isEditing)} className="bg-transparent">
              <Plus className="w-4 h-4" />
              Add Owner
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {owners.map((owner) => (
              <div key={owner.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{owner.owner_name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={owner.owner_type === "individual" ? "default" : "secondary"}>
                        {owner.owner_type === "individual" ? "Individual" : "Organization"}
                      </Badge>
                      {owner.is_ubo && <Badge variant="outline">UBO</Badge>}
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Ownership %</p>
                    <p className="font-medium">{owner.ownership_percentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contributed Capital (VND)</p>
                    <p className="font-medium">{new Intl.NumberFormat("vi-VN").format(owner.contributed_capital)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
