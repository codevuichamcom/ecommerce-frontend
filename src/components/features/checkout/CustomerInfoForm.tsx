"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkoutFormSchema, type CheckoutFormData } from "./CheckoutFormSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, User } from "lucide-react"

interface CustomerInfoFormProps {
    onSubmit: (data: CheckoutFormData) => void
    isLoading?: boolean
    isDisabled?: boolean
}

export function CustomerInfoForm({ onSubmit, isLoading, isDisabled }: CustomerInfoFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            customerId: "",
        },
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-muted/30 rounded-2xl p-6 border">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Customer Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your customer ID to continue
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="customerId" className="text-sm font-medium">
                            Customer ID <span className="text-destructive">*</span>
                        </label>
                        <Input
                            id="customerId"
                            placeholder="Enter your customer ID (e.g., customer-123)"
                            {...register("customerId")}
                            className={errors.customerId ? "border-destructive" : ""}
                            disabled={isLoading}
                        />
                        {errors.customerId && (
                            <p className="text-sm text-destructive">
                                {errors.customerId.message}
                            </p>
                        )}
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            <strong>Demo Mode:</strong> In a real application, you would be logged in 
                            and your customer ID would be automatically retrieved. For this demo, 
                            please enter any valid ID.
                        </p>
                    </div>
                </div>
            </div>

            <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20"
                disabled={isLoading || isDisabled}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Order...
                    </>
                ) : (
                    "Place Order"
                )}
            </Button>
        </form>
    )
}
