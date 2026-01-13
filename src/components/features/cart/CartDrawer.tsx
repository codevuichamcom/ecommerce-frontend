"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { CartItem } from "./CartItem"
import { CartEmptyState } from "./CartEmptyState"
import { CartSummary } from "./CartSummary"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartDrawer() {
    const { items, totalItems } = useCartStore()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <Badge 
                            variant="default" 
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full ring-2 ring-background animate-in zoom-in"
                        >
                            {totalItems > 99 ? "99+" : totalItems}
                        </Badge>
                    )}
                    <span className="sr-only">Open cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
                <SheetHeader className="p-6 pb-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        Shopping Cart 
                        <span className="text-muted-foreground font-normal text-sm">
                            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-hidden">
                    {totalItems === 0 ? (
                        <CartEmptyState />
                    ) : (
                        <ScrollArea className="h-full p-6">
                            <div className="space-y-2">
                                {items.map((item) => (
                                    <CartItem key={item.productId} item={item} />
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {totalItems > 0 && (
                    <div className="p-6 bg-muted/20 border-t">
                        <CartSummary />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
