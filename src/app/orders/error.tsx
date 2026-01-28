'use client'

import { useEffect } from 'react'
import { ErrorBoundaryView } from '@/components/ui/error-boundary-view'

export default function OrdersError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Orders Error:', error)
    }, [error])

    return (
        <ErrorBoundaryView
            error={error}
            reset={reset}
            title="Order History Error"
            description="We couldn't load your order history. Please try again."
        />
    )
}
