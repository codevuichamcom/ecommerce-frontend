import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrdersLoading() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))}
            </div>
        </div>
    )
}
