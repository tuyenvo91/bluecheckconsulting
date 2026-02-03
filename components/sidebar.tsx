"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  FileText,
  ArrowLeftRight,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeItem: string
  role: "client" | "staff"
}

export function Sidebar({ activeItem, role }: SidebarProps) {
  const clientNav = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/client/dashboard" },
    {
      name: "Services",
      icon: Briefcase,
      href: "#",
      subItems: [
        { name: "Company Incorporation", href: "/client/incorporation" },
        { name: "Accounting Service", href: "/client/accounting" },
        { name: "Tax Service", href: "/client/tax" },
        { name: "Payroll & Social Insurance", href: "/client/payroll" },
        { name: "Company Dissolution", href: "/client/dissolution" },
      ],
    },
    { name: "Documents", icon: FileText, href: "/client/documents" },
    { name: "Settings", icon: Settings, href: "/client/settings" },
  ]

  const staffNav = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/staff/dashboard" },
    {
      name: "Cases",
      icon: Briefcase,
      href: "#",
      subItems: [
        { name: "Company Incorporation", href: "/staff/incorporation" },
        { name: "Accounting Service", href: "/staff/accounting" },
        { name: "Tax Service", href: "/staff/tax" },
        { name: "Payroll & Social Insurance", href: "/staff/payroll" },
        { name: "Company Dissolution", href: "/staff/dissolution" },
      ],
    },
    { name: "Clients", icon: Building2, href: "/staff/clients" },
    { name: "Documents", icon: FileText, href: "/staff/documents" },
    { name: "Settings", icon: Settings, href: "/staff/settings" },
  ]

  const navItems = role === "client" ? clientNav : staffNav

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-xl font-semibold tracking-tight">{role === "client" ? "Client Portal" : "Staff Portal"}</h2>
      </div>
      <nav className="space-y-1 p-4 flex-1">
        {navItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeItem === item.name || (item.subItems && item.subItems.some((sub) => sub.name === activeItem))
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="size-5" />
              {item.name}
            </Link>
            {item.subItems && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={cn(
                      "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                      activeItem === subItem.name
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            <ArrowLeftRight className="mr-2 size-4" />
            Switch Role
          </Button>
        </Link>
      </div>
    </aside>
  )
}
