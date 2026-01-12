"use client"

import Image from "next/image"

interface ProductImageProps {
    name: string
}

export function ProductImage({ name }: ProductImageProps) {
    return (
        <div className="relative aspect-square w-full bg-muted rounded-xl overflow-hidden flex items-center justify-center border group">
            {/* Generic product placeholder */}
            <div className="text-8xl group-hover:scale-110 transition-transform duration-500">📦</div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </div>
    )
}
