const express = require('express');
const { getAllCourses, getCourseById } = require('../controllers/courseController');

const router = express.Router();

// GET /courses — list all courses
router.get('/', getAllCourses);

// GET /courses/:id — get a single course with its lessons
router.get('/:id', getCourseById);

module.exports = router;
