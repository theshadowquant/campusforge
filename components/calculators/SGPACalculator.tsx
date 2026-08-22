'use client';

import { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Info } from 'lucide-react';
import type { GradeLetter, SGPASubjectEntry } from '@/types';
import { GRADE_POINTS } from '@/types';
import { calculateSGPA } from '@/lib/calculator';

const defaultSubjects: SGPASubjectEntry[] = [
  { id: '1', subjectName: 'Subject 1', credits: 4, grade: 'O' },
  { id: '2', subjectName: 'Subject 2', credits: 4, grade: 'A+' },
  { id: '3', subjectName: 'Subject 3', credits: 3, grade: 'A' },
  { id: '4', subjectName: 'Subject 4', credits: 3, grade: 'B+' },
];

export function SGPACalculator() {
  const [entries, setEntries] = useState<SGPASubjectEntry[]>(defaultSubjects);
  const [customName, setCustomName] = useState('');
  const [customCredits, setCustomCredits] = useState(4);
  const [customGrade, setCustomGrade] = useState<GradeLetter>('A+');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const name = customName.trim() || `Subject ${entries.length + 1}`;
    const newEntry: SGPASubjectEntry = {
      id: Math.random().toString(),
      subjectName: name,
      credits: Number(customCredits),
      grade: customGrade,
    };
    setEntries([...entries, newEntry]);
    setCustomName('');
    setCustomCredits(4);
    setCustomGrade('A+');
  };

  const handleRemoveSubject = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleUpdateEntry = (id: string, field: keyof SGPASubjectEntry, value: any) => {
    setEntries(
      entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  const handleReset = () => {
    setEntries(defaultSubjects);
  };

  const { sgpa, totalCredits, weightedPoints } = calculateSGPA(entries);

  return (
    <div className="card p-6 md:p-8 space-y-6" id="sgpa-calc">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[var(--text-1)] flex items-center gap-2">
            <Calculator className="text-[var(--accent)]" size={20} />
            SGPA Calculator
          </h2>
          <p className="text-xs text-[var(--text-2)]">
            Calculate semester GPA using standard VTU 10-point scale grading scheme.
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleAddSubject} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[var(--bg-overlay)] border border-[var(--bd)]">
        <div className="sm:col-span-2">
          <label className="label">Subject Name (Optional)</label>
          <input
            type="text"
            className="input"
            placeholder="e.g. Data Structures"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Credits</label>
          <input
            type="number"
            min="1"
            max="16"
            className="input"
            value={customCredits}
            onChange={(e) => setCustomCredits(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="label">Grade</label>
            <select
              className="select"
              value={customGrade}
              onChange={(e) => setCustomGrade(e.target.value as GradeLetter)}
            >
              {(Object.keys(GRADE_POINTS) as GradeLetter[]).map((g) => (
                <option key={g} value={g}>
                  {g} ({GRADE_POINTS[g]} pts)
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary p-2.5 rounded-lg flex-shrink-0" aria-label="Add subject row">
            <Plus size={16} />
          </button>
        </div>
      </form>

      {/* Entries List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="text-center py-6 text-xs text-[var(--text-3)] border border-dashed border-[var(--bd)] rounded-lg">
            No subjects added yet. Create one above to start calculating.
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-[var(--bd)] bg-[var(--bg-raised)]"
            >
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  className="bg-transparent border-none text-xs font-semibold text-[var(--text-1)] w-full outline-none focus:underline"
                  value={entry.subjectName}
                  onChange={(e) => handleUpdateEntry(entry.id, 'subjectName', e.target.value)}
                />
              </div>

              {/* Credits dropdown/input */}
              <div className="w-16">
                <input
                  type="number"
                  min="1"
                  max="16"
                  className="input py-1 px-2 text-center text-xs"
                  value={entry.credits}
                  onChange={(e) => handleUpdateEntry(entry.id, 'credits', Math.max(1, Number(e.target.value)))}
                />
              </div>

              {/* Grade Selector */}
              <div className="w-20">
                <select
                  className="select py-1 px-2 text-xs"
                  value={entry.grade}
                  onChange={(e) => handleUpdateEntry(entry.id, 'grade', e.target.value as GradeLetter)}
                >
                  {(Object.keys(GRADE_POINTS) as GradeLetter[]).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveSubject(entry.id)}
                className="btn btn-ghost text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                aria-label={`Remove ${entry.subjectName}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formula & Assumptions explanation */}
      <div className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] flex items-start gap-3">
        <Info size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-[var(--text-3)] uppercase tracking-wider">Formula Used</div>
          <code className="text-xs font-mono text-[var(--text-1)]">
            SGPA = Σ(Credit × Grade Point) / Σ(Credits)
          </code>
          <p className="text-[10px] text-[var(--text-2)] leading-relaxed">
            VTU Grade Points: O = 10, A+ = 9, A = 8, B+ = 7, B = 6, C = 5, P = 4, F = 0.
          </p>
        </div>
      </div>

      {/* Summary Scorecard */}
      <div className="pt-4 border-t border-[var(--bd)] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-3)]">Total Credits</span>
            <div className="text-lg font-extrabold text-[var(--text-1)]">{totalCredits}</div>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-3)]">Weighted Points</span>
            <div className="text-lg font-extrabold text-[var(--text-1)]">{weightedPoints}</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] text-center sm:text-right min-w-[120px]">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-[var(--accent)]">Calculated SGPA</span>
          <div className="text-3xl font-extrabold text-[var(--text-1)]">{sgpa.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
