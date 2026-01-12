"use client"

import { Hero } from '@/components/layout/Hero'
import { FeaturedProducts } from '@/components/features/products/FeaturedProducts'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      
      {/* Testimonials or other sections could go here */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🚚</div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm">Free delivery on all orders over $100. Delivered to your doorstep.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🛡️</div>
              <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">Every transaction is encrypted and secured by industry leaders.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">↩️</div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-muted-foreground text-sm">Not happy with your purchase? Return it within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
