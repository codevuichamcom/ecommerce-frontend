"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="px-1 border-b pb-4">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                <ShoppingBag className="h-6 w-6" />
                <span className="font-bold text-xl tracking-tight">LuxeMarket</span>
            </Link>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-4">
            <Link
                href="/" 
                className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setOpen(false)}
            >
                Home
            </Link>
            <Link 
                href="/products" 
                className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setOpen(false)}
            >
                New Arrivals
            </Link>
            <Link 
                href="/products?category=clothing" 
                className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setOpen(false)}
            >
                Clothing
            </Link>
            <Link 
                href="/products?category=accessories" 
                className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setOpen(false)}
            >
                Accessories
            </Link>
            <Link 
                href="/orders" 
                className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setOpen(false)}
            >
                My Orders
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
