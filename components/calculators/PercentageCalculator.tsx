'use client';

import { useState } from 'react';
import { Percent, ArrowLeftRight, Info } from 'lucide-react';
import { cgpaToPercentage, percentageToCGPA } from '@/lib/calculator';

export function PercentageCalculator() {
  const [cgpa, setCgpa] = useState<string>('8.5');
  const [percent, setPercent] = useState<string>('77.5');

  const handleCgpaChange = (val: string) => {
    setCgpa(val);
    const parsed = Number(val);
    if (!isNaN(parsed) && parsed >= 0.75 && parsed <= 10) {
      setPercent(cgpaToPercentage(parsed).toFixed(1));
    } else {
      setPercent('--');
    }
  };

  const handlePercentChange = (val: string) => {
    setPercent(val);
    const parsed = Number(val);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      setCgpa(percentageToCGPA(parsed).toFixed(2));
    } else {
      setCgpa('--');
    }
  };

  return (
    <div className="card p-6 md:p-8 space-y-6" id="percentage-calc">
      
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-[var(--text-1)] flex items-center gap-2">
          <Percent className="text-[var(--accent)]" size={20} />
          VTU Percentage Converter
        </h2>
        <p className="text-xs text-[var(--text-2)]">
          Convert cumulative GPA to overall percentage and vice-versa using official VTU guidelines.
        </p>
      </div>

      {/* Inputs side-by-side with toggle icon */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        
        {/* CGPA */}
        <div className="md:col-span-5 space-y-2">
          <label className="label">CGPA (out of 10)</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.75"
              max="10"
              placeholder="e.g. 8.50"
              className="input text-lg font-bold"
              value={cgpa}
              onChange={(e) => handleCgpaChange(e.target.value)}
            />
          </div>
        </div>

        {/* Transfer Icon */}
        <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
          <span className="p-2.5 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] text-[var(--text-3)]">
            <ArrowLeftRight size={16} />
          </span>
        </div>

        {/* Percentage */}
        <div className="md:col-span-5 space-y-2">
          <label className="label">Percentage (%)</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g. 77.5"
              className="input text-lg font-bold"
              value={percent}
              onChange={(e) => handlePercentChange(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* Info Panel explaining the VTU official formula */}
      <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] flex items-start gap-3">
        <Info size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
        <div className="space-y-1 text-[11px] text-[var(--text-2)] leading-relaxed">
          <div className="font-bold text-[var(--text-3)] uppercase tracking-wider mb-1">Official VTU Formula</div>
          <code className="text-xs font-mono text-[var(--text-1)]">
            Percentage = (CGPA - 0.75) × 10
          </code>
          <p className="mt-1">
            Note: Percentage conversion is valid only for CGPA values equal to or greater than 0.75.
          </p>
        </div>
      </div>

    </div>
  );
}
