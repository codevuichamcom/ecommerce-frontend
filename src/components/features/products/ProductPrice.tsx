"use client"

import { formatCurrency } from "@/lib/utils"

interface ProductPriceProps {
    price: number
    currency: string
    className?: string
}

export function ProductPrice({ price, currency, className = "" }: ProductPriceProps) {
    return (
        <div className={`flex items-baseline gap-2 ${className}`}>
            <span className="text-3xl font-bold text-primary">
                {formatCurrency(price, currency)}
            </span>
            {/* Optional: Add original price if there's a discount */}
        </div>
    )
}
