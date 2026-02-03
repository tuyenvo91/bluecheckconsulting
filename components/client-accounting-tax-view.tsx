"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { MonthlyAccountingFlow } from "@/components/accounting/monthly-accounting-flow"
import { AnnualAccountingFlow } from "@/components/accounting/annual-accounting-flow"

type AccountingTab = "monthly" | "annual"

export function ClientAccountingTaxView() {
  const [activeTab, setActiveTab] = useState<AccountingTab>("monthly")
  const [monthlyFiscalYear, setMonthlyFiscalYear] = useState("2026")
  const [monthlyMonth, setMonthlyMonth] = useState("January")
  const [annualFiscalYear, setAnnualFiscalYear] = useState("2025")
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Accounting Service" role="client" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Accounting Service</h1>
                <p className="text-muted-foreground mt-1">Monthly and Annual Accounting Processes</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-3 border-b">
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === "monthly"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Accounting
              </button>
              <button
                onClick={() => setActiveTab("annual")}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === "annual"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual Accounting
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "monthly" && (
              <MonthlyAccountingFlow
                role="client"
                fiscalYear={monthlyFiscalYear}
                month={monthlyMonth}
                onFiscalYearChange={setMonthlyFiscalYear}
                onMonthChange={setMonthlyMonth}
              />
            )}

            {activeTab === "annual" && (
              <AnnualAccountingFlow
                role="client"
                fiscalYear={annualFiscalYear}
                onFiscalYearChange={setAnnualFiscalYear}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
