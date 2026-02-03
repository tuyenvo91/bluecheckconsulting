import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  name: string
  status: "completed" | "current" | "upcoming"
}

interface StepperProps {
  steps: Step[]
}

export function Stepper({ steps }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("flex items-center gap-2", stepIdx !== steps.length - 1 && "flex-1")}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex items-center">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                    step.status === "completed"
                      ? "border-green-600 bg-green-600 text-white"
                      : step.status === "current"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {step.status === "completed" ? <Check className="size-5" /> : step.id}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium text-pretty",
                    step.status === "completed"
                      ? "text-foreground"
                      : step.status === "current"
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground",
                  )}
                >
                  {step.name}
                </p>
              </div>
            </div>

            {stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  "hidden h-0.5 w-full flex-1 sm:block",
                  step.status === "completed" ? "bg-green-600" : "bg-border",
                )}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
