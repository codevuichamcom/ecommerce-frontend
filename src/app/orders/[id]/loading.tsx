import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrderDetailLoading() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <Skeleton className="h-8 w-32" />
            
            <div className="bg-card p-6 rounded-2xl border shadow-sm">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-12 w-32 rounded-lg" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-96 w-full rounded-2xl" />
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    )
}
