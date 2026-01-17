import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Package, ShieldCheck, Undo2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CheckoutSummaryProps {
    className?: string
}

export function CheckoutSummary({ className }: CheckoutSummaryProps) {
    const { items, totalAmount, totalItems } = useCartStore()

    if (totalItems === 0) {
        return (
            <div className={className}>
                <div className="bg-muted/30 rounded-2xl p-8 border border-dashed flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Add some items to your cart to proceed with checkout.
                    </p>
                    <Link href="/products" className="w-full">
                        <Button variant="outline" className="w-full">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className="bg-muted/30 rounded-2xl p-6 border">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Items List */}
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {items.map((item) => (
                        <div key={item.productId} className="flex gap-4">
                            <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                                <Package className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                    {item.product.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity}
                                </p>
                                <p className="text-sm font-semibold">
                                    {formatCurrency(item.product.price * item.quantity)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                        </span>
                        <span className="font-medium">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-green-600 font-medium font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Tax</span>
                        <span className="font-medium">$0.00</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(totalAmount)}</span>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        </div>
                        Secure checkout with SSL encryption
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Undo2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        30-day money back guarantee
                    </div>
                </div>
            </div>
        </div>
    )
}
