import type { University, Branch, Subject, Semester } from '@/types';

export const universities: University[] = [
  {
    id: 'vtu',
    name: 'Visvesvaraya Technological University',
    slug: 'vtu',
    shortName: 'VTU',
  },
];

export const branches: Branch[] = [
  {
    id: 'cse',
    universityId: 'vtu',
    name: 'Computer Science & Engineering',
    slug: 'cse',
    shortName: 'CSE',
  },
  {
    id: 'cse-ds',
    universityId: 'vtu',
    name: 'CSE (Data Science)',
    slug: 'cse-ds',
    shortName: 'CSE-DS',
  },
  {
    id: 'ise',
    universityId: 'vtu',
    name: 'Information Science & Engineering',
    slug: 'ise',
    shortName: 'ISE',
  },
  {
    id: 'ece',
    universityId: 'vtu',
    name: 'Electronics & Communication Engineering',
    slug: 'ece',
    shortName: 'ECE',
  },
  {
    id: 'me',
    universityId: 'vtu',
    name: 'Mechanical Engineering',
    slug: 'me',
    shortName: 'ME',
  },
  {
    id: 'cv',
    universityId: 'vtu',
    name: 'Civil Engineering',
    slug: 'cv',
    shortName: 'CV',
  },
];

export const semesters: Semester[] = [
  { id: 1, label: 'Semester 1' },
  { id: 2, label: 'Semester 2' },
  { id: 3, label: 'Semester 3' },
  { id: 4, label: 'Semester 4' },
  { id: 5, label: 'Semester 5' },
  { id: 6, label: 'Semester 6' },
  { id: 7, label: 'Semester 7' },
  { id: 8, label: 'Semester 8' },
];

export const subjects: Subject[] = [
  // CSE — Semester 1
  { id: 'cse-s1-maths1', universityId: 'vtu', branchId: 'cse', semester: 1, code: '21MAT11', name: 'Calculus & Linear Algebra', credits: 4 },
  { id: 'cse-s1-phy', universityId: 'vtu', branchId: 'cse', semester: 1, code: '21PHY12', name: 'Engineering Physics', credits: 4 },
  { id: 'cse-s1-bep', universityId: 'vtu', branchId: 'cse', semester: 1, code: '21ELN14', name: 'Basic Electronics', credits: 3 },
  { id: 'cse-s1-cprog', universityId: 'vtu', branchId: 'cse', semester: 1, code: '21CPP14', name: 'C Programming', credits: 3 },

  // CSE — Semester 2
  { id: 'cse-s2-maths2', universityId: 'vtu', branchId: 'cse', semester: 2, code: '21MAT21', name: 'Advanced Calculus & Numerical Methods', credits: 4 },
  { id: 'cse-s2-chem', universityId: 'vtu', branchId: 'cse', semester: 2, code: '21CHE22', name: 'Engineering Chemistry', credits: 4 },
  { id: 'cse-s2-bme', universityId: 'vtu', branchId: 'cse', semester: 2, code: '21ME25', name: 'Basic Mechanical Engineering', credits: 3 },

  // CSE — Semester 3
  { id: 'cse-s3-ds', universityId: 'vtu', branchId: 'cse', semester: 3, code: '21CS32', name: 'Data Structures', credits: 4 },
  { id: 'cse-s3-dm', universityId: 'vtu', branchId: 'cse', semester: 3, code: '21CS31', name: 'Discrete Mathematics', credits: 3 },
  { id: 'cse-s3-dsa', universityId: 'vtu', branchId: 'cse', semester: 3, code: '21CS33', name: 'Data Structures & Applications', credits: 3 },
  { id: 'cse-s3-math3', universityId: 'vtu', branchId: 'cse', semester: 3, code: '21MAT31', name: 'Transform Calculus & Statistics', credits: 4 },

  // CSE — Semester 4
  { id: 'cse-s4-dbms', universityId: 'vtu', branchId: 'cse', semester: 4, code: '21CS42', name: 'Database Management Systems', credits: 4 },
  { id: 'cse-s4-ada', universityId: 'vtu', branchId: 'cse', semester: 4, code: '21CS43', name: 'Analysis & Design of Algorithms', credits: 4 },
  { id: 'cse-s4-java', universityId: 'vtu', branchId: 'cse', semester: 4, code: '21CS44', name: 'Object Oriented Programming with Java', credits: 4 },
  { id: 'cse-s4-flat', universityId: 'vtu', branchId: 'cse', semester: 4, code: '21CS41', name: 'Formal Languages & Automata Theory', credits: 3 },

  // CSE — Semester 5
  { id: 'cse-s5-cn', universityId: 'vtu', branchId: 'cse', semester: 5, code: '21CS51', name: 'Computer Networks', credits: 4 },
  { id: 'cse-s5-os', universityId: 'vtu', branchId: 'cse', semester: 5, code: '21CS52', name: 'Operating Systems', credits: 4 },
  { id: 'cse-s5-se', universityId: 'vtu', branchId: 'cse', semester: 5, code: '21CS53', name: 'Software Engineering & Project Management', credits: 3 },
  { id: 'cse-s5-wt', universityId: 'vtu', branchId: 'cse', semester: 5, code: '21CS55', name: 'Web Technologies', credits: 3 },

  // CSE — Semester 6
  { id: 'cse-s6-cdp', universityId: 'vtu', branchId: 'cse', semester: 6, code: '21CS61', name: 'Compiler Design', credits: 4 },
  { id: 'cse-s6-ml', universityId: 'vtu', branchId: 'cse', semester: 6, code: '21CS62', name: 'Machine Learning', credits: 4 },
  { id: 'cse-s6-cgv', universityId: 'vtu', branchId: 'cse', semester: 6, code: '21CS63', name: 'Computer Graphics & Visualization', credits: 3 },
  { id: 'cse-s6-cns', universityId: 'vtu', branchId: 'cse', semester: 6, code: '21CS64', name: 'Cryptography & Network Security', credits: 3 },

  // CSE — Semester 7
  { id: 'cse-s7-ai', universityId: 'vtu', branchId: 'cse', semester: 7, code: '21CS71', name: 'Artificial Intelligence', credits: 4 },
  { id: 'cse-s7-dc', universityId: 'vtu', branchId: 'cse', semester: 7, code: '21CS72', name: 'Distributed Computing', credits: 3 },

  // CSE — Semester 8
  { id: 'cse-s8-project', universityId: 'vtu', branchId: 'cse', semester: 8, code: '21CSP8', name: 'Project Work', credits: 16 },
];

export function getSubjectsByBranchAndSem(branchId: string, semester: number): Subject[] {
  return subjects.filter((s) => s.branchId === branchId && s.semester === semester);
}

export function getBranchesByUniversity(universityId: string): Branch[] {
  return branches.filter((b) => b.universityId === universityId);
}
