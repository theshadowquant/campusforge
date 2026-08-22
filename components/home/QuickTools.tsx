'use client';

import Link from 'next/link';
import { Calculator, Percent, FileQuestion, BookOpen, Calendar, ArrowRight } from 'lucide-react';

const tools = [
  {
    title: 'SGPA Calculator',
    description: 'Calculate your semester GPA using your VTU grading scheme.',
    icon: <Calculator size={20} className="text-[var(--accent)]" />,
    href: '/calculators#sgpa',
    cta: 'Calculate',
  },
  {
    title: 'CGPA Calculator',
    description: 'Combine your semester GPAs to check your cumulative progress.',
    icon: <Calculator size={20} className="text-[var(--brand-violet)]" />,
    href: '/calculators#cgpa',
    cta: 'Calculate',
  },
  {
    title: 'Percentage Calculator',
    description: 'Convert your CGPA to percentage using standard VTU formula.',
    icon: <Percent size={20} className="text-[var(--accent)]" />,
    href: '/calculators#percentage',
    cta: 'Calculate',
  },
  {
    title: 'PYQ Finder',
    description: 'Access Visvesvaraya Technological University previous year question papers.',
    icon: <FileQuestion size={20} className="text-[var(--brand-violet)]" />,
    href: '/pyqs',
    cta: 'Find papers',
  },
  {
    title: 'Notes & Syllabus',
    description: 'Browse syllabus, notes, lab manuals, and study guides module-wise.',
    icon: <BookOpen size={20} className="text-[var(--accent)]" />,
    href: '/resources',
    cta: 'Browse notes',
  },
  {
    title: 'Study Planner',
    description: 'Create a custom day-by-day plan leading up to your exam date.',
    icon: <Calendar size={20} className="text-[var(--brand-violet)]" />,
    href: '/planner',
    cta: 'Create plan',
  },
];

export function QuickTools() {
  return (
    <section className="section bg-[var(--bg)]" id="quick-tools">
      <div className="container-cf text-center space-y-12">
        
        {/* Title */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-1)]">
            Everything you need. <br className="sm:hidden" />
            <span className="text-[var(--text-2)] font-medium">A few clicks away.</span>
          </h2>
          <p className="text-sm text-[var(--text-3)]">
            Get tasks done in under 30 seconds. No signing up, no complicated steps.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {tools.map((t) => (
            <div key={t.title} className="card p-6 flex flex-col justify-between h-full hover:border-[var(--accent)] transition-all">
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center border border-[var(--bd)]">
                  {t.icon}
                </div>
                {/* Text content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--text-1)]">{t.title}</h3>
                  <p className="text-xs text-[var(--text-2)] leading-relaxed h-[36px] overflow-hidden line-clamp-2">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Link CTA */}
              <div className="pt-5 border-t border-[var(--bd-subtle)] mt-5">
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-1)] hover:text-[var(--accent)] transition-colors group"
                >
                  {t.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
