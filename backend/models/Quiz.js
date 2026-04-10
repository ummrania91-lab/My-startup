const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Quiz model — a multiple-choice question attached to a lesson.
 *
 * Fields:
 *   id            – UUID primary key
 *   lessonId      – FK to lessons table
 *   question      – the question text
 *   options       – JSON array of answer strings
 *   correctAnswer – zero-based index into the options array
 */
const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'lesson_id',
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'correct_answer',
  },
}, {
  tableName: 'quizzes',
  timestamps: true,
});

module.exports = Quiz;
