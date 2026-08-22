import type { SGPASubjectEntry, SemesterGPA, GRADE_POINTS } from '@/types';
import { GRADE_POINTS as GRADES } from '@/types';

// ---- SGPA ----

export function calculateSGPA(subjects: SGPASubjectEntry[]): {
  sgpa: number;
  totalCredits: number;
  weightedPoints: number;
} {
  if (subjects.length === 0) return { sgpa: 0, totalCredits: 0, weightedPoints: 0 };

  let totalCredits = 0;
  let weightedPoints = 0;

  for (const s of subjects) {
    const gp = GRADES[s.grade] ?? 0;
    totalCredits += s.credits;
    weightedPoints += s.credits * gp;
  }

  const sgpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
  return { sgpa, totalCredits, weightedPoints };
}

// ---- CGPA ----

export function calculateCGPA(semesters: SemesterGPA[]): number {
  if (semesters.length === 0) return 0;
  const total = semesters.reduce((sum, s) => sum + s.sgpa, 0);
  return total / semesters.length;
}

// ---- Required SGPA ----

export function calculateRequiredSGPA({
  currentCGPA,
  completedSemesters,
  targetCGPA,
  totalSemesters,
}: {
  currentCGPA: number;
  completedSemesters: number;
  targetCGPA: number;
  totalSemesters: number;
}): number | null {
  const remaining = totalSemesters - completedSemesters;
  if (remaining <= 0) return null;
  const required =
    (targetCGPA * totalSemesters - currentCGPA * completedSemesters) / remaining;
  return Math.min(Math.max(required, 0), 10);
}

// ---- Percentage ----

export function cgpaToPercentage(cgpa: number): number {
  // VTU formula: Percentage = (CGPA - 0.75) × 10
  return Math.max((cgpa - 0.75) * 10, 0);
}

export function percentageToCGPA(percentage: number): number {
  return percentage / 10 + 0.75;
}
