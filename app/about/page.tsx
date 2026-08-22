import { GraduationCap, Code2, Heart, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf max-w-3xl space-y-12">
        
        {/* Core Header */}
        <div className="text-center space-y-4">
          <span className="badge badge-cyan">About Vidyaaraa</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-1)]">
            Your Academic Command Center
          </h1>
          <p className="text-sm text-[var(--text-2)] max-w-md mx-auto leading-relaxed">
            Vidyaaraa was built with one goal: to eliminate the chaos of college preparation. No signups, no paywalls, just fast and useful tools.
          </p>
        </div>

        {/* Brand Mission section */}
        <div className="card p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-1)]">Our Product Philosophy</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-1)]">
                <span className="w-5 h-5 rounded bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center text-[var(--accent)]">1</span>
                Simple &amp; Fast
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Pages load instantly, documents open directly, and calculators evaluate in real-time. We value your time above all.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-1)]">
                <span className="w-5 h-5 rounded bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center text-[var(--accent)]">2</span>
                Action-Oriented
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Every feature must answer a direct student need: &ldquo;Does this help me save time or perform better?&rdquo; If not, we don&apos;t build it.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-1)]">
                <span className="w-5 h-5 rounded bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center text-[var(--accent)]">3</span>
                Zero Ad Bloat
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                No redirects, popups, or fake download timers. Get your syllabus or question paper immediately.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-1)]">
                <span className="w-5 h-5 rounded bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center text-[var(--accent)]">4</span>
                Vetted Materials
              </div>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                No fake resources or placeholder papers. Handpicked and structured resources matching university syllabus schemes.
              </p>
            </div>

          </div>
        </div>

        {/* Tech architecture note */}
        <div className="card p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-1)]">Architecture &amp; Future Growth</h2>
          <p className="text-xs text-[var(--text-2)] leading-relaxed">
            Vidyaaraa is designed on a robust Server-Component-driven Next.js architecture. The data schema is fully decoupled, making university expansion simple. In future phases, Vidyaaraa will support:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
            <li className="text-[11px] text-[var(--text-2)] flex items-center gap-2">
              <Award size={14} className="text-[var(--accent)]" />
              <span>User profiles &amp; cloud storage sync</span>
            </li>
            <li className="text-[11px] text-[var(--text-2)] flex items-center gap-2">
              <Code2 size={14} className="text-[var(--brand-violet)]" />
              <span>Interactive AI learning assistant</span>
            </li>
            <li className="text-[11px] text-[var(--text-2)] flex items-center gap-2">
              <GraduationCap size={14} className="text-[var(--accent)]" />
              <span>Multi-university expansion models</span>
            </li>
            <li className="text-[11px] text-[var(--text-2)] flex items-center gap-2">
              <Heart size={14} className="text-[var(--brand-violet)]" />
              <span>Student-contributed verified notes</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link href="/resources" className="btn btn-primary btn-lg">
            Start Exploring Resources
          </Link>
        </div>

      </div>
    </div>
  );
}
