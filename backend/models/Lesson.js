const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Lesson model — a single micro-lesson within a course.
 *
 * Fields:
 *   id       – UUID primary key
 *   courseId  – FK to courses table
 *   title    – lesson name
 *   content  – full lesson text / markdown
 *   duration – estimated reading time (e.g. "5 min")
 *   order    – position within the course
 */
const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  duration: {
    type: DataTypes.STRING,
    defaultValue: '5 min',
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'lessons',
  timestamps: true,
});

module.exports = Lesson;
