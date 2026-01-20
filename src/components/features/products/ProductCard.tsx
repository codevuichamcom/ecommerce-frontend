"use client"

import Link from "next/link"

import { Product, ProductStatus } from "@/types/product"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { AnimatedCard } from "@/components/animations/AnimatedCard"
import { AddToCartButton } from "./AddToCartButton"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
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
        <AnimatedCard>
            <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
                <Link href={`/products/${product.id}`} className="relative h-48 w-full overflow-hidden block">
                    <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
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
                    <AddToCartButton 
                        product={product} 
                        disabled={!product.available || product.status !== ProductStatus.ACTIVE}
                    />
                </CardFooter>
            </Card>
        </AnimatedCard>
    )
}
