const { Quiz } = require('../models');

// Stub quizzes for offline / empty-DB mode
const STUB_QUIZZES = {
  'l1-1': [
    { id: 'q1', lessonId: 'l1-1', question: 'What keyword defines a function in Python?', options: ['func', 'def', 'function', 'define'], correctAnswer: 1 },
    { id: 'q2', lessonId: 'l1-1', question: 'Which data type is immutable?', options: ['list', 'dict', 'set', 'tuple'], correctAnswer: 3 },
  ],
  'l1-2': [
    { id: 'q3', lessonId: 'l1-2', question: 'How do you start a for loop?', options: ['for x in range():', 'loop x:', 'foreach x:', 'iterate x:'], correctAnswer: 0 },
  ],
  'l2-1': [
    { id: 'q4', lessonId: 'l2-1', question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'global', 'define'], correctAnswer: 1 },
    { id: 'q5', lessonId: 'l2-1', question: 'What does "===" check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correctAnswer: 2 },
  ],
  'l2-2': [
    { id: 'q6', lessonId: 'l2-2', question: 'What does async/await replace?', options: ['Callbacks only', 'Promise chains', 'Loops', 'Variables'], correctAnswer: 1 },
  ],
  'l3-1': [
    { id: 'q7', lessonId: 'l3-1', question: 'What is the first step in design thinking?', options: ['Prototype', 'Empathize', 'Define', 'Test'], correctAnswer: 1 },
  ],
  'l4-1': [
    { id: 'q8', lessonId: 'l4-1', question: 'What hook manages state in a functional component?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], correctAnswer: 1 },
  ],
  'l5-1': [
    { id: 'q9', lessonId: 'l5-1', question: 'Which library is used for numerical computing?', options: ['Pandas', 'Matplotlib', 'NumPy', 'Seaborn'], correctAnswer: 2 },
  ],
};

/**
 * GET /quizzes/:lessonId
 * Return all quiz questions for a given lesson.
 * The response omits correctAnswer so the client cannot cheat.
 */
async function getQuizByLesson(req, res) {
  try {
    const { lessonId } = req.params;

    const quizzes = await Quiz.findAll({
      where: { lessonId },
      order: [['createdAt', 'ASC']],
    });

    if (quizzes.length > 0) {
      // Strip correct answers from the response
      const safe = quizzes.map(({ id, lessonId: lid, question, options }) => ({
        id, lessonId: lid, question, options,
      }));
      return res.json(safe);
    }

    // Fallback to stub data
    const stub = STUB_QUIZZES[lessonId];
    if (stub) {
      const safe = stub.map(({ correctAnswer, ...q }) => q);
      return res.json(safe);
    }

    return res.status(404).json({ error: 'No quiz found for this lesson.' });
  } catch (error) {
    console.error('getQuizByLesson error:', error.message);
    const stub = STUB_QUIZZES[req.params.lessonId];
    if (stub) {
      const safe = stub.map(({ correctAnswer, ...q }) => q);
      return res.json(safe);
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /quizzes/:lessonId/submit
 * Grade the user's quiz answers and return results.
 *
 * Body: { answers: { questionId: selectedIndex, ... } }
 */
async function submitQuiz(req, res) {
  try {
    const { lessonId } = req.params;
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'answers object is required.' });
    }

    // Try DB first, fall back to stubs
    let quizzes = await Quiz.findAll({ where: { lessonId } }).catch(() => []);

    if (quizzes.length === 0) {
      const stub = STUB_QUIZZES[lessonId];
      if (!stub) {
        return res.status(404).json({ error: 'No quiz found for this lesson.' });
      }
      // Convert stubs to quiz-like objects
      quizzes = stub;
    }

    let correct = 0;
    const results = quizzes.map((q) => {
      const qId = q.id;
      const userAnswer = answers[qId];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        questionId: qId,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    return res.json({
      lessonId,
      totalQuestions: quizzes.length,
      correctAnswers: correct,
      score: Math.round((correct / quizzes.length) * 100),
      results,
    });
  } catch (error) {
    console.error('submitQuiz error:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { getQuizByLesson, submitQuiz };
