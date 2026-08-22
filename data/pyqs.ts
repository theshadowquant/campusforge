import type { PYQ } from '@/types';

export const pyqs: PYQ[] = [
  // Semester 4 — DBMS
  { id: 'p-001', subjectId: 'cse-s4-dbms', subjectName: 'Database Management Systems', subjectCode: '21CS42', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-002', subjectId: 'cse-s4-dbms', subjectName: 'Database Management Systems', subjectCode: '21CS42', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-003', subjectId: 'cse-s4-dbms', subjectName: 'Database Management Systems', subjectCode: '21CS42', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2022, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-004', subjectId: 'cse-s4-dbms', subjectName: 'Database Management Systems', subjectCode: '21CS42', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2024, examType: 'Model', url: '#demo', isDemo: true },

  // Semester 4 — ADA
  { id: 'p-005', subjectId: 'cse-s4-ada', subjectName: 'Analysis & Design of Algorithms', subjectCode: '21CS43', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-006', subjectId: 'cse-s4-ada', subjectName: 'Analysis & Design of Algorithms', subjectCode: '21CS43', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-007', subjectId: 'cse-s4-ada', subjectName: 'Analysis & Design of Algorithms', subjectCode: '21CS43', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2022, examType: 'SEE', url: '#demo', isDemo: true },

  // Semester 4 — Java
  { id: 'p-008', subjectId: 'cse-s4-java', subjectName: 'OOP with Java', subjectCode: '21CS44', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-009', subjectId: 'cse-s4-java', subjectName: 'OOP with Java', subjectCode: '21CS44', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-010', subjectId: 'cse-s4-java', subjectName: 'OOP with Java', subjectCode: '21CS44', branchId: 'cse', semester: 4, universityId: 'vtu', year: 2024, examType: 'Model', url: '#demo', isDemo: true },

  // Semester 3 — DS
  { id: 'p-011', subjectId: 'cse-s3-ds', subjectName: 'Data Structures', subjectCode: '21CS32', branchId: 'cse', semester: 3, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-012', subjectId: 'cse-s3-ds', subjectName: 'Data Structures', subjectCode: '21CS32', branchId: 'cse', semester: 3, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-013', subjectId: 'cse-s3-ds', subjectName: 'Data Structures', subjectCode: '21CS32', branchId: 'cse', semester: 3, universityId: 'vtu', year: 2022, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-014', subjectId: 'cse-s3-ds', subjectName: 'Data Structures', subjectCode: '21CS32', branchId: 'cse', semester: 3, universityId: 'vtu', year: 2024, examType: 'CIE', url: '#demo', isDemo: true },

  // Semester 5 — CN
  { id: 'p-015', subjectId: 'cse-s5-cn', subjectName: 'Computer Networks', subjectCode: '21CS51', branchId: 'cse', semester: 5, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-016', subjectId: 'cse-s5-cn', subjectName: 'Computer Networks', subjectCode: '21CS51', branchId: 'cse', semester: 5, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },

  // Semester 5 — OS
  { id: 'p-017', subjectId: 'cse-s5-os', subjectName: 'Operating Systems', subjectCode: '21CS52', branchId: 'cse', semester: 5, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-018', subjectId: 'cse-s5-os', subjectName: 'Operating Systems', subjectCode: '21CS52', branchId: 'cse', semester: 5, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },

  // Semester 6 — ML
  { id: 'p-019', subjectId: 'cse-s6-ml', subjectName: 'Machine Learning', subjectCode: '21CS62', branchId: 'cse', semester: 6, universityId: 'vtu', year: 2024, examType: 'SEE', url: '#demo', isDemo: true },
  { id: 'p-020', subjectId: 'cse-s6-ml', subjectName: 'Machine Learning', subjectCode: '21CS62', branchId: 'cse', semester: 6, universityId: 'vtu', year: 2023, examType: 'SEE', url: '#demo', isDemo: true },
];

export function filterPYQs({
  universityId,
  branchId,
  semester,
  subjectId,
  examType,
  year,
}: {
  universityId?: string;
  branchId?: string;
  semester?: number;
  subjectId?: string;
  examType?: string;
  year?: number;
}): PYQ[] {
  return pyqs.filter((p) => {
    if (universityId && p.universityId !== universityId) return false;
    if (branchId && p.branchId !== branchId) return false;
    if (semester && p.semester !== semester) return false;
    if (subjectId && p.subjectId !== subjectId) return false;
    if (examType && p.examType !== examType) return false;
    if (year && p.year !== year) return false;
    return true;
  });
}
