'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Code, Radio, Zap, Cog, Building2, ArrowRight } from 'lucide-react';

const BRANCHES = [
  {
    code: 'CSE',
    name: 'Computer Science',
    description: 'Data structures, DBMS, ADA, Operating Systems, Web & AI notes.',
    icon: Code,
    color: 'from-cyan-500/20 to-teal-500/10',
    count: '240+ Notes',
  },
  {
    code: 'ISE',
    name: 'Information Science',
    description: 'Software engineering, networks, cybersecurity & database resources.',
    icon: Cpu,
    color: 'from-blue-500/20 to-indigo-500/10',
    count: '190+ Notes',
  },
  {
    code: 'ECE',
    name: 'Electronics & Comm.',
    description: 'Signals & systems, microcontrollers, VLSI design & analog circuits.',
    icon: Radio,
    color: 'from-violet-500/20 to-purple-500/10',
    count: '210+ Notes',
  },
  {
    code: 'EEE',
    name: 'Electrical & Electronics',
    description: 'Power systems, control theory, electric machines & power electronics.',
    icon: Zap,
    color: 'from-amber-500/20 to-yellow-500/10',
    count: '160+ Notes',
  },
  {
    code: 'ME',
    name: 'Mechanical Engg.',
    description: 'Thermodynamics, fluid mechanics, CAD/CAM & machine design.',
    icon: Cog,
    color: 'from-emerald-500/20 to-green-500/10',
    count: '180+ Notes',
  },
  {
    code: 'CIVIL',
    name: 'Civil Engineering',
    description: 'Structural analysis, surveying, concrete technology & hydraulics.',
    icon: Building2,
    color: 'from-rose-500/20 to-orange-500/10',
    count: '150+ Notes',
  },
];

export function BranchSelector() {
  return (
    <section className="py-12 sm:py-16 bg-[var(--bg-overlay)] border-b border-[var(--bd)]" id="branches">
      <div className="container-cf text-center space-y-10">
        
        {/* Title */}
        <div className="space-y-2.5 max-w-2xl mx-auto">
          <span className="badge badge-cyan text-[10px]">Curriculum Aligned</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-1)]">
            Choose your branch
          </h2>
          <p className="text-sm text-[var(--text-2)] max-w-lg mx-auto">
            Find notes, PYQs, and academic resources tailored for your engineering branch.
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {BRANCHES.map((b) => {
            const Icon = b.icon;
            return (
              <Link
                key={b.code}
                href={`/resources?branch=${b.code}`}
                className="card p-5 border-[var(--bd)] bg-[var(--bg-raised)] hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} border border-[var(--bd)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-overlay)] border border-[var(--bd)] text-[var(--text-2)]">
                      {b.count}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[var(--accent)] tracking-wider">{b.code}</span>
                      <span className="text-xs text-[var(--text-3)]">•</span>
                      <h3 className="text-sm font-bold text-[var(--text-1)] group-hover:text-[var(--accent)] transition-colors">
                        {b.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed mt-1 line-clamp-2">
                      {b.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--bd-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--text-2)] group-hover:text-[var(--text-1)]">
                  <span>Explore Resources</span>
                  <ArrowRight size={13} className="text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
