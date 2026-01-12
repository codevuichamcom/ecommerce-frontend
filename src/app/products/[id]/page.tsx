"use client"

import { useParams } from "next/navigation"
import { useProduct } from "@/hooks/use-products"
import { ProductDetail } from "@/components/features/products"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ChevronLeft, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
    const params = useParams()
    const id = params.id as string
    
    const { data: product, isLoading, isError, error, refetch } = useProduct(id)

    if (isLoading) {
// ... (lines skipped)
    }

    if (isError || !product) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h1 className="text-2xl font-bold mb-2">Product not found</h1>
                <p className="text-muted-foreground mb-6 max-w-md">
                    {error instanceof Error ? error.message : "We couldn't find the product you're looking for."}
                </p>
                <div className="flex gap-4">
                    <Link href="/products">
                        <Button variant="outline">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Products
                        </Button>
                    </Link>
                    <Button onClick={() => refetch()} variant="secondary">
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="mb-8">
                <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Catalog
                </Link>
            </nav>
            
            <ProductDetail product={product} />
        </div>
    )
}
