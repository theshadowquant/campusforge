'use client';

import { useState } from 'react';
import { Sparkles, Code2, Brain, Cpu, Database, Terminal, Globe, FileText, Users, ExternalLink, ShieldCheck } from 'lucide-react';
import { placementCategories } from '@/data/placement';

const iconMap: Record<string, any> = {
  Code2: <Code2 size={18} className="text-[var(--brand-violet)]" />,
  Brain: <Brain size={18} className="text-[var(--accent)]" />,
  Cpu: <Cpu size={18} className="text-[var(--brand-violet)]" />,
  Database: <Database size={18} className="text-[var(--accent)]" />,
  Terminal: <Terminal size={18} className="text-[var(--brand-violet)]" />,
  Globe: <Globe size={18} className="text-[var(--accent)]" />,
  FileText: <FileText size={18} className="text-[var(--brand-violet)]" />,
  Users: <Users size={18} className="text-[var(--accent)]" />,
};

export default function PlacementPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filtered categories
  const filtered = activeCategory === 'all'
    ? placementCategories
    : placementCategories.filter((c) => c.id === activeCategory);

  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf max-w-5xl space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] text-xs text-[var(--text-2)] font-semibold">
            <Sparkles size={12} className="text-[var(--accent)] animate-pulse" />
            Curated Quality Resources
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            Placement Prep Hub
          </h1>
          <p className="text-sm text-[var(--text-2)] max-w-lg mx-auto">
            Get directly to high-quality DSA sheets, core computer science concepts, and interactive practicing platforms without the noise.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto border-b border-[var(--bd)] pb-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`btn btn-sm px-3.5 py-1.5 rounded-full border text-[11px] font-bold ${
              activeCategory === 'all'
                ? 'bg-[var(--accent)] border-[var(--accent)] text-[#0F1729]'
                : 'border-[var(--bd)] hover:bg-[var(--bg-overlay)] text-[var(--text-2)]'
            }`}
          >
            All Material
          </button>
          
          {placementCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`btn btn-sm px-3.5 py-1.5 rounded-full border text-[11px] font-bold ${
                activeCategory === c.id
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-[#0F1729]'
                  : 'border-[var(--bd)] hover:bg-[var(--bg-overlay)] text-[var(--text-2)]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Categories / Materials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((category) => (
            <div key={category.id} className="card p-6 flex flex-col justify-between hover:border-[var(--brand-violet)] transition-all fade-in">
              <div className="space-y-4">
                
                {/* Title */}
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center flex-shrink-0">
                    {iconMap[category.icon]}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-[var(--text-1)] leading-tight">{category.name}</h2>
                    <span className="text-[10px] text-[var(--text-3)]">
                      {category.resources.length} vetted resources
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-[var(--text-2)] leading-relaxed h-[36px] line-clamp-2">
                  {category.description}
                </p>

                {/* Resource List Items */}
                <div className="space-y-3 pt-3 border-t border-[var(--bd-subtle)]">
                  {category.resources.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3 rounded-lg border border-[var(--bd-subtle)] bg-[var(--bg-overlay)] hover:border-[var(--accent)] hover:bg-[var(--bg-raised)] transition-all"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-[var(--text-1)] group-hover:text-[var(--accent)] transition-colors block">
                            {res.title}
                          </span>
                          <p className="text-[10px] text-[var(--text-2)] leading-relaxed line-clamp-2">
                            {res.description}
                          </p>
                        </div>
                        <ExternalLink size={13} className="text-[var(--text-3)] group-hover:text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bd)] text-[var(--text-2)]">
                          {res.type}
                        </span>
                        <span className="text-[8px] text-[var(--text-3)] flex items-center gap-0.5">
                          <ShieldCheck size={10} className="text-green-500" />
                          Vetted Free Link
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
