import React from "react"
import { Order } from "@/types/order"
import { OrderCard } from "./OrderCard"

interface OrderListProps {
    orders: Order[]
}

export function OrderList({ orders }: OrderListProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed">
                <p className="text-muted-foreground">No orders found.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}
