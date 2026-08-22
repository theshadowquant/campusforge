'use client';

import { useState } from 'react';
import { Sparkles, Brain, Check, X, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import type { QuizConfig, QuizQuestion } from '@/types';
import { getDemoQuestions } from '@/data/quiz';
import { subjects } from '@/data/universities';

export function QuizInterface() {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Setup form fields
  const [formSubject, setFormSubject] = useState('cse-s4-dbms');
  const [formUnit, setFormUnit] = useState('1');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formCount, setFormCount] = useState(5);

  // Start quiz
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subjects.find((s) => s.id === formSubject);
    const subjectName = sub ? sub.name : 'Computer Science Subject';

    const conf: QuizConfig = {
      subjectId: formSubject,
      subjectName,
      unit: formUnit,
      difficulty: formDifficulty,
      count: formCount,
    };

    // Load mock/demo questions from local quiz service layer
    const pool = getDemoQuestions(formSubject, formCount);
    setQuestions(pool);
    setConfig(conf);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || hasSubmitted) return;
    setHasSubmitted(true);
    if (selectedOpt === questions[currentIdx].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((idx) => idx + 1);
      setSelectedOpt(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setConfig(null);
    setQuestions([]);
    setSelectedOpt(null);
    setHasSubmitted(false);
  };

  return (
    <div className="card p-6 md:p-8 space-y-6">
      
      {!config ? (
        /* SETUP MODE */
        <form onSubmit={handleStartQuiz} className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[var(--text-1)] flex items-center gap-2">
              <Brain size={20} className="text-[var(--accent)]" />
              AI Mock Quiz Generator
            </h2>
            <p className="text-xs text-[var(--text-2)]">
              Select your subject and parameters. The engine will retrieve relevant questions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                Local Demo Mode Active
              </span>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Currently running in local preview mode. Questions are retrieved from the decoupled mock data layer. The setup is fully ready for a future LangChain / OpenAI server endpoint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Subject Selector */}
            <div>
              <label className="label">Select Subject</label>
              <select
                className="select text-xs"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
              >
                <option value="cse-s4-dbms">DBMS (Database Systems)</option>
                <option value="cse-s4-ada">ADA (Algorithms Design)</option>
                <option value="cse-s4-java">OOP with Java</option>
              </select>
            </div>

            {/* Syllabus Unit Selector */}
            <div>
              <label className="label">Syllabus Module / Unit</label>
              <select
                className="select text-xs"
                value={formUnit}
                onChange={(e) => setFormUnit(e.target.value)}
              >
                <option value="1">Unit 1: Introduction</option>
                <option value="2">Unit 2: Core Concepts</option>
                <option value="3">Unit 3: Advanced Methods</option>
                <option value="all">Entire Syllabus (All units)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="label">Difficulty</label>
              <select
                className="select text-xs"
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value as any)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="label">Number of Questions</label>
              <select
                className="select text-xs"
                value={formCount}
                onChange={(e) => setFormCount(Number(e.target.value))}
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
              </select>
            </div>

          </div>

          <button type="submit" className="btn btn-primary w-full py-3 flex items-center justify-center gap-1.5 font-bold">
            <Sparkles size={16} />
            Generate Quiz
          </button>
        </form>
      ) : quizFinished ? (
        /* SCORE / FINISH MODE */
        <div className="text-center space-y-6 py-8">
          <div className="w-16 h-16 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] flex items-center justify-center mx-auto text-[var(--accent)] animate-bounce">
            <Brain size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[var(--text-1)]">Quiz Complete!</h2>
            <p className="text-xs text-[var(--text-2)] uppercase font-semibold tracking-wider">
              {config.subjectName} · Module {config.unit}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-overlay)] border border-[var(--bd)] inline-block min-w-[200px]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-3)]">Your Score</span>
            <div className="text-4xl font-extrabold text-[var(--text-1)] mt-1">
              {score} <span className="text-lg font-medium text-[var(--text-3)]">/ {questions.length}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--accent)] mt-2">
              {Math.round((score / questions.length) * 100)}% accuracy rate
            </div>
          </div>

          <div className="flex gap-4 max-w-sm mx-auto pt-4">
            <button onClick={handleRestart} className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-1.5">
              <RotateCcw size={14} />
              Try New Quiz
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUIZ QUESTION RUNNER */
        <div className="space-y-6">
          
          {/* Progress Header */}
          <div className="flex justify-between items-center border-b border-[var(--bd-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-3)]">
                Active Session
              </span>
              <h3 className="text-sm font-bold text-[var(--text-1)]">{config.subjectName}</h3>
            </div>
            
            <div className="text-right">
              <span className="text-xs font-bold font-mono text-[var(--text-2)]">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <div className="w-24 bg-[var(--bd)] h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-[var(--accent)] h-full"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-[var(--text-1)] leading-relaxed">
              {questions[currentIdx]?.question}
            </h4>

            {/* Options List */}
            <div className="space-y-2">
              {questions[currentIdx]?.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrectAns = idx === questions[currentIdx].correctIndex;
                
                let optionStyle = 'border-[var(--bd)] bg-[var(--bg-raised)]';
                if (hasSubmitted) {
                  if (isCorrectAns) {
                    optionStyle = 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400';
                  } else if (isSelected) {
                    optionStyle = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400';
                  } else {
                    optionStyle = 'border-[var(--bd)] opacity-60 bg-[var(--bg-raised)]';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-[var(--accent)] bg-[rgba(0,212,170,0.05)]';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => setSelectedOpt(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all select-none ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    
                    {hasSubmitted && isCorrectAns && <Check size={14} className="text-green-500" />}
                    {hasSubmitted && isSelected && !isCorrectAns && <X size={14} className="text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner */}
          {hasSubmitted && (
            <div className="p-4 rounded-xl bg-[var(--bg-overlay)] border border-[var(--bd)] space-y-1 fade-in">
              <span className="text-[10px] font-bold text-[var(--text-3)] uppercase tracking-wider block">
                Explanation
              </span>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                {questions[currentIdx]?.explanation}
              </p>
            </div>
          )}

          {/* Actions Footer */}
          <div className="pt-4 border-t border-[var(--bd-subtle)] flex justify-between items-center">
            <button onClick={handleRestart} className="btn btn-ghost text-xs text-red-500">
              Quit quiz
            </button>

            {!hasSubmitted ? (
              <button
                disabled={selectedOpt === null}
                onClick={handleSubmitAnswer}
                className="btn btn-primary px-6"
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} className="btn btn-primary px-6 flex items-center gap-1.5">
                <span>{currentIdx + 1 === questions.length ? 'Finish' : 'Next'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
