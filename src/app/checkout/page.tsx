"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, AlertCircle } from "lucide-react"

import { useCartStore } from "@/stores/cart-store"
import { useCreateOrder } from "@/hooks/use-orders"
import { generateIdempotencyKey } from "@/lib/utils"
import { CreateOrderCommand } from "@/types/order"
import { CheckoutLayout, CheckoutSummary, CustomerInfoForm, type CheckoutFormData } from "@/components/features/checkout"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalItems, clearCart } = useCartStore()
    const createOrderMutation = useCreateOrder()
    const [error, setError] = useState<string | null>(null)
    const [isHydrated, setIsHydrated] = useState(false)

    // Handle hydration for Zustand persisted store
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    // Redirect to cart if empty (after hydration)
    useEffect(() => {
        if (isHydrated && totalItems === 0) {
            router.push("/cart")
        }
    }, [isHydrated, totalItems, router])

    const handleSubmit = async (data: CheckoutFormData) => {
        setError(null)

        // Transform cart items to CreateOrderCommand format
        const command: CreateOrderCommand = {
            customerId: data.customerId,
            items: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        }

        // Generate idempotency key for this submission
        const idempotencyKey = generateIdempotencyKey()

        try {
            const order = await createOrderMutation.mutateAsync({
                command,
                idempotencyKey,
            })

            // Clear cart on success
            clearCart()

            // Redirect to success page
            router.push(`/checkout/success?orderId=${order.id}`)
        } catch (err) {
            console.error("Order creation failed:", err)
            setError(
                err instanceof Error 
                    ? err.message 
                    : "Failed to create order. Please try again."
            )
        }
    }

    // Show loading during hydration
    if (!isHydrated) {
        return (
            <div className="container mx-auto px-4 py-32 flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    Loading checkout...
                </div>
            </div>
        )
    }

    // This will redirect, but show empty state briefly
    if (totalItems === 0) {
        return null
    }

    return (
        <>
            <div className="container mx-auto px-4 pt-8">
                <Link 
                    href="/cart" 
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Cart
                </Link>
            </div>

            <CheckoutLayout
                summary={<CheckoutSummary />}
            >
                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-destructive">Order Failed</p>
                            <p className="text-sm text-destructive/80">{error}</p>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setError(null)}
                            className="ml-auto text-destructive hover:text-destructive"
                        >
                            Dismiss
                        </Button>
                    </div>
                )}

                <CustomerInfoForm
                    onSubmit={handleSubmit}
                    isLoading={createOrderMutation.isPending}
                    isDisabled={totalItems === 0}
                />
            </CheckoutLayout>
        </>
    )
}
