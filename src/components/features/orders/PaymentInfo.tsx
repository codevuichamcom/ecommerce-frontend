"use client"

import React from "react"

import { usePaymentByOrder } from "@/hooks/use-payments"
import { CreditCard, Loader2 } from "lucide-react"

interface PaymentInfoProps {
    orderId: string
}

export function PaymentInfo({ orderId }: PaymentInfoProps) {
    const { data: payment, isLoading, error } = usePaymentByOrder(orderId)

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading payment info...</span>
            </div>
        )
    }

    if (error || !payment) {
        return null // Silently hide if no payment info (might not be created yet)
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Details</h3>
            <div className="p-4 rounded-xl border bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-lg border">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground whitespace-nowrap">Payment Method</p>
                            <p className="font-medium">{payment.paymentMethod}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground ml-auto">Status</p>
                        <p className={`font-medium ${payment.status === 'COMPLETED' ? 'text-green-600' : 'text-amber-600'}`}>
                            {payment.status}
                        </p>
                    </div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Payment ID</span>
                    <span className="font-mono text-xs">{payment.id}</span>
                </div>
            </div>
        </div>
    )
}
