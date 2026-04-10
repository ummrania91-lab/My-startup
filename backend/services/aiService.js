/**
 * AI Service — stub functions that simulate AI-generated lesson content.
 *
 * In production, these would call an LLM API (e.g. Claude, GPT).
 * For now they return realistic mock data after a short delay.
 */

const lessonTemplates = [
  {
    title: 'Pattern Matching & Destructuring',
    content:
      'Pattern matching lets you compare data against structures and extract parts. ' +
      'Think of it like a super-powered switch statement that can deconstruct objects and arrays.\n\n' +
      '**Key concepts:**\n' +
      '- Structural matching: compare shapes, not just values\n' +
      '- Guard clauses: add conditions to branches\n' +
      '- Exhaustiveness: the compiler warns you about uncovered cases\n\n' +
      '**Try it:** Write a function that classifies shapes by their properties.',
    duration: '5 min',
  },
  {
    title: 'Error Handling Best Practices',
    content:
      'Good error handling means anticipating what can go wrong without cluttering the happy path.\n\n' +
      '**Principles:**\n' +
      '- Fail fast: validate inputs at boundaries\n' +
      '- Use typed errors so callers can match on them\n' +
      '- Never swallow exceptions silently — log or re-throw\n' +
      '- Return meaningful HTTP status codes (400 vs 500)\n\n' +
      '**Exercise:** Refactor a function to use custom error classes.',
    duration: '4 min',
  },
  {
    title: 'Working with REST APIs',
    content:
      'APIs are the bridges between frontend and backend. A REST API organises resources under URLs ' +
      'and uses HTTP verbs (GET, POST, PUT, DELETE) for operations.\n\n' +
      '**Best practices:**\n' +
      '- Use nouns for endpoints (/users, /courses), not verbs\n' +
      '- Version your API (/v1/courses)\n' +
      '- Return consistent JSON shapes with status codes\n' +
      '- Handle pagination for list endpoints\n\n' +
      '**Mini-project:** Build a CRUD API for a to-do list.',
    duration: '5 min',
  },
  {
    title: 'Performance Optimization Techniques',
    content:
      'Speed matters for user experience and SEO. Start by measuring, then optimise the bottleneck.\n\n' +
      '**Techniques:**\n' +
      '- Memoisation: cache expensive calculations\n' +
      '- Lazy loading: defer work until it is needed\n' +
      '- Debouncing: batch rapid-fire events\n' +
      '- Database indexing: speed up frequent queries\n\n' +
      '**Challenge:** Profile a slow page and cut its load time in half.',
    duration: '4 min',
  },
  {
    title: 'Introduction to Testing',
    content:
      'Tests give you confidence to change code without breaking things.\n\n' +
      '**Layers of testing:**\n' +
      '- Unit tests — single functions in isolation\n' +
      '- Integration tests — multiple modules working together\n' +
      '- End-to-end tests — real user flows in a browser\n\n' +
      '**Getting started:**\n' +
      '1. Pick a test runner (Jest, Vitest, Mocha)\n' +
      '2. Write one test for the simplest function you have\n' +
      '3. Run tests on every commit with a pre-commit hook',
    duration: '5 min',
  },
  {
    title: 'State Management Patterns',
    content:
      'As apps grow, you need a strategy for shared state.\n\n' +
      '**Common approaches:**\n' +
      '- Local state (useState) — for component-specific data\n' +
      '- Context API — for app-wide values (theme, auth)\n' +
      '- External stores (Redux, Zustand) — for complex, cross-cutting state\n\n' +
      '**Rule of thumb:** Start simple; promote state upward only when two+ components need it.\n\n' +
      '**Exercise:** Convert a prop-drilling chain to Context.',
    duration: '4 min',
  },
  {
    title: 'Database Design Fundamentals',
    content:
      'A well-designed schema saves countless hours of refactoring later.\n\n' +
      '**Core principles:**\n' +
      '- Normalise to 3NF to eliminate redundancy\n' +
      '- Use foreign keys to enforce relationships\n' +
      '- Index columns that appear in WHERE and JOIN clauses\n' +
      '- Prefer UUIDs over auto-increment for distributed systems\n\n' +
      '**Practice:** Design a schema for a blog with authors, posts, and comments.',
    duration: '5 min',
  },
];

/**
 * Simulate AI generating a micro-lesson for a user.
 *
 * @param {string} courseId  — the course to generate content for
 * @param {string} userId   — the learner (could personalise in future)
 * @returns {Promise<Object>} — { title, content, duration }
 */
async function generateLesson(courseId, userId) {
  // Simulate network / inference latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Pick a template based on a pseudo-random index
  const index = Math.floor(Math.random() * lessonTemplates.length);
  const template = lessonTemplates[index];

  return {
    title: `AI Generated: ${template.title}`,
    content: template.content,
    duration: template.duration,
    generatedAt: new Date().toISOString(),
    meta: {
      courseId,
      userId,
      model: 'skillbites-ai-v1-stub',
    },
  };
}

module.exports = { generateLesson };
