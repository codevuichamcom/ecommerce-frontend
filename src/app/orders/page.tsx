"use client"

import React, { useState, useEffect } from "react"
import { useOrders } from "@/hooks/use-orders"
import { customerUtils } from "@/lib/customer"
import { OrderList, CustomerIdInput } from "@/components/features/orders"
import { Button } from "@/components/ui/button"
import { ShoppingBag, RefreshCw, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
    const [customerId, setCustomerId] = useState<string | null>(null)
    const [isIdSettled, setIsIdSettled] = useState(false)

    useEffect(() => {
        const id = customerUtils.getCustomerId()
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCustomerId(id)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsIdSettled(!!id)
    }, [])

    const { data: orders, isLoading, error, refetch } = useOrders(customerId || "")

    if (!isIdSettled) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                    <p className="text-muted-foreground">Identify yourself to see your order history</p>
                </div>
                <CustomerIdInput onSettled={() => {
                    const id = customerUtils.getCustomerId()
                    setCustomerId(id)
                    setIsIdSettled(true)
                }} />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        Viewing history for <span className="font-mono font-medium text-foreground">{customerId}</span>
                        <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-xs" 
                            onClick={() => setIsIdSettled(false)}
                        >
                            Change Identity
                        </Button>
                    </p>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Loading your orders...</p>
                </div>
            ) : error ? (
                <div className="max-w-md mx-auto text-center py-20 space-y-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <h2 className="text-xl font-semibold">Unable to load orders</h2>
                    <p className="text-muted-foreground">
                        We encountered an error while fetching your order history. This might be a temporary issue.
                    </p>
                    <Button onClick={() => refetch()}>Try Again</Button>
                </div>
            ) : orders && orders.length > 0 ? (
                <OrderList orders={orders} />
            ) : (
                <div className="text-center py-20 space-y-6">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">No orders found</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            It looks like you haven&apos;t placed any orders yet using this Customer ID.
                        </p>
                    </div>
                    <Link href="/products">
                        <Button size="lg">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
