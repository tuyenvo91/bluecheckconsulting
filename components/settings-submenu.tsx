"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Building2,
  Scale,
  BarChart3,
  Percent,
  Users2,
  Banknote,
  UsersRound,
  Package,
  Shield,
} from "lucide-react"

interface SettingsSubmenuProps {
  activeSection: string
  role: "client" | "staff" | "admin"
  basePath: string
}

export function SettingsSubmenu({ activeSection, role, basePath }: SettingsSubmenuProps) {
  const menuItems = [
    { id: "company", label: "Company", icon: Building2, href: `${basePath}/settings/company` },
    { id: "legal", label: "Legal", icon: Scale, href: `${basePath}/settings/legal` },
    { id: "accounting", label: "Accounting", icon: BarChart3, href: `${basePath}/settings/accounting` },
    { id: "tax", label: "Tax", icon: Percent, href: `${basePath}/settings/tax` },
    { id: "payroll", label: "Payroll & Social Insurance", icon: Users2, href: `${basePath}/settings/payroll` },
    { id: "banking", label: "Banking", icon: Banknote, href: `${basePath}/settings/banking` },
    { id: "users", label: "Users & Roles", icon: UsersRound, href: `${basePath}/settings/users` },
    { id: "services", label: "Services", icon: Package, href: `${basePath}/settings/services` },
    { id: "compliance", label: "Compliance", icon: Shield, href: `${basePath}/settings/compliance` },
  ]

  return (
    <div className="w-48 border-r bg-muted/30 p-0">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              activeSection === item.id
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
