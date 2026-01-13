"use client"

import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { SheetClose } from "@/components/ui/sheet"

export function CartSummary() {
    const { totalAmount, totalItems } = useCartStore()

    if (totalItems === 0) return null

    return (
        <div className="pt-6 space-y-4">
            <Separator />
            <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </div>
            
            <div className="grid gap-2 pt-2">
                <SheetClose asChild>
                    <Link href="/checkout">
                        <Button className="w-full h-12 text-base font-semibold">
                            Checkout
                        </Button>
                    </Link>
                </SheetClose>
                <SheetClose asChild>
                    <Link href="/cart">
                        <Button variant="outline" className="w-full">
                            View Cart
                        </Button>
                    </Link>
                </SheetClose>
            </div>
        </div>
    )
}
