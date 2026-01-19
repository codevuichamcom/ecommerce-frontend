"use client"

import React from "react"
import Link from "next/link"
import { Order } from "@/types/order"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { ChevronRight, Calendar, ShoppingBag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface OrderCardProps {
    order: Order
}

export function OrderCard({ order }: OrderCardProps) {
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return (
        <Link href={`/orders/${order.id}`}>
            <Card className="hover:bg-muted/50 transition-colors group">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{orderDate}</span>
                            </div>
                            <h3 className="font-mono font-bold tracking-tight text-lg group-hover:text-primary transition-colors">
                                #{order.id.slice(0, 8)}...
                            </h3>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="flex items-center gap-1">
                                    <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                                    <span>{order.totalItems} {order.totalItems === 1 ? 'item' : 'items'}</span>
                                </div>
                                <span className="text-foreground">{formatCurrency(order.totalAmount)}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-4">
                            <OrderStatusBadge status={order.status} />
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
