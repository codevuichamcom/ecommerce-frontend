'use client'

import { useEffect } from 'react'
import { ErrorBoundaryView } from '@/components/ui/error-boundary-view'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error)
  }, [error])

  return <ErrorBoundaryView error={error} reset={reset} />
}
