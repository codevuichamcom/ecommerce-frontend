"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/features/cart';
import { MobileNav } from '@/components/layout/MobileNav';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">LuxeMarket</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
              New Arrivals
            </Link>
            <Link href="/products?category=clothing" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Clothing
            </Link>
            <Link href="/products?category=accessories" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Accessories
            </Link>
            <Link href="/orders" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Orders
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative w-full max-w-sm items-center space-x-2">
             <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
             </Button>
          </div>
          
          <CartDrawer />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                      <User className="h-4 w-4" />
                      <span className="sr-only">Account</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
