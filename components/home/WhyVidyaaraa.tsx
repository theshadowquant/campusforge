'use client';

import React from 'react';
import { Zap, Layers, GraduationCap, Bot, Sparkles } from 'lucide-react';

const REASONS = [
  {
    icon: Zap,
    title: 'Built for speed',
    description: 'Get what you need in seconds without unnecessary steps or forced registration.',
  },
  {
    icon: Layers,
    title: 'Everything in one place',
    description: 'Notes, previous year papers, SGPA/CGPA calculators, and AI study assistance together.',
  },
  {
    icon: GraduationCap,
    title: 'Built around engineering students',
    description: 'Tailored specifically to VTU and engineering course schemes, modules, and grading rules.',
  },
  {
    icon: Bot,
    title: 'AI when you need it',
    description: 'Vidyaaraa AI provides instant step-by-step solutions, revision summaries, and exam tips.',
  },
  {
    icon: Sparkles,
    title: 'Free academic tools',
    description: 'Core student tools, formula calculators, and resource finders remain 100% free and open.',
  },
];

export function WhyVidyaaraa() {
  return (
    <section className="py-12 sm:py-16 bg-[var(--bg)] border-b border-[var(--bd)]" id="why-vidyaaraa">
      <div className="container-cf text-center space-y-10">
        
        {/* Title */}
        <div className="space-y-2.5 max-w-2xl mx-auto">
          <span className="badge badge-cyan text-[10px]">Student-First Platform</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-1)]">
            Why Vidyaaraa?
          </h2>
          <p className="text-sm text-[var(--text-2)] max-w-lg mx-auto">
            Designed around real college workflows to help engineering students save time and score better.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
          {REASONS.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="card p-4 border-[var(--bd)] bg-[var(--bg-raised)] hover:border-[var(--accent)] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] flex items-center justify-center text-[var(--accent)]">
                    <Icon size={16} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[var(--text-1)]">{r.title}</h3>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
