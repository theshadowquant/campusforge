'use client';

import { Check, ShieldCheck, Zap, Heart } from 'lucide-react';

const reasons = [
  {
    title: 'Study smarter.',
    desc: 'Generate simple, day-by-day revision schedules leading to exam dates. Focus on coverage, not cramming.',
    icon: <Zap size={18} className="text-[var(--accent)]" />,
  },
  {
    title: 'Find resources faster.',
    desc: 'Get to your question papers, syllabus, or lab manual in under 10 seconds. Clean filters, zero redirects.',
    icon: <ShieldCheck size={18} className="text-[var(--accent)]" />,
  },
  {
    title: 'Know where you stand.',
    desc: 'Use SGPA/CGPA calculators customized for VTU grading rules to track targets and see exactly what grades you need.',
    icon: <Check size={18} className="text-[var(--accent)]" />,
  },
  {
    title: 'Prepare with purpose.',
    desc: 'Jump straight into curated placement roadmaps, DSA prep sheets, and core CS concept briefs designed to get you hired.',
    icon: <Heart size={18} className="text-[var(--accent)]" />,
  },
];

export function WhyCampusForge() {
  return (
    <section className="section bg-[var(--bg-overlay)] border-y border-[var(--bd)]">
      <div className="container-cf max-w-4xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-1)]">
            A utility platform, <span className="text-[var(--text-2)] font-medium">not a marketing pitch.</span>
          </h2>
          <p className="text-sm text-[var(--text-3)] max-w-md mx-auto">
            We don&apos;t use keywords like &ldquo;AI-powered next-generation education ecosystem.&rdquo; We just build tools that save you time.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--bg-raised)] border border-[var(--bd)] flex items-center justify-center">
                {r.icon}
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--text-1)]">{r.title}</h3>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
