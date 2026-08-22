import type { StudySubject, StudySession, StudyPlan } from '@/types';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateStudyPlan({
  examDate,
  dailyHours,
  subjects,
}: {
  examDate: string;
  dailyHours: number;
  subjects: StudySubject[];
}): StudySession[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);

  const daysAvailable = Math.floor((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysAvailable <= 0 || subjects.length === 0) return [];

  // Weight subjects by difficulty
  const difficultyWeight = { easy: 1, medium: 1.5, hard: 2 };
  const totalWeight = subjects.reduce((sum, s) => sum + difficultyWeight[s.difficulty], 0);

  // Allocate total hours proportionally
  const totalStudyHours = daysAvailable * dailyHours;
  const allocations = subjects.map((s) => ({
    subject: s,
    hours: Math.round((difficultyWeight[s.difficulty] / totalWeight) * totalStudyHours * 10) / 10,
  }));

  const sessions: StudySession[] = [];
  let sessionCounter = 0;

  for (let day = 0; day < daysAvailable; day++) {
    const date = addDays(today, day);
    const dayName = DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1];
    let hoursLeft = dailyHours;

    // Rotate through subjects for each day
    for (const alloc of allocations) {
      if (hoursLeft <= 0) break;
      if (alloc.hours <= 0) continue;

      const sessionHours = Math.min(alloc.hours, hoursLeft, 2); // Max 2h per subject per day
      if (sessionHours < 0.5) continue;

      sessions.push({
        id: `session-${++sessionCounter}`,
        subjectId: alloc.subject.id,
        subjectName: alloc.subject.name,
        durationHours: sessionHours,
        day: dayName,
        date: formatDate(date),
        completed: false,
      });

      alloc.hours -= sessionHours;
      hoursLeft -= sessionHours;
    }
  }

  return sessions;
}

export function savePlan(plan: StudyPlan): void {
  if (typeof window === 'undefined') return;
  const plans = getAllPlans();
  const idx = plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) plans[idx] = plan;
  else plans.push(plan);
  localStorage.setItem('campusforge_plans', JSON.stringify(plans));
}

export function getAllPlans(): StudyPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('campusforge_plans');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleSessionComplete(planId: string, sessionId: string): StudyPlan | null {
  const plans = getAllPlans();
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return null;

  const session = plan.schedule.find((s) => s.id === sessionId);
  if (session) session.completed = !session.completed;

  savePlan(plan);
  return plan;
}
