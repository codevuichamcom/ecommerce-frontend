'use client'

import { useEffect } from 'react'
import { ErrorBoundaryView } from '@/components/ui/error-boundary-view'

export default function CheckoutError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Checkout Error:', error)
    }, [error])

    return (
        <ErrorBoundaryView
            error={error}
            reset={reset}
            title="Checkout Error"
            description="We encountered an issue during the checkout process."
        />
    )
}
