"use client"


import { CartItem as CartItemType } from "@/types/cart"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore()

    return (
        <div className="flex gap-4 py-4 border-b last:border-0">
            <div className="relative h-20 w-20 rounded-lg bg-muted flex items-center justify-center text-2xl overflow-hidden shrink-0">
                {/* Generic placeholder */}
                📦
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                    <span className="font-semibold text-sm">
                        {formatCurrency(item.product.price * item.quantity, item.product.currency)}
                    </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                    {formatCurrency(item.product.price, item.product.currency)} each
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.productId)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
