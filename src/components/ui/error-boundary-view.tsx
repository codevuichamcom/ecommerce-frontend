import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorBoundaryViewProps {
    error: Error & { digest?: string }
    reset: () => void
    title?: string
    description?: string
}

export function ErrorBoundaryView({
    error,
    reset,
    title = "Something went wrong!",
    description = "We apologize for the inconvenience. An unexpected error has occurred."
}: ErrorBoundaryViewProps) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 bg-muted/30 p-12 rounded-3xl border shadow-xl">
                <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground text-lg">
                        {description}
                    </p>
                    {process.env.NODE_ENV === 'development' && (
                        <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/10 text-xs text-destructive font-mono overflow-auto max-h-40">
                            {error.message}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button
                        onClick={() => reset()}
                        size="lg"
                        className="h-12 px-8 flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try again
                    </Button>
                    <Link href="/">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 w-full flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
