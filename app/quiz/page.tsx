import { QuizInterface } from '@/components/quiz/QuizInterface';
import { Brain, Sparkles } from 'lucide-react';

export default function QuizPage() {
  return (
    <div className="section min-h-screen bg-[var(--bg)] py-12">
      <div className="container-cf max-w-xl space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-overlay)] border border-[var(--bd)] text-xs text-[var(--text-2)] font-semibold">
            <Sparkles size={12} className="text-[var(--accent)]" />
            AI Mock Generation
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-1)]">
            AI Exam Prep Quizzes
          </h1>
          <p className="text-sm text-[var(--text-2)]">
            Test your knowledge by generating customized multiple choice questions mapped to your syllabus modules.
          </p>
        </div>

        {/* Quiz Setup and Interface Panel */}
        <QuizInterface />

      </div>
    </div>
  );
}
