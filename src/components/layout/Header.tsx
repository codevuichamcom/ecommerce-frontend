import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/features/cart';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
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

          <Link href="/account">
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
                <span className="sr-only">Account</span>
            </Button>
          </Link>

           <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
           </Button>
        </div>
      </div>
    </header>
  );
}
