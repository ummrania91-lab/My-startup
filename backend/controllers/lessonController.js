const { Lesson, User } = require('../models');

// Stub lessons for offline / empty-DB mode
const STUB_LESSONS = {
  'l1-1': { id: 'l1-1', courseId: 'course-1', title: 'Variables & Data Types', content: 'Variables are containers for storing data.\n\n**Python data types:**\n- `str` — text ("hello")\n- `int` — whole numbers (42)\n- `float` — decimals (3.14)\n- `bool` — True / False\n\nUse `type(x)` to check a variable\'s type.', duration: '5 min', order: 1 },
  'l2-1': { id: 'l2-1', courseId: 'course-2', title: 'Variables: let, const, var', content: '`let` and `const` are block-scoped. `var` is function-scoped and hoisted.\n\n**Rules:**\n- Use `const` by default\n- Use `let` only when you need to reassign\n- Avoid `var` in modern code', duration: '3 min', order: 1 },
};

/**
 * GET /lessons/:id
 * Return a single lesson by ID.
 */
async function getLessonById(req, res) {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (lesson) return res.json(lesson);

    // Fallback to stub
    const stub = STUB_LESSONS[req.params.id];
    if (stub) return res.json(stub);

    return res.status(404).json({ error: 'Lesson not found.' });
  } catch (error) {
    console.error('getLessonById error:', error.message);
    const stub = STUB_LESSONS[req.params.id];
    if (stub) return res.json(stub);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /lessons/:id/progress
 * Mark a lesson as complete (or update progress) for the authenticated user.
 *
 * Body: { userId, completed }
 * In production, userId would come from the JWT middleware.
 */
async function updateProgress(req, res) {
  try {
    const { userId, completed } = req.body;
    const lessonId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Merge the new progress into the existing progress map
    const progress = { ...user.progress, [lessonId]: !!completed };
    await user.update({ progress });

    return res.json({
      message: 'Progress updated.',
      progress,
    });
  } catch (error) {
    console.error('updateProgress error:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { getLessonById, updateProgress };
