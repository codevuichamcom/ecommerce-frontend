"use client"

import { ReactNode } from "react"

interface CheckoutLayoutProps {
    children: ReactNode
    summary: ReactNode
}

export function CheckoutLayout({ children, summary }: CheckoutLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Progress Indicator */}
                <div className="flex items-center gap-2 mb-8 text-sm font-medium">
                    <span className="text-primary hover:text-primary transition-colors cursor-default">Cart</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground font-bold">Checkout</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">Confirmation</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Complete your order by providing your information below.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Main Content (Form) */}
                    <div className="lg:col-span-3">
                        {children}
                    </div>

                    {/* Sidebar (Summary) */}
                    <div className="lg:col-span-2">
                        <div className="lg:sticky lg:top-24">
                            {summary}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
