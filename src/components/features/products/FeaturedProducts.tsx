"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductGrid, ProductGridSkeleton } from "."
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
    const { data: products, isLoading } = useProducts()

    const featuredProducts = (products || []).slice(0, 4)

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                    <p className="text-muted-foreground mt-2">
                        Handpicked selection of our most popular items.
                    </p>
                </div>
                <Link href="/products">
                    <Button variant="ghost" className="group">
                        View All Products
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <ProductGridSkeleton count={4} />
            ) : (
                <ProductGrid products={featuredProducts} />
            )}
        </section>
    )
}
