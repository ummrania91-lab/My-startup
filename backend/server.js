require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { syncModels } = require('./models');
const { generateLesson } = require('./services/aiService');

// Route imports
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const quizRoutes = require('./routes/quizzes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/lessons', lessonRoutes);
app.use('/quizzes', quizRoutes);

// AI lesson generation endpoint
app.post('/ai/generateLesson', async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required.' });
    }

    const lesson = await generateLesson(courseId, userId || 'anonymous');
    return res.json(lesson);
  } catch (error) {
    console.error('AI generateLesson error:', error.message);
    return res.status(500).json({ error: 'Failed to generate lesson.' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start ──────────────────────────────────────────────────────
async function start() {
  // Attempt DB connection (non-blocking — server runs even if DB is down)
  await connectDB();
  await syncModels();

  app.listen(PORT, () => {
    console.log(`SkillBites API running on http://localhost:${PORT}`);
  });
}

start();
