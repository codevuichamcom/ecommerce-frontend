"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductGrid, ProductGridSkeleton, ProductSearch } from "@/components/features/products"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    
    const { data: products, isLoading, isError, error, refetch } = useProducts(query ? { q: query } : undefined)
// ... (lines skipped)
    if (isError) {
// ... (lines skipped)
    }

    const productsList = products || []

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Our Products</h1>
                    <p className="text-muted-foreground">Browse our high-quality selection of items.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <ProductSearch />
                    <div className="text-sm font-medium whitespace-nowrap">
                        Showing {productsList.length} products
                    </div>
                </div>
            </header>
            
            <ProductGrid products={productsList} />
        </div>
    )
}
