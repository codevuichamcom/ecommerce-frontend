"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useState, useEffect, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function ProductSearch() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q')?.toString() || '')
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            if (searchTerm) {
                params.set('q', searchTerm)
            } else {
                params.delete('q')
            }
            
            startTransition(() => {
                replace(`${pathname}?${params.toString()}`)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, pathname, replace, searchParams])

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search products..."
                className="pl-9 pr-9"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                </button>
            )}
            {isPending && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    )
}
