"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
    quantity: number
    onChange: (quantity: number) => void
    max?: number
    disabled?: boolean
}

export function QuantitySelector({ 
    quantity, 
    onChange, 
    max = 99, 
    disabled = false 
}: QuantitySelectorProps) {
    const increment = () => {
        if (quantity < max) {
            onChange(quantity + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            onChange(quantity - 1)
        }
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-none"
                onClick={decrement}
                disabled={disabled || quantity <= 1}
            >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="h-10 w-12 flex items-center justify-center border-y bg-background font-medium text-sm">
                {quantity}
            </div>
            <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-none"
                onClick={increment}
                disabled={disabled || quantity >= max}
            >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
            </Button>
        </div>
    )
}
