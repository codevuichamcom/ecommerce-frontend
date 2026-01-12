"use client"

import { useInventory } from "@/hooks/use-inventory"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

interface ProductAvailabilityProps {
    productId: string
}

export function ProductAvailability({ productId }: ProductAvailabilityProps) {
    const { data: inventory, isLoading, isError } = useInventory(productId)

    if (isLoading) {
        return <Skeleton className="h-6 w-32" />
    }

    if (isError || !inventory) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>Inventory info unavailable</span>
            </div>
        )
    }

    const isAvailable = inventory.availableQuantity > 0

    return (
        <div className="flex items-center gap-2">
            {isAvailable ? (
                <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700">In Stock ({inventory.availableQuantity} available)</span>
                </>
            ) : (
                <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="font-medium text-destructive">Out of Stock</span>
                </>
            )}
            {inventory.reservedQuantity > 0 && (
                <span className="text-xs text-muted-foreground">
                    ({inventory.reservedQuantity} reserved)
                </span>
            )}
        </div>
    )
}
