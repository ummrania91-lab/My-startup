const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * User model — stores account credentials and learning progress.
 *
 * Fields:
 *   id       – UUID primary key
 *   name     – display name
 *   email    – unique login identifier
 *   password – bcrypt hash
 *   progress – JSON map of { lessonId: completedBoolean }
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  progress: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
