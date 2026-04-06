const COURSES = [
  {
    id: 'course-1',
    title: 'Python Basics',
    description: 'Master Python fundamentals with bite-sized lessons perfect for beginners.',
    image: 'https://placehold.co/400x200/8B5CF6/FFFFFF?text=Python+Basics',
    lessons: [
      { id: 'l1', title: 'Variables & Data Types', duration: '5 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=Vars' },
      { id: 'l2', title: 'Control Flow & Loops', duration: '4 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=Loops' },
      { id: 'l3', title: 'Functions & Scope', duration: '5 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=Funcs' },
      { id: 'l4', title: 'Lists & Dictionaries', duration: '4 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=Lists' },
    ],
    quiz: [
      { id: 'q1', question: 'What keyword defines a function in Python?', options: ['func', 'def', 'function', 'define'], correctIndex: 1 },
      { id: 'q2', question: 'Which data type is immutable?', options: ['list', 'dict', 'set', 'tuple'], correctIndex: 3 },
      { id: 'q3', question: 'How do you start a for loop?', options: ['for x in range():', 'loop x:', 'foreach x:', 'iterate x:'], correctIndex: 0 },
    ],
  },
  {
    id: 'course-2',
    title: 'JavaScript Essentials',
    description: 'Learn modern JavaScript from arrow functions to async/await in quick lessons.',
    image: 'https://placehold.co/400x200/FF6B35/FFFFFF?text=JavaScript',
    lessons: [
      { id: 'l1', title: 'Variables: let, const, var', duration: '3 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=Vars' },
      { id: 'l2', title: 'Arrow Functions', duration: '4 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=Arrow' },
      { id: 'l3', title: 'Promises & Async/Await', duration: '5 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=Async' },
    ],
    quiz: [
      { id: 'q1', question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'global', 'define'], correctIndex: 1 },
      { id: 'q2', question: 'What does "===" check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correctIndex: 2 },
      { id: 'q3', question: 'What does async/await replace?', options: ['Callbacks only', 'Promise chains', 'Loops', 'Variables'], correctIndex: 1 },
    ],
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Basics',
    description: 'Understand design principles, color theory, and user-centered thinking.',
    image: 'https://placehold.co/400x200/39FF14/1A1A2E?text=UI/UX+Design',
    lessons: [
      { id: 'l1', title: 'Design Thinking 101', duration: '5 min', thumbnail: 'https://placehold.co/120x80/39FF14/1A1A2E?text=Design' },
      { id: 'l2', title: 'Color Theory', duration: '4 min', thumbnail: 'https://placehold.co/120x80/39FF14/1A1A2E?text=Color' },
      { id: 'l3', title: 'Typography Fundamentals', duration: '3 min', thumbnail: 'https://placehold.co/120x80/39FF14/1A1A2E?text=Type' },
      { id: 'l4', title: 'Wireframing & Prototyping', duration: '5 min', thumbnail: 'https://placehold.co/120x80/39FF14/1A1A2E?text=Wire' },
    ],
    quiz: [
      { id: 'q1', question: 'What is the first step in design thinking?', options: ['Prototype', 'Empathize', 'Define', 'Test'], correctIndex: 1 },
      { id: 'q2', question: 'Which colors are complementary?', options: ['Red & Orange', 'Blue & Green', 'Red & Green', 'Yellow & Orange'], correctIndex: 2 },
    ],
  },
  {
    id: 'course-4',
    title: 'React for Beginners',
    description: 'Build modern web apps with components, hooks, and state management.',
    image: 'https://placehold.co/400x200/8B5CF6/FFFFFF?text=React',
    lessons: [
      { id: 'l1', title: 'JSX & Components', duration: '5 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=JSX' },
      { id: 'l2', title: 'Props & State', duration: '4 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=State' },
      { id: 'l3', title: 'useEffect & Lifecycle', duration: '5 min', thumbnail: 'https://placehold.co/120x80/8B5CF6/FFFFFF?text=Effect' },
    ],
    quiz: [
      { id: 'q1', question: 'What hook manages state in a functional component?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], correctIndex: 1 },
      { id: 'q2', question: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Extra', 'JavaScript Extended'], correctIndex: 0 },
    ],
  },
  {
    id: 'course-5',
    title: 'Data Science Crash Course',
    description: 'Dive into pandas, NumPy, and data visualization in quick micro-lessons.',
    image: 'https://placehold.co/400x200/FF6B35/FFFFFF?text=Data+Science',
    lessons: [
      { id: 'l1', title: 'Intro to NumPy', duration: '5 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=NumPy' },
      { id: 'l2', title: 'Pandas DataFrames', duration: '5 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=Pandas' },
      { id: 'l3', title: 'Data Visualization with Matplotlib', duration: '4 min', thumbnail: 'https://placehold.co/120x80/FF6B35/FFFFFF?text=Viz' },
    ],
    quiz: [
      { id: 'q1', question: 'What is a DataFrame?', options: ['A chart', 'A 2D labeled data structure', 'A function', 'A loop'], correctIndex: 1 },
      { id: 'q2', question: 'Which library is used for numerical computing?', options: ['Pandas', 'Matplotlib', 'NumPy', 'Seaborn'], correctIndex: 2 },
    ],
  },
];

const AI_LESSON_TEMPLATES = [
  { title: 'Advanced Pattern Matching', content: 'Pattern matching lets you compare data against structures and extract parts. Think of it like a super-powered switch statement that can deconstruct objects and arrays.' },
  { title: 'Error Handling Best Practices', content: 'Good error handling means anticipating what can go wrong. Use try/catch blocks, create custom error types, and always provide meaningful error messages.' },
  { title: 'Working with APIs', content: 'APIs are bridges between applications. Learn to make HTTP requests, handle responses, parse JSON data, and manage authentication tokens.' },
  { title: 'Performance Optimization', content: 'Speed matters! Learn about memoization, lazy loading, debouncing, and how to profile your code to find bottlenecks.' },
  { title: 'Testing Fundamentals', content: 'Writing tests saves time in the long run. Start with unit tests for individual functions, then add integration tests for connected components.' },
];

export function fetchCourses() {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...COURSES]), 600)
  );
}

export function fetchCourseById(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(COURSES.find((c) => c.id === id) || null), 400)
  );
}

export function generateNextLesson(courseId, currentLessonIndex) {
  const template = AI_LESSON_TEMPLATES[currentLessonIndex % AI_LESSON_TEMPLATES.length];
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          id: `ai-${Date.now()}`,
          title: `AI Generated: ${template.title}`,
          duration: `${Math.floor(Math.random() * 3) + 3} min`,
          thumbnail: 'https://placehold.co/120x80/39FF14/1A1A2E?text=AI',
          content: template.content,
        }),
      1500
    )
  );
}
