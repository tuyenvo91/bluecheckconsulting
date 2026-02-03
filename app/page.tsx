"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance">Client Portal</h1>
          <p className="mt-3 text-lg text-muted-foreground">Company Incorporation Service Demo</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Client Role */}
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="size-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Client View</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Public Interface
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                View the portal as a client would see it. Track incorporation progress, upload documents, and
                communicate with your specialist.
              </CardDescription>

              <div className="space-y-2 text-sm">
                <p className="font-medium">What clients can see:</p>
                <ul className="ml-4 space-y-1 text-muted-foreground list-disc">
                  <li>Service progress and status</li>
                  <li>Document upload and requirements</li>
                  <li>Next actions and notifications</li>
                  <li>Messaging with assigned specialist</li>
                </ul>
              </div>

              <Button className="w-full" onClick={() => router.push("/client/incorporation")}>
                View as Client
              </Button>
            </CardContent>
          </Card>

          {/* Staff Role */}
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent/50">
                    <Shield className="size-6 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Staff View</CardTitle>
                    <Badge variant="outline" className="mt-1 bg-accent/20">
                      Internal Access
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                Manage cases with full administrative capabilities. Access internal tools, checklists, and confidential
                information not visible to clients.
              </CardDescription>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Staff-only features:</p>
                <ul className="ml-4 space-y-1 text-muted-foreground list-disc">
                  <li>Internal checklists and validations</li>
                  <li>Staff notes and risk assessments</li>
                  <li>Document verification actions</li>
                  <li>Case management and status updates</li>
                </ul>
              </div>

              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={() => router.push("/staff/incorporation")}
              >
                View as Staff
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Role Comparison</p>
              <p>
                This demo showcases how the same incorporation process appears differently based on user roles. Staff
                members have access to internal tools, notes, and actions that are hidden from clients to maintain a
                clean, focused client experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
