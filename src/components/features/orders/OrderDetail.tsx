"use client"

import React from "react"

import { Order } from "@/types/order"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { OrderItemsList } from "./OrderItemsList"
import { OrderTimeline } from "./OrderTimeline"
import { PaymentInfo } from "./PaymentInfo"
import { CancelOrderButton } from "./CancelOrderButton"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"

interface OrderDetailProps {
    order: Order
}

export function OrderDetail({ order }: OrderDetailProps) {
    const orderDate = new Date(order.createdAt).toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
    })

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-2xl border shadow-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <OrderStatusBadge status={order.status} className="text-sm px-3 py-1" />
                        <span className="text-sm text-muted-foreground">Order placed on {orderDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">Order #{order.id}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>Customer ID: {order.customerId}</span>
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-auto">
                    <CancelOrderButton order={order} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Items and Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card p-6 rounded-2xl border shadow-sm">
                        <OrderItemsList items={order.items} totalAmount={order.totalAmount} />
                    </div>

                    <div className="bg-card p-6 rounded-2xl border shadow-sm">
                        <OrderTimeline 
                            status={order.status} 
                            createdAt={order.createdAt} 
                            updatedAt={order.updatedAt} 
                        />
                    </div>
                </div>

                {/* Right Column: Payment and Additional Info */}
                <div className="space-y-8">
                    <div className="bg-card p-6 rounded-2xl border shadow-sm h-fit">
                        <PaymentInfo orderId={order.id} />
                    </div>

                    <div className="bg-card p-6 rounded-2xl border shadow-sm h-fit space-y-4">
                        <h3 className="font-semibold text-lg">Need Help?</h3>
                        <p className="text-sm text-muted-foreground">
                            If you have any questions about your order, please contact our 24/7 support team.
                        </p>
                        <Separator />
                        <p className="text-xs text-muted-foreground">
                            Return Policy: Items can be returned within 30 days of delivery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
