import type { PlacementCategory } from '@/types';

export const placementCategories: PlacementCategory[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    icon: 'Code2',
    description: 'Master DSA patterns and problem-solving for top product companies.',
    resources: [
      { id: 'dsa-1', title: 'Striver\'s DSA Sheet', description: '180 must-do questions curated by a top educator. Covers all patterns.', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', type: 'roadmap' },
      { id: 'dsa-2', title: 'LeetCode Top Interview 150', description: 'Questions frequently asked in FAANG interviews, organized by topic.', url: 'https://leetcode.com/studyplan/top-interview-150/', type: 'practice' },
      { id: 'dsa-3', title: 'NeetCode Roadmap', description: 'Visual roadmap of DSA topics with curated problems for each topic.', url: 'https://neetcode.io/roadmap', type: 'roadmap' },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude & Reasoning',
    icon: 'Brain',
    description: 'Quantitative aptitude, logical reasoning, and verbal ability for campus drives.',
    resources: [
      { id: 'apt-1', title: 'IndiaBIX Aptitude', description: 'Practice quantitative aptitude with solutions and shortcuts.', url: 'https://www.indiabix.com/', type: 'practice' },
      { id: 'apt-2', title: 'GeeksforGeeks Aptitude', description: 'Topic-wise aptitude questions with detailed explanations.', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/', type: 'practice' },
    ],
  },
  {
    id: 'core-cs',
    name: 'Core CS Concepts',
    icon: 'Cpu',
    description: 'OS, DBMS, CN, and OOP fundamentals asked in every technical interview.',
    resources: [
      { id: 'cs-1', title: 'InterviewBit CS Fundamentals', description: 'OS, DBMS, CN, OOP — interview questions with clean explanations.', url: 'https://www.interviewbit.com/courses/programming/', type: 'interview' },
      { id: 'cs-2', title: 'GeeksforGeeks Interview Corner', description: 'Company-wise and topic-wise interview questions and experiences.', url: 'https://www.geeksforgeeks.org/company-interview-corner/', type: 'interview' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: 'Database',
    description: 'SQL queries, joins, aggregations and database design for technical rounds.',
    resources: [
      { id: 'sql-1', title: 'SQLZoo', description: 'Interactive SQL exercises from beginner to advanced level.', url: 'https://sqlzoo.net/', type: 'practice' },
      { id: 'sql-2', title: 'LeetCode SQL 50', description: '50 essential SQL questions asked in top tech company interviews.', url: 'https://leetcode.com/studyplan/top-sql-50/', type: 'practice' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'Terminal',
    description: 'Python for automation, data science, and general programming interviews.',
    resources: [
      { id: 'py-1', title: 'Python.org Official Tutorial', description: 'The official Python tutorial — comprehensive and beginner-friendly.', url: 'https://docs.python.org/3/tutorial/', type: 'link' },
      { id: 'py-2', title: 'Real Python', description: 'High quality Python tutorials for all skill levels.', url: 'https://realpython.com/', type: 'link' },
    ],
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: 'Globe',
    description: 'HTML, CSS, JavaScript, React, and backend fundamentals for dev roles.',
    resources: [
      { id: 'web-1', title: 'The Odin Project', description: 'Free, open-source full-stack web development curriculum.', url: 'https://www.theodinproject.com/', type: 'roadmap' },
      { id: 'web-2', title: 'roadmap.sh Frontend', description: 'Visual frontend developer roadmap maintained by the community.', url: 'https://roadmap.sh/frontend', type: 'roadmap' },
    ],
  },
  {
    id: 'resume',
    name: 'Resume & LinkedIn',
    icon: 'FileText',
    description: 'Craft a resume that gets past ATS and impresses recruiters.',
    resources: [
      { id: 'res-1', title: 'Jake\'s Resume Template', description: 'Clean, ATS-friendly LaTeX resume template used by top engineers.', url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs', type: 'link' },
      { id: 'res-2', title: 'Resume Worded', description: 'AI-powered resume review and LinkedIn profile optimization.', url: 'https://resumeworded.com/', type: 'link' },
    ],
  },
  {
    id: 'interview-prep',
    name: 'Interview Prep',
    icon: 'Users',
    description: 'Behavioral questions, system design basics, and communication strategies.',
    resources: [
      { id: 'int-1', title: 'Pramp', description: 'Free mock technical interviews with peers.', url: 'https://www.pramp.com/', type: 'interview' },
      { id: 'int-2', title: 'System Design Primer', description: 'GitHub repo covering system design fundamentals and interview prep.', url: 'https://github.com/donnemartin/system-design-primer', type: 'link' },
    ],
  },
];
