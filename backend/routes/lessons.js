const express = require('express');
const { getLessonById, updateProgress } = require('../controllers/lessonController');

const router = express.Router();

// GET /lessons/:id — get a single lesson's details
router.get('/:id', getLessonById);

// POST /lessons/:id/progress — mark lesson as complete for a user
router.post('/:id/progress', updateProgress);

module.exports = router;
