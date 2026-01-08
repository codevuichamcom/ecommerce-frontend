import { Hero } from '@/components/layout/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Additional sections will replace this later */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Placeholders for categories */}
             <div className="aspect-[4/5] rounded-xl bg-muted/50 p-6 flex items-end">
                <span className="font-semibold text-lg">Clothing</span>
             </div>
             <div className="aspect-[4/5] rounded-xl bg-muted/50 p-6 flex items-end">
                <span className="font-semibold text-lg">Accessories</span>
             </div>
             <div className="aspect-[4/5] rounded-xl bg-muted/50 p-6 flex items-end">
                <span className="font-semibold text-lg">New Arrivals</span>
             </div>
        </div>
      </section>
    </>
  );
}
