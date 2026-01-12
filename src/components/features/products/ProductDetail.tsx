"use client"

import { useState } from "react"
import { Product, ProductStatus } from "@/types/product"
import { ProductImage } from "./ProductImage"
import { ProductPrice } from "./ProductPrice"
import { ProductAvailability } from "./ProductAvailability"
import { AddToCartButton } from "./AddToCartButton"
import { QuantitySelector } from "./QuantitySelector"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProductDetailProps {
    product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1)

    const isAvailable = product.status === ProductStatus.ACTIVE && product.available

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
            {/* Product Image */}
            <ProductImage name={product.name} />

            {/* Product Info */}
            <div className="flex flex-col">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="uppercase tracking-wider">
                            SKU: {product.sku}
                        </Badge>
                        <Badge variant={product.status === ProductStatus.ACTIVE ? "success" : "secondary"}>
                            {product.status}
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <ProductPrice price={product.price} currency={product.currency} className="mb-6" />
                    
                    <Separator className="my-6" />
                    
                    <div className="prose prose-sm max-w-none text-muted-foreground mb-8">
                        <h3 className="text-foreground font-semibold mb-2">Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <Separator className="my-6" />
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                Availability
                            </h3>
                            <ProductAvailability productId={product.id} />
                        </div>

                        {isAvailable && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                    Quantity
                                </h3>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <QuantitySelector 
                                        quantity={quantity} 
                                        onChange={setQuantity} 
                                        disabled={!isAvailable}
                                    />
                                    <AddToCartButton 
                                        product={product} 
                                        quantity={quantity} 
                                        disabled={!isAvailable}
                                        className="h-12 text-base"
                                    />
                                </div>
                            </div>
                        )}
                        
                        {!isAvailable && (
                            <div className="p-4 bg-muted/50 rounded-lg border border-dashed text-center">
                                <p className="font-medium text-muted-foreground">
                                    This product is currently unavailable for purchase.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t text-xs text-muted-foreground">
                    <p>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}
