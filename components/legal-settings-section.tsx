"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X, Plus, Trash2 } from "lucide-react"

interface LegalSettingsSectionProps {
  role: "client" | "staff" | "admin"
}

export function LegalSettingsSection({ role }: LegalSettingsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    businessRegistrationNo: "0123456789",
    issuingAuthority: "Department of Planning and Investment - Ho Chi Minh City",
    registeredAddress: "123 Nguyen Hue Blvd, District 1",
    provinceCity: "Ho Chi Minh City",
    businessLines: [
      { code: "62.01", description: "Computer programming" },
      { code: "62.02", description: "Computer consultancy" },
    ],
    charterCapital: "1000000000",
    currency: "VND",
  })

  const [representatives, setRepresentatives] = useState([
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      dob: "1985-06-15",
      idType: "National ID",
      idNo: "123456789",
      issueDate: "2020-01-01",
      issuePlace: "Ho Chi Minh City",
      address: "123 Nguyen Hue, District 1",
      phone: "+84 28 1234 5678",
      email: "nguyen.van.a@techinnovations.vn",
    },
  ])

  const [owners, setOwners] = useState([
    {
      id: 1,
      ownerType: "Individual",
      ownerName: "Nguyễn Văn A",
      ownershipPercentage: 100,
      contributedCapital: "1000000000",
      isUBO: true,
    },
  ])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4">
      {/* Business Registration Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Business Registration</CardTitle>
            <CardDescription>Official registration details</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2 bg-transparent"
                >
                  <Edit2 className="size-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={() => setIsEditing(false)} className="gap-2">
                    <Save className="size-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-2 bg-transparent">
                    <X className="size-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="businessRegNo">Business Registration No / Tax Code</Label>
            <Input
              id="businessRegNo"
              value={formData.businessRegistrationNo}
              onChange={(e) => handleChange("businessRegistrationNo", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
            <p className="text-xs text-muted-foreground">Required for tax and legal compliance</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="issuingAuthority">Issuing Authority</Label>
            <Input
              id="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={(e) => handleChange("issuingAuthority", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="registeredAddress">Registered Address</Label>
            <Textarea
              id="registeredAddress"
              value={formData.registeredAddress}
              onChange={(e) => handleChange("registeredAddress", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="provinceCity">Province / City</Label>
            <Input
              id="provinceCity"
              value={formData.provinceCity}
              onChange={(e) => handleChange("provinceCity", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="charterCapital">Charter Capital</Label>
            <div className="flex gap-2">
              <Input
                id="charterCapital"
                value={formData.charterCapital}
                onChange={(e) => handleChange("charterCapital", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
              <Input
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : "w-24"}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Business Lines</Label>
            <div className="space-y-2">
              {formData.businessLines.map((line, idx) => (
                <div key={idx} className="flex gap-2 text-sm">
                  <Badge variant="secondary">{line.code}</Badge>
                  <span className="text-muted-foreground">{line.description}</span>
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="gap-2 bg-transparent mt-2">
                <Plus className="size-4" />
                Add Business Line
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legal Representatives Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Legal Representatives</CardTitle>
            <CardDescription>Authorized signatories and representatives</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="size-4" />
              Add Representative
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {representatives.map((rep) => (
              <div key={rep.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{rep.fullName}</p>
                    <p className="text-sm text-muted-foreground">{rep.idType}: {rep.idNo}</p>
                  </div>
                  {(role === "admin" || role === "staff") && (
                    <Button variant="ghost" size="sm">
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">DOB</p>
                    <p>{rep.dob}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Issue Place</p>
                    <p>{rep.issuePlace}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p>{rep.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Ownership Structure</CardTitle>
            <CardDescription>Shareholders and beneficial owners</CardDescription>
          </div>
          {(role === "admin" || role === "staff") && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="size-4" />
              Add Owner
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-5 gap-2 border-b pb-2 font-medium">
              <div>Owner Name</div>
              <div>Type</div>
              <div>Ownership %</div>
              <div>Contributed Capital</div>
              <div>UBO</div>
            </div>
            {owners.map((owner) => (
              <div key={owner.id} className="grid grid-cols-5 gap-2 items-center py-2">
                <div>{owner.ownerName}</div>
                <div>
                  <Badge variant="secondary">{owner.ownerType}</Badge>
                </div>
                <div>{owner.ownershipPercentage}%</div>
                <div>{owner.contributedCapital}</div>
                <div>{owner.isUBO ? <Badge>Yes</Badge> : "No"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Info */}
      <div className="text-xs text-muted-foreground border-t pt-4">
        <p>Changes are logged and audited. Last modified: Jan 18, 2026 by Admin User</p>
      </div>
    </div>
  )
}
