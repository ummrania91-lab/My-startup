// ── Subject suggestions (user can type anything) ───────────────
export const POPULAR_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English Literature', 'History', 'Economics', 'Psychology', 'Philosophy',
  'Business Studies', 'Accounting', 'Statistics', 'Calculus', 'Algebra',
  'Geometry', 'Trigonometry', 'Organic Chemistry', 'Quantum Physics',
  'Machine Learning', 'Web Development', 'Data Science', 'Art History',
  'Music Theory', 'Creative Writing', 'Law', 'Medicine', 'Engineering',
  'Architecture', 'Sociology', 'Political Science', 'Geography',
];

// ── AI Tutor chat stubs ────────────────────────────────────────
const TUTOR_RESPONSES = {
  explain: [
    "Great question! Let me break this down step by step.\n\n**Core Concept:**\nThink of it like building blocks — each piece connects to the next.\n\n**Step 1:** Start with the basics. Every complex idea is just simple ideas stacked together.\n\n**Step 2:** Once you see the pattern, the rest follows naturally.\n\nWant me to go deeper, or try a different angle?",
    "Let me explain this using an analogy.\n\nImagine you're cooking a recipe. Each ingredient (concept) plays a role, and the order matters.\n\n**The key insight:** Understanding *why* something works is more powerful than memorizing *how*.\n\nShould I give you a practice problem to test your understanding?",
    "Here's the simple version first:\n\n**In one sentence:** This concept is about understanding relationships between things.\n\n**Slightly deeper:** When A changes, B responds in a predictable way. The rule that governs this is what we're studying.\n\n**Full explanation:** The formal definition involves...\n\nWhich level would you like me to continue at?",
  ],
  quiz: [
    "Let's test your understanding!\n\n**Question:** Based on what we just discussed, which of the following is true?\n\nA) The relationship is always linear\nB) The outcome depends on initial conditions\nC) Order doesn't matter\nD) Only one solution exists\n\nTake your time — I'll explain after you answer.",
  ],
  encourage: [
    "You're making great progress! 💪 Let's keep the momentum going.",
    "That's exactly right! You're building solid understanding here.",
    "Good thinking! Even though that wasn't quite right, your reasoning shows you're on the right track.",
  ],
};

export function getTutorResponse(message, style = 'simple') {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lower = message.toLowerCase();
      let responses;
      if (lower.includes('quiz') || lower.includes('test me')) {
        responses = TUTOR_RESPONSES.quiz;
      } else if (lower.includes('explain') || lower.includes('what is') || lower.includes('how')) {
        responses = TUTOR_RESPONSES.explain;
      } else {
        responses = TUTOR_RESPONSES.encourage;
      }
      const text = responses[Math.floor(Math.random() * responses.length)];
      resolve({ role: 'assistant', text, timestamp: new Date().toISOString() });
    }, 800 + Math.random() * 1200);
  });
}

// ── Study plan stubs ───────────────────────────────────────────
export function generateStudyPlan(subjects, hoursPerDay, goal) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const plan = days.map((day, i) => ({
        day,
        sessions: subjects.slice(0, Math.min(3, subjects.length)).map((subj, j) => ({
          subject: subj,
          topic: `${subj} — Week Focus Area ${j + 1}`,
          duration: `${Math.max(1, Math.floor(hoursPerDay / subjects.length))}h`,
          type: j % 2 === 0 ? 'Study' : 'Practice',
          completed: false,
        })),
        isRest: i === 6,
      }));
      resolve({ plan, goal, createdAt: new Date().toISOString() });
    }, 1000);
  });
}

// ── Flashcard generation stubs ─────────────────────────────────
export function generateFlashcards(subject, topic) {
  const cards = [
    { id: 1, front: `What is the fundamental principle of ${topic || subject}?`, back: `The fundamental principle states that all elements in ${topic || subject} follow consistent rules that can be derived from core axioms.`, difficulty: 'medium', nextReview: new Date() },
    { id: 2, front: `Name three key applications of ${topic || subject}.`, back: `1. Problem solving in real-world scenarios\n2. Building frameworks for analysis\n3. Connecting to related disciplines`, difficulty: 'easy', nextReview: new Date() },
    { id: 3, front: `What common mistake do students make with ${topic || subject}?`, back: `The most common mistake is confusing correlation with causation — always verify with first principles.`, difficulty: 'hard', nextReview: new Date() },
    { id: 4, front: `How does ${topic || subject} relate to other fields?`, back: `It connects through shared mathematical foundations, logical reasoning, and empirical methods.`, difficulty: 'medium', nextReview: new Date() },
    { id: 5, front: `Explain ${topic || subject} like you're teaching a 10-year-old.`, back: `Imagine you have a box of LEGO. Each piece is a small idea. When you put them together following the instructions, you build something amazing!`, difficulty: 'easy', nextReview: new Date() },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(cards), 600));
}

// ── Quiz generation stubs ──────────────────────────────────────
export function generateQuiz(subject, difficulty = 'medium') {
  const questions = [
    { id: 'q1', question: `In ${subject}, which approach is most effective for solving complex problems?`, options: ['Memorize formulas', 'Understand underlying concepts', 'Skip to the answer', 'Guess and check'], correctIndex: 1 },
    { id: 'q2', question: `What is the best study strategy for ${subject}?`, options: ['Rereading notes', 'Active recall and testing', 'Highlighting textbooks', 'Watching videos passively'], correctIndex: 1 },
    { id: 'q3', question: `Which skill is most transferable from studying ${subject}?`, options: ['Memorization', 'Critical thinking', 'Speed reading', 'Note-taking'], correctIndex: 1 },
    { id: 'q4', question: `How should you approach a difficult topic in ${subject}?`, options: ['Skip it entirely', 'Break it into smaller parts', 'Only study easy parts', 'Wait until exam day'], correctIndex: 1 },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(questions), 500));
}

// ── Progress data stubs ────────────────────────────────────────
export function getProgressData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalStudyHours: 47,
        streak: 12,
        topicsCompleted: 34,
        quizzesTaken: 18,
        averageScore: 78,
        weeklyHours: [3, 4, 2, 5, 3, 4, 2],
        subjectStrengths: [
          { subject: 'Algebra', score: 92, status: 'strong' },
          { subject: 'Calculus', score: 45, status: 'weak' },
          { subject: 'Statistics', score: 78, status: 'moderate' },
          { subject: 'Geometry', score: 85, status: 'strong' },
          { subject: 'Physics', score: 55, status: 'weak' },
        ],
        recentActivity: [
          { date: 'Today', action: 'Completed Algebra quiz', score: 90 },
          { date: 'Today', action: 'Studied Calculus for 45 min', score: null },
          { date: 'Yesterday', action: 'Flashcard session — Statistics', score: 85 },
          { date: '2 days ago', action: 'Exam prep — Physics', score: 62 },
        ],
      });
    }, 500);
  });
}

// ── Research / summarization stubs ─────────────────────────────
export function summarizeContent(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const wordCount = text.split(/\s+/).length;
      resolve({
        summary: `This content (${wordCount} words) covers several key areas. The main argument centers around fundamental principles and their applications. Key evidence supports the thesis through multiple examples and case studies.`,
        keyPoints: [
          'The core concept revolves around systematic understanding',
          'Evidence supports multiple interpretations of the data',
          'Practical applications extend to real-world scenarios',
          'Further research is needed in emerging areas',
        ],
        readingTime: `${Math.ceil(wordCount / 200)} min`,
      });
    }, 1500);
  });
}

// ── Assignment helper stubs ────────────────────────────────────
export function solveStepByStep(problem) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        steps: [
          { step: 1, title: 'Understand the Problem', explanation: `First, let's identify what we're being asked. The problem is asking us to find a solution by analyzing the given information.`, highlight: 'Read carefully — most mistakes happen from misreading the question.' },
          { step: 2, title: 'Identify Key Information', explanation: 'Extract the important values, relationships, and constraints from the problem statement.', highlight: 'Write down what you know and what you need to find.' },
          { step: 3, title: 'Choose Your Approach', explanation: 'Based on the type of problem, select the most appropriate method or formula to apply.', highlight: 'There are often multiple valid approaches — pick the one you understand best.' },
          { step: 4, title: 'Work Through the Solution', explanation: 'Apply your chosen method step by step, showing all your work clearly.', highlight: 'Check each step before moving to the next.' },
          { step: 5, title: 'Verify Your Answer', explanation: 'Plug your answer back into the original problem to make sure it makes sense.', highlight: 'Does the answer feel reasonable? Always do a sanity check.' },
        ],
        tip: 'Remember: the goal isn\'t just getting the answer — it\'s understanding the reasoning so you can solve similar problems on your own.',
      });
    }, 1200);
  });
}

// ── Exam generator stubs ───────────────────────────────────────
export function generateExam(subject, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        subject,
        duration,
        totalMarks: 100,
        sections: [
          {
            name: 'Section A — Multiple Choice',
            marks: 30,
            questions: [
              { id: 'ea1', question: `Which fundamental concept in ${subject} is most commonly tested?`, options: ['Theory A', 'Theory B', 'Theory C', 'Theory D'], correctIndex: 1, marks: 10 },
              { id: 'ea2', question: `Apply the core formula to solve this problem in ${subject}.`, options: ['Result X', 'Result Y', 'Result Z', 'Result W'], correctIndex: 2, marks: 10 },
              { id: 'ea3', question: `Identify the error in this ${subject} solution.`, options: ['Step 1', 'Step 2', 'Step 3', 'No error'], correctIndex: 0, marks: 10 },
            ],
          },
          {
            name: 'Section B — Short Answer',
            marks: 40,
            questions: [
              { id: 'eb1', question: `Define the key principle and give two examples from ${subject}.`, type: 'text', marks: 20 },
              { id: 'eb2', question: `Explain how concept A relates to concept B in ${subject}.`, type: 'text', marks: 20 },
            ],
          },
          {
            name: 'Section C — Problem Solving',
            marks: 30,
            questions: [
              { id: 'ec1', question: `Solve the following ${subject} problem, showing all working.`, type: 'text', marks: 30 },
            ],
          },
        ],
      });
    }, 1000);
  });
}

// ── User profile / personalization stubs ───────────────────────
export function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Student',
        learningStyle: 'visual',
        level: 'intermediate',
        goals: ['Ace final exams', 'Learn calculus fundamentals', 'Improve problem-solving speed'],
        weakAreas: ['Calculus', 'Physics'],
        strongAreas: ['Algebra', 'Geometry'],
        preferredSessionLength: 25,
        dailyGoalMinutes: 120,
        subjects: ['Mathematics', 'Physics', 'Computer Science'],
      });
    }, 300);
  });
}

export function updateUserProfile(updates) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, ...updates }), 300);
  });
}
