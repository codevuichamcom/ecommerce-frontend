"use client"

import React from "react"

import { OrderStatus } from "@/types/order"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Package, Clock, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
    status: OrderStatus
    className?: string
}

export function getStatusConfig(status: OrderStatus) {
    switch (status) {
        case OrderStatus.COMPLETED:
            return {
                variant: "default" as const,
                label: "Completed",
                icon: CheckCircle2,
                className: "bg-green-600 hover:bg-green-600 dark:bg-green-700",
            }
        case OrderStatus.PENDING:
        case OrderStatus.CREATED:
            return {
                variant: "secondary" as const,
                label: "Processing",
                icon: Clock,
                className: "bg-amber-500 hover:bg-amber-500 text-white dark:bg-amber-600",
            }
        case OrderStatus.INVENTORY_RESERVED:
            return {
                variant: "secondary" as const,
                label: "Reserved",
                icon: Package,
                className: "bg-blue-500 hover:bg-blue-500 text-white dark:bg-blue-600",
            }
        case OrderStatus.PAYMENT_COMPLETED:
            return {
                variant: "default" as const,
                label: "Payment Complete",
                icon: CheckCircle2,
                className: "bg-emerald-500 hover:bg-emerald-500 text-white dark:bg-emerald-600",
            }
        case OrderStatus.CANCELLED:
            return {
                variant: "destructive" as const,
                label: "Cancelled",
                icon: XCircle,
                className: "",
            }
        case OrderStatus.PAYMENT_FAILED:
        case OrderStatus.STOCK_CONFIRMATION_FAILED:
            return {
                variant: "destructive" as const,
                label: "Failed",
                icon: AlertCircle,
                className: "",
            }
        default:
            const label = (status as string).replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
            return {
                variant: "secondary" as const,
                label,
                icon: Clock,
                className: "",
            }
    }
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const config = getStatusConfig(status)
    const Icon = config.icon

    return (
        <Badge variant={config.variant} className={cn(config.className, className)}>
            <div className="flex items-center">
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </div>
        </Badge>
    )
}
