import React from "react"
import { OrderStatus } from "@/types/order"
import { CheckCircle2, Circle, Package, CreditCard, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderTimelineProps {
    status: OrderStatus
    createdAt: string
    updatedAt: string
}

const STEPS = [
    { status: OrderStatus.CREATED, label: "Order Placed", icon: Circle },
    { status: OrderStatus.INVENTORY_RESERVED, label: "Stock Reserved", icon: Package },
    { status: OrderStatus.PAYMENT_COMPLETED, label: "Payment Confirmed", icon: CreditCard },
    { status: OrderStatus.COMPLETED, label: "Order Completed", icon: CheckCircle2 },
]

export function OrderTimeline({ status, createdAt, updatedAt }: OrderTimelineProps) {
    if (status === OrderStatus.CANCELLED || status === OrderStatus.PAYMENT_FAILED || status === OrderStatus.STOCK_CONFIRMATION_FAILED) {
        return (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
                <XCircle className="w-5 h-5 text-destructive" />
                <div>
                    <p className="font-medium text-destructive">Order {status.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-destructive/80">Updated on {new Date(updatedAt).toLocaleString()}</p>
                </div>
            </div>
        )
    }

    const currentStepIndex = STEPS.findIndex(s => s.status === status)
    // If not found (e.g. PENDING), it might be before CREATED or a transitional state
    const effectiveIndex = currentStepIndex === -1 ? 0 : currentStepIndex

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Order Status</h3>
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
                
                <div className="space-y-8 relative">
                    {STEPS.map((step, index) => {
                        const isCompleted = index < effectiveIndex || status === OrderStatus.COMPLETED
                        const isCurrent = index === effectiveIndex && status !== OrderStatus.COMPLETED
                        const Icon = step.icon

                        return (
                            <div key={step.status} className="flex gap-4 items-start">
                                <div className={cn(
                                    "z-10 w-12 h-12 rounded-full flex items-center justify-center ring-4 ring-background",
                                    isCompleted ? "bg-primary text-primary-foreground" : 
                                    isCurrent ? "bg-amber-500 text-white animate-pulse" : "bg-muted text-muted-foreground"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="pt-2">
                                    <p className={cn(
                                        "font-medium",
                                        isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                        {step.label}
                                    </p>
                                    {index === 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(createdAt).toLocaleString()}
                                        </p>
                                    )}
                                    {isCurrent && index > 0 && (
                                        <p className="text-xs text-amber-600 font-medium">
                                            Current Status: {status.replace(/_/g, ' ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
