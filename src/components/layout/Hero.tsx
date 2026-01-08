'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-20 lg:pb-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Elevate Your Style with <span className="text-primary">LuxeMarket</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover a curated collection of premium accessories and apparel designed for the modern individual. Quality meets aesthetic in every piece.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn more <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}
