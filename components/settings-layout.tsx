"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { SettingsSubmenu } from "@/components/settings-submenu"
import { Clock } from "lucide-react"
import React from "react"

interface SettingsLayoutProps {
  role: "client" | "staff" | "admin"
  activeSection: string
  children: React.ReactNode
}

export function SettingsLayout({ role, activeSection, children }: SettingsLayoutProps) {
  const basePath = role === "client" ? "/client" : role === "staff" ? "/staff" : "/admin"

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Settings" role={role} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex flex-1 overflow-hidden">
          <SettingsSubmenu activeSection={activeSection} role={role} basePath={basePath} />

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl p-6">
              {/* Settings Header */}
              <div className="mb-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">Company Settings</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your company profile and service configurations.
                  </p>
                </div>

                {/* Company Selector & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">Tech Innovations Vietnam</p>
                      <p className="text-xs text-muted-foreground">Client: C-2024-0521</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Last updated Jan 18, 2026 by Admin</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
