import React from "react"
import { OrderItem } from "@/types/order"
import { formatCurrency } from "@/lib/utils"
import { Package } from "lucide-react"

interface OrderItemsListProps {
    items: OrderItem[]
    totalAmount: number
}

export function OrderItemsList({ items, totalAmount }: OrderItemsListProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Items</h3>
            <div className="border rounded-xl overflow-hidden divide-y">
                {items.map((item) => (
                    <div 
                        key={item.productId} 
                        className="flex justify-between items-center p-4 bg-card"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.quantity} × {formatCurrency(item.unitPrice)}
                                </p>
                            </div>
                        </div>
                        <p className="font-semibold">
                            {formatCurrency(item.subtotal)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </div>
        </div>
    )
}
