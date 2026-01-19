"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useOrder } from "@/hooks/use-orders"
import { OrderConfirmation, OrderSuccessSkeleton } from "@/components/features/checkout"
import { Button } from "@/components/ui/button"
import { AlertCircle, ShoppingBag, WifiOff } from "lucide-react"

function CheckoutSuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    const { data: order, isLoading, error } = useOrder(orderId || "")

    // No order ID provided
    if (!orderId) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-4">No Order Found</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    It looks like you haven&apos;t placed an order yet. Browse our products and find something you love!
                </p>
                <Link href="/products">
                    <Button size="lg">Browse Products</Button>
                </Link>
            </div>
        )
    }

    // Loading state
    if (isLoading) {
        return <OrderSuccessSkeleton />
    }

    // Error state handling (Issue #8)
    if (error || !order) {
        const isNetworkError = error instanceof Error && (
            error.message.toLowerCase().includes('fetch') ||
            error.message.toLowerCase().includes('network') ||
            error.message.toLowerCase().includes('timeout') ||
            error.message.toLowerCase().includes('cors') ||
            error.name === 'TypeError' ||  // fetch failures
            error.name === 'AbortError'    // request aborted
        );
        
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                    {isNetworkError ? (
                        <WifiOff className="w-10 h-10 text-destructive" />
                    ) : (
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    )}
                </div>
                <h1 className="text-2xl font-bold mb-4">
                    {isNetworkError ? "Connection Error" : "Order Not Found"}
                </h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    {isNetworkError 
                        ? "We're having trouble connecting to the server. Please check your internet connection and try again."
                        : "We couldn't find the order you're looking for. It may have been deleted or the link is invalid."
                    }
                </p>
                <div className="flex gap-4">
                    <Link href="/orders">
                        <Button variant="outline">View All Orders</Button>
                    </Link>
                    <Link href="/products">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <OrderConfirmation order={order} />
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<OrderSuccessSkeleton />}>
            <CheckoutSuccessContent />
        </Suspense>
    )
}
