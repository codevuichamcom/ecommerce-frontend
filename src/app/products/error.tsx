"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function ProductsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                We encountered an error while loading the products. This might be a temporary issue.
            </p>
            <Button onClick={() => reset()} variant="outline">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
            </Button>
        </div>
    )
}
