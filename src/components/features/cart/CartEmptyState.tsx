"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import Link from "next/link"

export function CartEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8 max-w-[250px]">
                Looks like you haven't added anything to your cart yet.
            </p>
            <SheetClose asChild>
                <Link href="/products">
                    <Button>Start Shopping</Button>
                </Link>
            </SheetClose>
        </div>
    )
}
