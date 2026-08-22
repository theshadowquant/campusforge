'use client';

import React from 'react';
import { BookOpen, Download, Layers, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

const MARQUEE_ITEMS = [
  { label: '1000+ Quality Notes', icon: BookOpen },
  { label: '50K+ Downloads', icon: Download },
  { label: '6 Engineering Branches', icon: Layers },
  { label: 'SGPA & CGPA Calculator', icon: Calculator },
  { label: 'Vidyaaraa AI Assistant', icon: Sparkles },
  { label: 'VTU Curriculum Aligned', icon: CheckCircle2 },
];

export function FeatureMarquee() {
  return (
    <div className="w-full bg-[var(--bg-overlay)] border-b border-[var(--bd)] py-3 overflow-hidden select-none">
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-2)] hover:text-[var(--accent)] transition-colors"
            >
              <Icon size={14} className="text-[var(--accent)]" />
              <span>{item.label}</span>
              <span className="text-[var(--bd)] ml-6">•</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}
