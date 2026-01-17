"use client"

import { Order, OrderStatus } from "@/types/order"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { CheckCircle2, Package, Clock } from "lucide-react"

interface OrderConfirmationProps {
    order: Order
}

function getStatusConfig(status: OrderStatus) {
    switch (status) {
        case OrderStatus.COMPLETED:
            return {
                variant: "default" as const,
                label: "Completed",
                icon: CheckCircle2,
                className: "bg-green-600 hover:bg-green-600",
            }
        case OrderStatus.PENDING:
        case OrderStatus.CREATED:
            return {
                variant: "secondary" as const,
                label: "Processing",
                icon: Clock,
                className: "bg-amber-500 hover:bg-amber-500 text-white",
            }
        case OrderStatus.INVENTORY_RESERVED:
            return {
                variant: "secondary" as const,
                label: "Reserved",
                icon: Package,
                className: "bg-blue-500 hover:bg-blue-500 text-white",
            }
        case OrderStatus.PAYMENT_COMPLETED:
            return {
                variant: "default" as const,
                label: "Payment Complete",
                icon: CheckCircle2,
                className: "bg-green-500 hover:bg-green-500",
            }
        case OrderStatus.CANCELLED:
            return {
                variant: "destructive" as const,
                label: "Cancelled",
                icon: Clock,
                className: "",
            }
        case OrderStatus.PAYMENT_FAILED:
        case OrderStatus.STOCK_CONFIRMATION_FAILED:
            return {
                variant: "destructive" as const,
                label: "Failed",
                icon: Clock,
                className: "",
            }
        default:
            return {
                variant: "secondary" as const,
                label: status,
                icon: Clock,
                className: "",
            }
    }
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
    const statusConfig = getStatusConfig(order.status)
    const StatusIcon = statusConfig.icon

    return (
        <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground text-lg">
                    Thank you for your order. We'll send you a confirmation email shortly.
                </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-muted/30 rounded-2xl p-6 border mb-8">
                {/* Order Info Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-mono font-semibold">{order.id}</p>
                    </div>
                    <Badge className={statusConfig.className}>
                        <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                        {statusConfig.label}
                    </Badge>
                </div>

                <Separator className="mb-6" />

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                    <h3 className="font-semibold">Order Items ({order.totalItems})</h3>
                    <div className="space-y-3">
                        {order.items.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex justify-between items-center py-3 border-b last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                        <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.productName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold">
                                    {formatCurrency(item.subtotal)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Order Summary */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(order.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(order.totalAmount)}</span>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">Customer ID</p>
                    <p className="font-medium">{order.customerId}</p>
                </div>

                {/* Timestamps */}
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <p>
                        Order placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/orders" className="flex-1">
                    <Button variant="outline" className="w-full h-12">
                        View All Orders
                    </Button>
                </Link>
                <Link href="/products" className="flex-1">
                    <Button className="w-full h-12">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    )
}
