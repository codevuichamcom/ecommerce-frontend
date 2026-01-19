"use client"

import React, { use } from "react"
import { useOrder } from "@/hooks/use-orders"
import { OrderDetail } from "@/components/features/orders"
import { Button } from "@/components/ui/button"
import { ChevronLeft, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface OrderDetailPageProps {
    params: Promise<{ id: string }>
}

export default function OrderIdPage({ params }: OrderDetailPageProps) {
    const { id } = use(params)
    const { data: order, isLoading, error } = useOrder(id)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/orders">
                    <Button variant="ghost" size="sm" className="-ml-2">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Orders
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Fetching order details...</p>
                </div>
            ) : error || !order ? (
                <div className="max-w-md mx-auto text-center py-20 space-y-6">
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Order Not Found</h2>
                        <p className="text-muted-foreground">
                            The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
                        </p>
                    </div>
                    <Link href="/orders">
                        <Button>Back to My Orders</Button>
                    </Link>
                </div>
            ) : (
                <OrderDetail order={order} />
            )}
        </div>
    )
}
