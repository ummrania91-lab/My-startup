const { sequelize } = require('../config/db');
const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');
const Quiz = require('./Quiz');

// ── Associations ───────────────────────────────────────────────
// A course has many lessons; each lesson belongs to one course.
Course.hasMany(Lesson, { foreignKey: 'course_id', as: 'lessons' });
Lesson.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

// A lesson has many quiz questions; each quiz belongs to one lesson.
Lesson.hasMany(Quiz, { foreignKey: 'lesson_id', as: 'quizzes' });
Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });

/**
 * Sync all models with the database.
 * In production, use migrations instead of sync({ alter: true }).
 */
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models synchronized.');
  } catch (error) {
    console.error('Model sync failed:', error.message);
  }
}

module.exports = { User, Course, Lesson, Quiz, syncModels };
