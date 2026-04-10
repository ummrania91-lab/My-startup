const express = require('express');
const { getQuizByLesson, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

// GET /quizzes/:lessonId — get quiz questions for a lesson
router.get('/:lessonId', getQuizByLesson);

// POST /quizzes/:lessonId/submit — submit answers and get graded results
router.post('/:lessonId/submit', submitQuiz);

module.exports = router;
