'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, GraduationCap, X } from 'lucide-react';
import { universities, branches, semesters, subjects } from '@/data/universities';
import { pyqs } from '@/data/pyqs';
import { PYQCard } from '@/components/pyqs/PYQCard';

export default function PYQsPage() {
  const [selectedUni, setSelectedUni] = useState('vtu');
  const [selectedBranch, setSelectedBranch] = useState('cse');
  const [selectedSem, setSelectedSem] = useState<number>(4);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  // Dynamically filter subjects list based on branch & semester
  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (s) => s.universityId === selectedUni && s.branchId === selectedBranch && s.semester === selectedSem
    );
  }, [selectedUni, selectedBranch, selectedSem]);

  // Handle reset filters
  const handleClearFilters = () => {
    setSelectedUni('vtu');
    setSelectedBranch('cse');
    setSelectedSem(4);
    setSelectedSubject('');
    setSelectedExamType('');
  };

  // Perform filtering on PYQ list
  const filteredPYQs = useMemo(() => {
    return pyqs.filter((p) => {
      if (p.universityId !== selectedUni) return false;
      if (selectedBranch && p.branchId !== selectedBranch) return false;
      if (selectedSem && p.semester !== selectedSem) return false;
      if (selectedSubject && p.subjectId !== selectedSubject) return false;
      if (selectedExamType && p.examType !== selectedExamType) return false;
      return true;
    });
  }, [selectedUni, selectedBranch, selectedSem, selectedSubject, selectedExamType]);

  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            Previous Year Question Papers
          </h1>
          <p className="text-xs text-[var(--text-2)] max-w-lg">
            Find question papers in under 10 seconds. Select university, semester, and subject to browse.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="card p-5 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[var(--bd-subtle)] pb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-1)] uppercase tracking-wider">
              <SlidersHorizontal size={14} className="text-[var(--brand-violet)]" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleClearFilters}
              className="btn btn-ghost text-[11px] font-bold py-1 px-2 hover:bg-[var(--bg-overlay)] flex items-center gap-1"
            >
              <X size={12} />
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            
            {/* University */}
            <div>
              <label className="label">University</label>
              <select
                className="select text-xs"
                value={selectedUni}
                onChange={(e) => setSelectedUni(e.target.value)}
              >
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.shortName}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="label">Branch</label>
              <select
                className="select text-xs"
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedSubject('');
                }}
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.shortName})
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="label">Semester</label>
              <select
                className="select text-xs"
                value={selectedSem}
                onChange={(e) => {
                  setSelectedSem(Number(e.target.value));
                  setSelectedSubject('');
                }}
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="label">Subject</label>
              <select
                className="select text-xs"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {filteredSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type */}
            <div>
              <label className="label">Exam Type</label>
              <select
                className="select text-xs"
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="SEE">SEE (Semester End Exam)</option>
                <option value="CIE">CIE (Internal Assessment)</option>
                <option value="Model">Model Paper</option>
                <option value="Practice">Practice Paper</option>
              </select>
            </div>

          </div>
        </div>

        {/* Papers Grid */}
        <div>
          {filteredPYQs.length === 0 ? (
            <div className="card p-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center mx-auto text-[var(--text-3)]">
                <BookOpen size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--text-1)]">No question papers found</h3>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  We don&apos;t have question papers matching this exact filter combination. Try resetting the filters or switching subjects.
                </p>
              </div>
              <button onClick={handleClearFilters} className="btn btn-secondary btn-sm mx-auto">
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPYQs.map((p) => (
                <div key={p.id} className="fade-in">
                  <PYQCard pyq={p} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
