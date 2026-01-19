"use client"

import React, { useState, useEffect } from "react"
import { customerUtils } from "@/lib/customer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Save, Info, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CustomerIdInputProps {
    onSettled?: () => void
}

export function CustomerIdInput({ onSettled }: CustomerIdInputProps) {
    const [currentId, setCurrentId] = useState<string>("")
    const [inputId, setInputId] = useState<string>("")
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const id = customerUtils.getCustomerId()
        if (id) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentId(id)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInputId(id)
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsEditing(true)
        }
    }, [])

    const handleSave = () => {
        if (inputId.trim()) {
            customerUtils.setCustomerId(inputId.trim())
            setCurrentId(inputId.trim())
            setIsEditing(false)
            onSettled?.()
        }
    }

    const handleChange = () => {
        setIsEditing(true)
    }

    return (
        <div className="max-w-md mx-auto space-y-6">
            <Alert className="bg-muted/50 border-primary/20">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle>Demo Mode Info</AlertTitle>
                <AlertDescription className="text-sm">
                    Since authentication is not yet implemented, please enter a **Customer ID** to manage your orders.
                </AlertDescription>
            </Alert>

            <div className="bg-card p-6 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Customer Identity</h3>
                        <p className="text-sm text-muted-foreground">Manage orders for this ID</p>
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Customer ID</label>
                            <Input 
                                placeholder="e.g. customer-123" 
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <Button className="w-full h-11" onClick={handleSave} disabled={!inputId.trim()}>
                            <Save className="w-4 h-4 mr-2" />
                            Use this Identity
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-dashed">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Current ID</p>
                            <p className="font-mono font-medium">{currentId}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleChange}>
                            <RefreshCw className="w-3.5 h-3.5 mr-2" />
                            Change
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
