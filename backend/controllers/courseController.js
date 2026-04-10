const { Course, Lesson } = require('../models');

// ── Fallback stub data (used when the database is unavailable) ──
const STUB_COURSES = [
  {
    id: 'course-1',
    title: 'Python Basics',
    description: 'Master Python fundamentals with bite-sized lessons perfect for beginners.',
    imageUrl: 'https://placehold.co/400x200/8B5CF6/FFFFFF?text=Python+Basics',
    lessons: [
      { id: 'l1-1', title: 'Variables & Data Types', content: 'Learn about strings, ints, floats, and booleans.', duration: '5 min', order: 1 },
      { id: 'l1-2', title: 'Control Flow & Loops', content: 'Master if/else, for, and while loops.', duration: '4 min', order: 2 },
      { id: 'l1-3', title: 'Functions & Scope', content: 'Define reusable blocks of code with def.', duration: '5 min', order: 3 },
    ],
  },
  {
    id: 'course-2',
    title: 'JavaScript Essentials',
    description: 'Learn modern JavaScript from arrow functions to async/await in quick lessons.',
    imageUrl: 'https://placehold.co/400x200/FF6B35/FFFFFF?text=JavaScript',
    lessons: [
      { id: 'l2-1', title: 'Variables: let, const, var', content: 'Understand block scoping and hoisting.', duration: '3 min', order: 1 },
      { id: 'l2-2', title: 'Arrow Functions', content: 'Concise syntax and lexical this binding.', duration: '4 min', order: 2 },
      { id: 'l2-3', title: 'Promises & Async/Await', content: 'Handle asynchronous operations elegantly.', duration: '5 min', order: 3 },
    ],
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Basics',
    description: 'Understand design principles, color theory, and user-centered thinking.',
    imageUrl: 'https://placehold.co/400x200/39FF14/1A1A2E?text=UI/UX+Design',
    lessons: [
      { id: 'l3-1', title: 'Design Thinking 101', content: 'Empathize, define, ideate, prototype, test.', duration: '5 min', order: 1 },
      { id: 'l3-2', title: 'Color Theory', content: 'Complementary, analogous, and triadic schemes.', duration: '4 min', order: 2 },
    ],
  },
  {
    id: 'course-4',
    title: 'React for Beginners',
    description: 'Build modern web apps with components, hooks, and state management.',
    imageUrl: 'https://placehold.co/400x200/8B5CF6/FFFFFF?text=React',
    lessons: [
      { id: 'l4-1', title: 'JSX & Components', content: 'Write HTML-like syntax inside JavaScript.', duration: '5 min', order: 1 },
      { id: 'l4-2', title: 'Props & State', content: 'Pass data down and manage local state with hooks.', duration: '4 min', order: 2 },
    ],
  },
  {
    id: 'course-5',
    title: 'Data Science Crash Course',
    description: 'Dive into pandas, NumPy, and data visualization in quick micro-lessons.',
    imageUrl: 'https://placehold.co/400x200/FF6B35/FFFFFF?text=Data+Science',
    lessons: [
      { id: 'l5-1', title: 'Intro to NumPy', content: 'Efficient numerical computing with arrays.', duration: '5 min', order: 1 },
      { id: 'l5-2', title: 'Pandas DataFrames', content: 'Tabular data manipulation made easy.', duration: '5 min', order: 2 },
    ],
  },
];

/**
 * GET /courses
 * Return all courses (without nested lessons for the list view).
 */
async function getAllCourses(req, res) {
  try {
    const courses = await Course.findAll({
      order: [['createdAt', 'ASC']],
    });

    // If the DB is empty, fall back to stub data
    if (courses.length === 0) {
      return res.json(STUB_COURSES.map(({ lessons, ...c }) => c));
    }

    return res.json(courses);
  } catch (error) {
    console.error('getAllCourses error:', error.message);
    // Graceful fallback when DB is unreachable
    return res.json(STUB_COURSES.map(({ lessons, ...c }) => c));
  }
}

/**
 * GET /courses/:id
 * Return a single course with its lessons.
 */
async function getCourseById(req, res) {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Lesson, as: 'lessons', order: [['order', 'ASC']] }],
    });

    if (course) return res.json(course);

    // Fallback to stub data
    const stub = STUB_COURSES.find((c) => c.id === req.params.id);
    if (stub) return res.json(stub);

    return res.status(404).json({ error: 'Course not found.' });
  } catch (error) {
    console.error('getCourseById error:', error.message);
    const stub = STUB_COURSES.find((c) => c.id === req.params.id);
    if (stub) return res.json(stub);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { getAllCourses, getCourseById };
