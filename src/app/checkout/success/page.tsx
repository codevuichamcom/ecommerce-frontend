"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useOrder } from "@/hooks/use-orders"
import { OrderConfirmation } from "@/components/features/checkout"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ShoppingBag } from "lucide-react"

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
                    It looks like you haven't placed an order yet. Browse our products and find something you love!
                </p>
                <Link href="/products">
                    <Button size="lg">Browse Products</Button>
                </Link>
            </div>
        )
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Success Header Skeleton */}
                    <div className="text-center mb-10">
                        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                        <Skeleton className="h-8 w-64 mx-auto mb-2" />
                        <Skeleton className="h-5 w-96 mx-auto" />
                    </div>

                    {/* Order Details Skeleton */}
                    <div className="bg-muted/30 rounded-2xl p-6 border">
                        <div className="flex justify-between mb-6">
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-px w-full mb-6" />
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !order) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    We couldn't find the order you're looking for. It may have been deleted or the link is invalid.
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

function CheckoutSuccessLoading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
                    <Skeleton className="h-8 w-64 mx-auto mb-2" />
                    <Skeleton className="h-5 w-96 mx-auto" />
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border">
                    <div className="flex justify-between mb-6">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-px w-full mb-6" />
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<CheckoutSuccessLoading />}>
            <CheckoutSuccessContent />
        </Suspense>
    )
}
