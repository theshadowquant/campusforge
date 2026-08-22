import type { QuizQuestion } from '@/types';

// Demo quiz questions for DBMS, ADA, Java — used when no AI API is configured.
// These are clearly marked as demo content.

export const demoQuestions: Record<string, QuizQuestion[]> = {
  'cse-s4-dbms': [
    {
      id: 'q-dbms-1',
      question: 'Which normal form eliminates partial dependencies?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctIndex: 1,
      explanation: '2NF eliminates partial dependencies — where a non-key attribute depends on part of a composite primary key.',
    },
    {
      id: 'q-dbms-2',
      question: 'In SQL, which clause is used to filter groups after GROUP BY?',
      options: ['WHERE', 'FILTER', 'HAVING', 'ORDER BY'],
      correctIndex: 2,
      explanation: 'HAVING is used to filter groups created by GROUP BY, while WHERE filters rows before grouping.',
    },
    {
      id: 'q-dbms-3',
      question: 'A foreign key constraint ensures:',
      options: ['Uniqueness of values', 'Referential integrity', 'Entity integrity', 'Domain integrity'],
      correctIndex: 1,
      explanation: 'A foreign key ensures referential integrity — that the value in the referencing table matches a primary key in the referenced table.',
    },
    {
      id: 'q-dbms-4',
      question: 'Which of the following is NOT a property of a transaction (ACID)?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Dependency'],
      correctIndex: 3,
      explanation: 'The ACID properties are Atomicity, Consistency, Isolation, and Durability. "Dependency" is not an ACID property.',
    },
    {
      id: 'q-dbms-5',
      question: 'An ER diagram is used for:',
      options: ['Writing SQL queries', 'Conceptual database design', 'Physical storage design', 'Query optimization'],
      correctIndex: 1,
      explanation: 'ER (Entity-Relationship) diagrams are used for conceptual database design to represent entities and their relationships.',
    },
  ],
  'cse-s4-ada': [
    {
      id: 'q-ada-1',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
      correctIndex: 2,
      explanation: 'Binary search runs in O(log n) because it halves the search space with each comparison.',
    },
    {
      id: 'q-ada-2',
      question: 'Which algorithmic strategy does Merge Sort use?',
      options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
      correctIndex: 2,
      explanation: 'Merge Sort uses Divide and Conquer — it divides the array in half, recursively sorts each half, and merges them.',
    },
    {
      id: 'q-ada-3',
      question: 'The knapsack problem is optimally solved using:',
      options: ['Greedy algorithm (always)', 'Dynamic Programming', 'Backtracking', 'It cannot be solved'],
      correctIndex: 1,
      explanation: 'The 0/1 knapsack problem is solved optimally using Dynamic Programming. The fractional version can use Greedy.',
    },
    {
      id: 'q-ada-4',
      question: 'Which data structure is used in Dijkstra\'s algorithm for optimization?',
      options: ['Stack', 'Queue', 'Priority Queue (Min-Heap)', 'Deque'],
      correctIndex: 2,
      explanation: 'Dijkstra\'s algorithm uses a Priority Queue (Min-Heap) to greedily select the next vertex with the smallest tentative distance.',
    },
    {
      id: 'q-ada-5',
      question: 'The Master Theorem is used to solve:',
      options: ['Graph problems', 'Recurrence relations', 'Sorting problems', 'NP-hard problems'],
      correctIndex: 1,
      explanation: 'The Master Theorem provides a formula to determine the time complexity of algorithms defined by recurrence relations.',
    },
  ],
  'cse-s4-java': [
    {
      id: 'q-java-1',
      question: 'Which keyword is used to prevent a method from being overridden?',
      options: ['static', 'abstract', 'final', 'private'],
      correctIndex: 2,
      explanation: 'The "final" keyword prevents a method from being overridden in a subclass.',
    },
    {
      id: 'q-java-2',
      question: 'What is the output of: System.out.println(10 + 20 + "hello");',
      options: ['"1020hello"', '"30hello"', 'Compilation error', '"hello3020"'],
      correctIndex: 1,
      explanation: 'Java evaluates left to right: 10+20=30, then 30+"hello" = "30hello". The + operator does string concatenation when one operand is a String.',
    },
    {
      id: 'q-java-3',
      question: 'Which interface must be implemented to use Java\'s for-each loop on a custom class?',
      options: ['Comparable', 'Iterable', 'Iterator', 'Serializable'],
      correctIndex: 1,
      explanation: 'A class must implement the Iterable interface to be usable in a for-each (enhanced for) loop.',
    },
    {
      id: 'q-java-4',
      question: 'In Java, a constructor CAN have:',
      options: ['A return type of void', 'The static keyword', 'The same name as the class', 'The abstract keyword'],
      correctIndex: 2,
      explanation: 'A constructor must have the same name as the class. It cannot have a return type, be static, or be abstract.',
    },
    {
      id: 'q-java-5',
      question: 'What does the "transient" keyword do in Java?',
      options: ['Makes a variable thread-safe', 'Skips a variable during serialization', 'Prevents a variable from being modified', 'Makes a variable final'],
      correctIndex: 1,
      explanation: 'The "transient" keyword marks a variable to be skipped during Java serialization — its value won\'t be saved.',
    },
  ],
};

export function getDemoQuestions(subjectId: string, count: number): QuizQuestion[] {
  const pool = demoQuestions[subjectId] ?? demoQuestions['cse-s4-dbms'];
  return pool.slice(0, Math.min(count, pool.length));
}
