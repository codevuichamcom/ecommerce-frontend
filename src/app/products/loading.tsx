import { ProductGridSkeleton } from "@/components/features/products"

export default function ProductsLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <div className="h-9 w-48 bg-muted animate-pulse rounded mb-2" />
                <div className="h-5 w-64 bg-muted animate-pulse rounded" />
            </header>
            <ProductGridSkeleton count={8} />
        </div>
    )
}
