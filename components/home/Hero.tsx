'use client';

import Link from 'next/link';
import { Sparkles, Calendar, BookOpen, GraduationCap, ChevronRight, CheckCircle2, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-gradient-to-b from-[var(--bg)] via-[var(--bg-overlay)] to-[var(--bg)] overflow-hidden border-b border-[var(--bd)]">
      <div className="container-cf grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left column - Text Content */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-5 text-left max-w-xl">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.15)] text-[var(--accent)] font-semibold text-xs uppercase tracking-wider">
            <Sparkles size={13} className="text-[var(--accent)] animate-pulse" />
            <span>Built for students. Designed for action.</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-1)] leading-[1.15]">
            College, without <br className="hidden sm:inline" />
            the <span className="text-gradient">chaos.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[var(--text-2)] leading-relaxed">
            Notes, previous-year papers, calculators, study tools and AI — organized in one place.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-3.5 w-full sm:w-auto pt-1">
            <Link href="/resources" className="btn btn-primary btn-lg w-full sm:w-auto flex items-center justify-center">
              Explore Vidyaaraa
              <ChevronRight size={18} />
            </Link>
            <Link href="/calculators" className="btn btn-secondary btn-lg w-full sm:w-auto flex items-center justify-center">
              Calculate CGPA
            </Link>
          </div>
        </div>

        {/* Right column - Mock Dashboard Product Preview */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-2xl p-5 card border-[var(--bd)] bg-[var(--bg-raised)] shadow-2xl flex flex-col justify-between overflow-hidden group">
            
            {/* Header of Mock Dashboard */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--bd)]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="text-[11px] text-[var(--text-3)] font-mono ml-2">vidyaaraa.app/dashboard</span>
              </div>
              <div className="badge badge-cyan text-[10px] font-mono">
                VTU · 4th Sem CSE
              </div>
            </div>

            {/* Main content of Mock Dashboard */}
            <div className="grid grid-cols-2 gap-4 my-auto pt-3">
              
              {/* Card 1: SGPA & CGPA stats */}
              <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-3)]">Academic Status</span>
                  <GraduationCap size={16} className="text-[var(--accent)]" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold text-[var(--text-1)]">8.24 <span className="text-xs font-normal text-[var(--text-2)]">CGPA</span></div>
                  <p className="text-[10px] text-[var(--text-2)] mt-1">S3 SGPA: <span className="font-semibold">8.50</span></p>
                </div>
              </div>

              {/* Card 2: Upcoming Exam */}
              <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-3)]">Upcoming Exam</span>
                  <Calendar size={16} className="text-amber-500" />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-bold text-[var(--text-1)] truncate">DBMS SEE Exam</div>
                  <p className="text-[10px] text-red-500 font-semibold mt-1">In 5 Days · June 14</p>
                </div>
              </div>

              {/* Card 3: Study Progress */}
              <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-3)]">Study Progress</span>
                  <span className="text-xs font-semibold text-[var(--accent)]">70% Done</span>
                </div>
                <div className="w-full bg-[var(--bd)] h-2 rounded-full overflow-hidden">
                  <div className="bg-[var(--accent)] h-full rounded-full w-[70%]" />
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] text-[var(--text-2)]">
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[var(--accent)]" /> 7/10 topics completed</span>
                  <span className="font-semibold text-[var(--text-1)]">ADA, DBMS, Java</span>
                </div>
              </div>

            </div>

            {/* Quick Tools Panel */}
            <div className="p-3 border-t border-[var(--bd)] flex items-center justify-between bg-[var(--bg-overlay)] rounded-lg">
              <span className="text-[11px] font-bold text-[var(--text-3)] flex items-center gap-1.5">
                <Trophy size={13} className="text-[var(--accent)]" /> Active Tools
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-raised)] border border-[var(--bd)] text-[var(--text-2)]">SGPA Calc</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-raised)] border border-[var(--bd)] text-[var(--text-2)]">PYQ Finder</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-raised)] border border-[var(--bd)] text-[var(--text-2)]">Planner</span>
              </div>
            </div>

            {/* Glowing background blob */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--accent)] opacity-10 filter blur-2xl group-hover:opacity-20 transition-opacity" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[var(--brand-violet)] opacity-10 filter blur-2xl group-hover:opacity-20 transition-opacity" />

          </div>
        </div>

      </div>
    </section>
  );
}
