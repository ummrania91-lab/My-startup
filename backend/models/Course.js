const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Course model — represents a collection of micro-lessons.
 *
 * Fields:
 *   id          – UUID primary key
 *   title       – course name
 *   description – short summary
 *   imageUrl    – cover image for the card UI
 */
const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;
