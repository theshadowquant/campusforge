'use client';

import Link from 'next/link';
import { ArrowRight, Code2, Briefcase, GraduationCap } from 'lucide-react';
import { placementCategories } from '@/data/placement';

export function PlacementPreview() {
  // Show first 3 categories
  const categories = placementCategories.slice(0, 3);

  return (
    <section className="section bg-[var(--bg-overlay)] border-t border-[var(--bd)]">
      <div className="container-cf space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-1)]">
              Placement Preparation
            </h2>
            <p className="text-xs text-[var(--text-3)]">
              Skip the expensive courses. Access free, industry-standard interview preparation tools.
            </p>
          </div>
          <Link href="/placement" className="btn btn-secondary btn-sm group">
            Go to Placement Hub
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c) => {
            const Icon = c.id === 'dsa' ? Code2 : c.id === 'aptitude' ? GraduationCap : Briefcase;
            return (
              <div key={c.id} className="card p-5 flex flex-col justify-between hover:border-[var(--brand-violet)] transition-all">
                <div className="space-y-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--bd)] flex items-center justify-center text-[var(--brand-violet)]">
                    <Icon size={16} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-[var(--text-1)]">{c.name}</h3>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed h-[36px] line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--bd-subtle)] mt-5">
                  <ul className="space-y-1.5 list-none p-0 m-0">
                    {c.resources.slice(0, 2).map((r) => (
                      <li key={r.id} className="text-[11px] text-[var(--text-2)] flex items-center justify-between">
                        <span className="truncate max-w-[150px] font-medium">{r.title}</span>
                        <span className="text-[9px] uppercase tracking-wider text-[var(--text-3)]">{r.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
