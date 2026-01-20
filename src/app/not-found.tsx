import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, ShoppingBag, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      {/* 404 Illustration placeholder */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-muted/20 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-primary/10 rounded-full animate-pulse flex items-center justify-center">
             <Search className="w-16 h-16 text-primary" />
          </div>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <h2 className="text-4xl font-bold tracking-tight">Oops! Page not found</h2>
        <p className="text-muted-foreground text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Link href="/products" className="w-full">
            <Button className="w-full h-12 flex items-center gap-2" variant="default">
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button className="w-full h-12 flex items-center gap-2" variant="outline">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        <div className="pt-8">
            <Link href="javascript:history.back()" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back to Previous Page
            </Link>
        </div>
      </div>
    </div>
  )
}
