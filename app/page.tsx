import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { QuickTools } from '@/components/home/QuickTools';
import { WhyCampusForge } from '@/components/home/WhyCampusForge';
import { PopularResources } from '@/components/home/PopularResources';
import { PlacementPreview } from '@/components/home/PlacementPreview';
import { ChevronRight, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO */}
      <Hero />

      {/* 2. QUICK TOOLS */}
      <QuickTools />

      {/* 3. WHY CAMPUSFORGE */}
      <WhyCampusForge />

      {/* 4. POPULAR RESOURCES */}
      <PopularResources />

      {/* 5. PLACEMENT PREVIEW */}
      <PlacementPreview />

      {/* 6. FINAL CTA */}
      <section className="section bg-[var(--bg)] border-t border-[var(--bd)]">
        <div className="container-cf max-w-4xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] flex items-center justify-center mx-auto text-[var(--accent)]">
            <GraduationCap size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-1)]">
              Ready to simplify your college prep?
            </h2>
            <p className="text-sm text-[var(--text-2)] max-w-md mx-auto">
              Get direct access to notes, questions papers, grade calculations, and study strategies without the ads or registration.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link href="/resources" className="btn btn-primary btn-lg flex items-center">
              Explore Resources
              <ChevronRight size={18} />
            </Link>
            <Link href="/calculators" className="btn btn-secondary btn-lg">
              Try Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
