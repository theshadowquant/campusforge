'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, GraduationCap, X } from 'lucide-react';
import { universities, branches, semesters, subjects } from '@/data/universities';
import { resources } from '@/data/resources';
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { ResourceType } from '@/types';

export default function ResourcesPage() {
  const [selectedUni, setSelectedUni] = useState('vtu');
  const [selectedBranch, setSelectedBranch] = useState('cse');
  const [selectedSem, setSelectedSem] = useState<number>(4);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

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
    setSelectedType('');
    setSearchQuery('');
  };

  // Perform filtering on resource list
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (r.universityId !== selectedUni) return false;
      if (selectedBranch && r.branchId !== selectedBranch) return false;
      if (selectedSem && r.semester !== selectedSem) return false;
      if (selectedSubject && r.subjectId !== selectedSubject) return false;
      if (selectedType && r.type !== selectedType) return false;
      
      // Local client search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesSubj = r.subjectName.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesSubj;
      }
      return true;
    });
  }, [selectedUni, selectedBranch, selectedSem, selectedSubject, selectedType, searchQuery]);

  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            Resource Library
          </h1>
          <p className="text-xs text-[var(--text-2)] max-w-lg">
            Find notes, syllabus, lab manuals, and important questions for your specific university branch and semester instantly.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="card p-5 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[var(--bd-subtle)] pb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-1)] uppercase tracking-wider">
              <SlidersHorizontal size={14} className="text-[var(--accent)]" />
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

            {/* Resource Type */}
            <div>
              <label className="label">Material Type</label>
              <select
                className="select text-xs"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="notes">Notes</option>
                <option value="question-paper">Question Papers</option>
                <option value="lab-manual">Lab Manuals</option>
                <option value="important-questions">Important Questions</option>
                <option value="syllabus">Syllabus</option>
                <option value="reference">Reference Material</option>
              </select>
            </div>

          </div>

          {/* Search text input */}
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[var(--text-3)]" size={16} />
              <input
                type="text"
                placeholder="Search notes titles, subject name, modules..."
                className="input pl-10 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div>
          {filteredResources.length === 0 ? (
            <div className="card p-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] flex items-center justify-center mx-auto text-[var(--text-3)]">
                <BookOpen size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--text-1)]">No resources found</h3>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  We don&apos;t have academic resources matching this query yet. Try changing the semester, subject, or search term.
                </p>
              </div>
              <button onClick={handleClearFilters} className="btn btn-secondary btn-sm mx-auto">
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((r) => (
                <div key={r.id} className="fade-in">
                  <ResourceCard resource={r} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
