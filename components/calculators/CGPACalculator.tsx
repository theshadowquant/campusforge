'use client';

import { useState } from 'react';
import { Plus, Trash2, RotateCcw, Award, Sparkles, Info } from 'lucide-react';
import type { SemesterGPA } from '@/types';
import { calculateCGPA, calculateRequiredSGPA } from '@/lib/calculator';

const defaultSemesters: SemesterGPA[] = [
  { id: '1', semester: 1, sgpa: 8.2 },
  { id: '2', semester: 2, sgpa: 7.9 },
  { id: '3', semester: 3, sgpa: 8.4 },
];

export function CGPACalculator() {
  const [semesters, setSemesters] = useState<SemesterGPA[]>(defaultSemesters);
  const [targetCGPA, setTargetCGPA] = useState<number>(8.5);
  const [totalSemesters, setTotalSemesters] = useState<number>(8);

  const handleAddSemester = () => {
    if (semesters.length >= totalSemesters) return;
    const nextSem = semesters.length + 1;
    const newEntry: SemesterGPA = {
      id: Math.random().toString(),
      semester: nextSem,
      sgpa: 8.0,
    };
    setSemesters([...semesters, newEntry]);
  };

  const handleRemoveSemester = (id: string) => {
    const updated = semesters.filter((s) => s.id !== id);
    // Re-index semester numbers for simplicity
    setSemesters(
      updated.map((s, idx) => ({ ...s, semester: idx + 1 }))
    );
  };

  const handleUpdateSGPA = (id: string, val: number) => {
    const clamped = Math.min(Math.max(val, 0), 10);
    setSemesters(
      semesters.map((s) => (s.id === id ? { ...s, sgpa: clamped } : s))
    );
  };

  const handleReset = () => {
    setSemesters(defaultSemesters);
    setTargetCGPA(8.5);
    setTotalSemesters(8);
  };

  const cgpa = calculateCGPA(semesters);
  const completedCount = semesters.length;
  const requiredSGPA = calculateRequiredSGPA({
    currentCGPA: cgpa,
    completedSemesters: completedCount,
    targetCGPA,
    totalSemesters,
  });

  return (
    <div className="card p-6 md:p-8 space-y-6" id="cgpa-calc">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[var(--text-1)] flex items-center gap-2">
            <Award className="text-[var(--brand-violet)]" size={20} />
            CGPA &amp; Target CGPA Calculator
          </h2>
          <p className="text-xs text-[var(--text-2)]">
            Combine your semester GPAs and predict the grades needed for your target CGPA.
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Semesters List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-[var(--text-3)] uppercase tracking-wider">
            Enter Semester GPAs
          </h3>

          <div className="space-y-3">
            {semesters.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--bd)] bg-[var(--bg-raised)]"
              >
                <span className="text-xs font-bold text-[var(--text-1)]">
                  Semester {s.semester}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <label className="sr-only">SGPA for Semester {s.semester}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      className="input py-1 px-3 text-center text-xs"
                      value={s.sgpa}
                      onChange={(e) => handleUpdateSGPA(s.id, Number(e.target.value))}
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveSemester(s.id)}
                    className="btn btn-ghost text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                    aria-label={`Remove Semester ${s.semester}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddSemester}
            disabled={semesters.length >= totalSemesters}
            className="btn btn-secondary w-full py-2.5 flex items-center justify-center gap-1.5 text-xs font-bold"
          >
            <Plus size={14} />
            Add Semester GPA
          </button>
        </div>

        {/* Right Side: Target Calculator & Results */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Settings */}
          <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-3)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-[var(--brand-violet)]" />
              Target CGPA Goal
            </h3>

            <div className="space-y-3">
              <div>
                <label className="label">Target CGPA Goal</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  className="input text-xs"
                  value={targetCGPA}
                  onChange={(e) => setTargetCGPA(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="label">Total Semesters</label>
                <select
                  className="select text-xs"
                  value={totalSemesters}
                  onChange={(e) => setTotalSemesters(Number(e.target.value))}
                >
                  {[4, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Semesters (Degree)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Scorecard */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-raised)] flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-3)]">Current CGPA</span>
                <div className="text-2xl font-extrabold text-[var(--text-1)]">{cgpa.toFixed(2)}</div>
                <p className="text-[9px] text-[var(--text-3)]">{completedCount} sem completed</p>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-3)]">Target CGPA</span>
                <div className="text-2xl font-extrabold text-[var(--brand-violet)]">{targetCGPA.toFixed(2)}</div>
              </div>
            </div>

            {/* Target Recommendation Alert */}
            {requiredSGPA !== null && requiredSGPA > 0 && requiredSGPA <= 10 ? (
              <div className="p-4 rounded-xl bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.15)] space-y-1">
                <span className="text-[9px] uppercase font-extrabold tracking-widest text-[var(--brand-violet)]">Required Effort</span>
                <p className="text-xs text-[var(--text-1)] leading-relaxed font-semibold">
                  You need an average SGPA of <span className="text-[var(--brand-violet)] font-extrabold text-base">{requiredSGPA.toFixed(2)}</span> across the remaining {totalSemesters - completedCount} semesters.
                </p>
              </div>
            ) : requiredSGPA !== null && requiredSGPA > 10 ? (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 space-y-1">
                <span className="text-[9px] uppercase font-extrabold tracking-widest">Mathematically Impossible</span>
                <p className="text-xs leading-relaxed font-medium">
                  To hit {targetCGPA.toFixed(2)} CGPA, you would need {requiredSGPA.toFixed(2)} SGPA, which exceeds the max 10.0 grade point limit. Try a lower target or adjust semesters.
                </p>
              </div>
            ) : requiredSGPA !== null && requiredSGPA <= 0 ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 space-y-1">
                <span className="text-[9px] uppercase font-extrabold tracking-widest">Target Reached</span>
                <p className="text-xs leading-relaxed font-medium">
                  Your current CGPA already exceeds your target. Maintain a positive GPA to secure your position!
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[var(--bg-overlay)] border border-[var(--bd)] text-[var(--text-3)] text-xs text-center">
                All semesters completed. No remaining target calculation.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Assumptions Footer */}
      <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] flex items-start gap-3">
        <Info size={16} className="text-[var(--text-3)] mt-0.5 flex-shrink-0" />
        <div className="space-y-1 text-[10px] text-[var(--text-2)] leading-relaxed">
          <div className="font-bold text-[var(--text-3)] uppercase tracking-wider mb-1">Calculation Assumptions</div>
          <p>• Assumes equal credits weightage across all semesters for simple calculation.</p>
          <p>• VTU calculation matches: Cumulative SGPA Average = Sum of all Semester SGPAs / Number of Semesters.</p>
        </div>
      </div>

    </div>
  );
}
