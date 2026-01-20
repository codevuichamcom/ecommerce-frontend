"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { useCartStore } from "@/stores/cart-store"
import { ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
    product: Product
    quantity?: number
    className?: string
    disabled?: boolean
}

export function AddToCartButton({ 
    product, 
    quantity = 1, 
    className,
    disabled = false
}: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [isAdded, setIsAdded] = useState(false)
    const { toast } = useToast()

    const handleAddToCart = () => {
        addItem(product, quantity)
        setIsAdded(true)
        
        toast({
            title: "Added to cart",
            description: `${quantity}x ${product.name} has been added to your cart.`,
            variant: "success", 
        })

        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <Button 
            className={cn("w-full transition-all duration-300", className)} 
            onClick={handleAddToCart}
            disabled={disabled || isAdded}
            variant={isAdded ? "secondary" : "default"}
        >
            {isAdded ? (
                <>
                    <Check className="w-4 h-4 mr-2" />
                    Added
                </>
            ) : (
                <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                </>
            )}
        </Button>
    )
}
