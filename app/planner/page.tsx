import { StudyPlanner } from '@/components/planner/StudyPlanner';
import { Calendar, Sparkles } from 'lucide-react';

export default function PlannerPage() {
  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf max-w-4xl space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] text-xs text-[var(--text-2)] font-semibold">
            <Sparkles size={12} className="text-[var(--accent)]" />
            Designed for Action
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            Lightweight Study Planner
          </h1>
          <p className="text-sm text-[var(--text-2)] max-w-md mx-auto">
            Input your subjects, set your exam targets, and get a daily study agenda mapped proportionally to subject difficulty.
          </p>
        </div>

        {/* Study Planner Core UI */}
        <StudyPlanner />

      </div>
    </div>
  );
}
