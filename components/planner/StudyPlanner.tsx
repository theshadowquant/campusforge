'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Sparkles, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, Loader } from 'lucide-react';
import type { StudySubject, StudySession, StudyPlan } from '@/types';
import { generateStudyPlan, savePlan, getAllPlans, toggleSessionComplete } from '@/lib/planner';

export function StudyPlanner() {
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(2);
  const [subjectsList, setSubjectsList] = useState<StudySubject[]>([]);
  const [newSubName, setNewSubName] = useState('');
  const [newSubDiff, setNewSubDiff] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing plan on mount
  useEffect(() => {
    const plans = getAllPlans();
    if (plans.length > 0) {
      setCurrentPlan(plans[plans.length - 1]); // Show latest plan
    }
  }, []);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const sub: StudySubject = {
      id: Math.random().toString(),
      name: newSubName.trim(),
      difficulty: newSubDiff,
      hoursNeeded: newSubDiff === 'easy' ? 4 : newSubDiff === 'medium' ? 8 : 12,
    };

    setSubjectsList([...subjectsList, sub]);
    setNewSubName('');
    setNewSubDiff('medium');
  };

  const handleRemoveSubject = (id: string) => {
    setSubjectsList(subjectsList.filter((s) => s.id !== id));
  };

  const handleGenerate = () => {
    if (!examDate || subjectsList.length === 0) return;
    
    setLoading(true);
    setTimeout(() => {
      const schedule = generateStudyPlan({
        examDate,
        dailyHours,
        subjects: subjectsList,
      });

      const plan: StudyPlan = {
        id: Math.random().toString(),
        examDate,
        dailyHours,
        subjects: subjectsList,
        schedule,
        createdAt: new Date().toISOString(),
      };

      savePlan(plan);
      setCurrentPlan(plan);
      setLoading(false);
    }, 800);
  };

  const handleToggleComplete = (sessionId: string) => {
    if (!currentPlan) return;
    const updated = toggleSessionComplete(currentPlan.id, sessionId);
    if (updated) {
      setCurrentPlan(updated);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset and delete your current planner?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('campusforge_plans');
      }
      setCurrentPlan(null);
      setSubjectsList([]);
      setExamDate('');
      setDailyHours(2);
    }
  };

  // Calculations for progress bar
  const totalSessions = currentPlan?.schedule.length ?? 0;
  const completedSessions = currentPlan?.schedule.filter((s) => s.completed).length ?? 0;
  const progressPercent = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <div className="space-y-8">
      {!currentPlan ? (
        <div className="card p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[var(--text-1)] flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--accent)]" />
              Generate Study Plan
            </h2>
            <p className="text-xs text-[var(--text-2)]">
              Specify your exam schedule and target subjects. We will generate a balanced review roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Inputs & Parameters */}
            <div className="space-y-4">
              <div>
                <label className="label">Exam Target Date</label>
                <input
                  type="date"
                  className="input text-xs"
                  value={examDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Daily Revision Budget (Hours)</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  className="input text-xs"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Math.max(1, Number(e.target.value)))}
                />
              </div>

              {/* Add Subject Row */}
              <form onSubmit={handleAddSubject} className="p-4 rounded-xl border border-[var(--bd)] bg-[var(--bg-overlay)] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-3)] block">
                  Add Subject for Exam
                </span>
                
                <div>
                  <label className="label text-[10px]">Subject Title</label>
                  <input
                    type="text"
                    className="input py-1.5 text-xs"
                    placeholder="e.g. Database Management Systems"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex-grow">
                    <label className="label text-[10px]">Subject Difficulty</label>
                    <select
                      className="select py-1.5 text-xs"
                      value={newSubDiff}
                      onChange={(e) => setNewSubDiff(e.target.value as any)}
                    >
                      <option value="easy">Easy (Less time)</option>
                      <option value="medium">Medium (Moderate time)</option>
                      <option value="hard">Hard (More time)</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="btn btn-secondary text-xs flex-shrink-0 self-end py-2 px-3">
                    Add Row
                  </button>
                </div>
              </form>
            </div>

            {/* Subjects List & Generate Action */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-3)] uppercase tracking-wider block">
                  Subjects Added ({subjectsList.length})
                </span>

                {subjectsList.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-[var(--bd)] rounded-xl text-xs text-[var(--text-3)]">
                    No subjects added yet. Add subjects to plan revision slots.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {subjectsList.map((sub) => (
                      <div key={sub.id} className="flex justify-between items-center p-3 rounded-lg border border-[var(--bd)] bg-[var(--bg-raised)]">
                        <div>
                          <span className="text-xs font-bold text-[var(--text-1)] block">{sub.name}</span>
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[var(--text-3)]">
                            Difficulty: {sub.difficulty}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(sub.id)}
                          className="btn btn-ghost text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={!examDate || subjectsList.length === 0 || loading}
                className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Generating your layout...
                  </>
                ) : (
                  <>
                    <span>Generate Revision Schedule</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* Generated Schedule view */
        <div className="space-y-6">
          
          {/* Dashboard Summary Info */}
          <div className="card p-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-lg font-extrabold text-[var(--text-1)]">
                Active Study Plan
              </h2>
              <p className="text-xs text-[var(--text-2)]">
                Target Exam Date: <span className="font-semibold">{currentPlan.examDate}</span> · Daily Revision: <span className="font-semibold">{currentPlan.dailyHours} hrs</span>
              </p>
            </div>

            <div className="flex gap-4 items-center">
              {/* Progress indicator */}
              <div className="text-center md:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-3)] block">
                  Overall Completion
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 bg-[var(--bd)] h-2 rounded-full overflow-hidden">
                    <div className="bg-[var(--accent)] h-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-1)]">{progressPercent}%</span>
                </div>
                <span className="text-[10px] text-[var(--text-3)] block mt-0.5">
                  {completedSessions} of {totalSessions} slots finished
                </span>
              </div>

              <button onClick={handleReset} className="btn btn-secondary btn-sm p-2 rounded-lg" title="Delete Plan">
                <RotateCcw size={14} className="text-red-500" />
              </button>
            </div>
          </div>

          {/* Schedule Slots */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-3)] uppercase tracking-wider block">
              Day-by-Day Agenda
            </h3>

            {currentPlan.schedule.length === 0 ? (
              <div className="card p-8 text-center text-xs text-[var(--text-3)]">
                No slots generated. Adjust exam date or subjects count.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlan.schedule.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => handleToggleComplete(session.id)}
                    className={`card p-4 flex items-center justify-between cursor-pointer border transition-all select-none ${
                      session.completed
                        ? 'border-[var(--accent)] bg-[rgba(0,212,170,0.03)] opacity-70'
                        : 'border-[var(--bd)] hover:border-[var(--accent)] bg-[var(--bg-raised)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Completion check circle */}
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        session.completed
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-[#0F1729]'
                          : 'border-[var(--text-3)] hover:border-[var(--accent)]'
                      }`}>
                        {session.completed && <CheckCircle2 size={13} />}
                      </span>

                      <div>
                        <span className={`text-xs font-bold ${session.completed ? 'line-through text-[var(--text-2)]' : 'text-[var(--text-1)]'}`}>
                          {session.subjectName}
                        </span>
                        <span className="text-[10px] text-[var(--text-3)] font-mono block mt-0.5">
                          {session.day}, {session.date}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-[var(--text-2)] bg-[var(--bg-overlay)] px-2 py-0.5 rounded border border-[var(--bd)]">
                      {session.durationHours} hrs
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
