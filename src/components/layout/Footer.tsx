import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/story">Our Story</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Help</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Social</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LuxeMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
