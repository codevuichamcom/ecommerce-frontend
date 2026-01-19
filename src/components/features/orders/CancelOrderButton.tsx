"use client"

import React, { useState } from "react"
import { Order, OrderStatus } from "@/types/order"
import { useCancelOrder } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { XCircle, Loader2 } from "lucide-react"

interface CancelOrderButtonProps {
    order: Order
}

export function CancelOrderButton({ order }: CancelOrderButtonProps) {
    const [open, setOpen] = useState(false)
    const { mutate: cancelOrder, isPending } = useCancelOrder()

    // Order can only be cancelled if it's in early stages
    const canCancel = order.status === OrderStatus.PENDING || 
                     order.status === OrderStatus.CREATED || 
                     order.status === OrderStatus.INVENTORY_RESERVED

    if (!canCancel) return null

    const handleCancel = () => {
        cancelOrder({ id: order.id, reason: 'Cancelled by customer' }, {
            onSuccess: () => setOpen(false)
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Order
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to cancel this order? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep Order</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={(e) => {
                            e.preventDefault()
                            handleCancel()
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            'Confirm Cancellation'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
