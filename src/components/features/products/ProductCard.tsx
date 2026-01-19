"use client"

import Link from "next/link"

import { Product, ProductStatus } from "@/types/product"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)

    const getStatusVariant = (status: ProductStatus) => {
        switch (status) {
            case ProductStatus.ACTIVE:
                return "success"
            case ProductStatus.DRAFT:
                return "secondary"
            case ProductStatus.DISCONTINUED:
                return "destructive"
            default:
                return "outline"
        }
    }

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/products/${product.id}`} className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                    {/* In a real app, product would have an imageUrl. For now, we use a placeholder or generic image */}
                    <div className="text-4xl">📦</div>
                </div>
                <Badge 
                    variant={getStatusVariant(product.status)} 
                    className="absolute top-2 right-2 z-10"
                >
                    {product.status}
                </Badge>
            </Link>
            
            <CardHeader className="p-4 pb-2">
                <Link href={`/products/${product.id}`} className="hover:underline">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                </p>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                        {formatCurrency(product.price, product.currency)}
                    </span>
                </div>
            </CardContent>
            
            <CardFooter className="p-4 mt-auto">
                <Button 
                    className="w-full" 
                    onClick={() => addItem(product)}
                    disabled={!product.available || product.status !== ProductStatus.ACTIVE}
                >
                    {product.available ? "Add to Cart" : "Out of Stock"}
                </Button>
            </CardFooter>
        </Card>
    )
}
