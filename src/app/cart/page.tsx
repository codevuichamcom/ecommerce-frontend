"use client"

import { useCartStore } from "@/stores/cart-store"
import { CartItem } from "@/components/features/cart/CartItem"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ShoppingBag, ChevronLeft } from "lucide-react"

export default function CartPage() {
    const { items, totalAmount, totalItems, clearCart } = useCartStore()

    if (totalItems === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our products and find something you love.
                </p>
                <Link href="/products">
                    <Button size="lg" className="px-8">
                        Browse Products
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Continue Shopping
            </Link>

            <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                        <span className="font-semibold">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
                        <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                            Clear Cart
                        </Button>
                    </div>
                    
                    <div className="divide-y">
                        {items.map((item) => (
                            <div key={item.productId} className="py-6 first:pt-0">
                                <CartItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-muted/30 rounded-2xl p-8 border sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatCurrency(totalAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-600 font-medium font-medium">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Estimated Tax</span>
                                <span className="font-medium">$0.00</span>
                            </div>
                            
                            <Separator className="my-6" />
                            
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <Link href="/checkout">
                            <Button className="w-full h-14 text-lg font-bold mt-8 shadow-lg shadow-primary/20">
                                Proceed to Checkout
                            </Button>
                        </Link>
                        
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center">🛡️</span>
                                Secure checkout with SSL encryption
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center">↩️</span>
                                30-day money back guarantee
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
