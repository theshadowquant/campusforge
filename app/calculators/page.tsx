'use client';

import { useState } from 'react';
import { SGPACalculator } from '@/components/calculators/SGPACalculator';
import { CGPACalculator } from '@/components/calculators/CGPACalculator';
import { PercentageCalculator } from '@/components/calculators/PercentageCalculator';
import { Sparkles, Calculator, Award, Percent } from 'lucide-react';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'sgpa' | 'cgpa' | 'percentage'>('sgpa');

  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf max-w-4xl space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] text-xs text-[var(--text-2)] font-semibold">
            <Sparkles size={12} className="text-[var(--accent)]" />
            Accurate VTU Grading Rules
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            Academic Calculators
          </h1>
          <p className="text-sm text-[var(--text-2)] max-w-md mx-auto">
            Calculate your semester SGPA, compute your CGPA target pathways, or convert your GPA score into percentages.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-[var(--bd)] p-1 gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('sgpa')}
            className={`btn btn-sm flex-1 flex items-center justify-center gap-1.5 py-2.5 transition-all rounded-lg ${
              activeTab === 'sgpa'
                ? 'bg-[var(--bg-raised)] text-[var(--accent)] border border-[var(--bd)] shadow-sm'
                : 'text-[var(--text-2)] hover:text-[var(--text-1)] bg-transparent'
            }`}
          >
            <Calculator size={14} />
            <span>SGPA</span>
          </button>

          <button
            onClick={() => setActiveTab('cgpa')}
            className={`btn btn-sm flex-1 flex items-center justify-center gap-1.5 py-2.5 transition-all rounded-lg ${
              activeTab === 'cgpa'
                ? 'bg-[var(--bg-raised)] text-[var(--brand-violet)] border border-[var(--bd)] shadow-sm'
                : 'text-[var(--text-2)] hover:text-[var(--text-1)] bg-transparent'
            }`}
          >
            <Award size={14} />
            <span>CGPA</span>
          </button>

          <button
            onClick={() => setActiveTab('percentage')}
            className={`btn btn-sm flex-1 flex items-center justify-center gap-1.5 py-2.5 transition-all rounded-lg ${
              activeTab === 'percentage'
                ? 'bg-[var(--bg-raised)] text-[var(--accent)] border border-[var(--bd)] shadow-sm'
                : 'text-[var(--text-2)] hover:text-[var(--text-1)] bg-transparent'
            }`}
          >
            <Percent size={14} />
            <span>Percentage</span>
          </button>
        </div>

        {/* Active Calculator Component */}
        <div className="fade-in">
          {activeTab === 'sgpa' && <SGPACalculator />}
          {activeTab === 'cgpa' && <CGPACalculator />}
          {activeTab === 'percentage' && <PercentageCalculator />}
        </div>

      </div>
    </div>
  );
}
