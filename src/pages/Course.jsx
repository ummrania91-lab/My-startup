import { useState, useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import QuizCard from '../components/QuizCard';
import LoadingState from '../components/LoadingState';
import { fetchCourseById, generateNextLesson } from '../services/api';

const quizInitialState = { answers: {}, submitted: false, score: 0 };

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return { ...state, answers: { ...state.answers, [action.questionId]: action.optionIndex } };
    case 'SUBMIT':
      return { ...state, submitted: true, score: action.score };
    case 'RESET':
      return quizInitialState;
    default:
      return state;
  }
}

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, dispatch] = useReducer(quizReducer, quizInitialState);

  useEffect(() => {
    fetchCourseById(courseId).then((data) => {
      if (data) {
        setCourse(data);
        setLessons(data.lessons);
      }
      setLoading(false);
    });
  }, [courseId]);

  const completedLessons = currentLessonIndex;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleNextLesson = async () => {
    if (currentLessonIndex >= totalLessons - 1) {
      // Generate AI lesson
      setIsGenerating(true);
      const newLesson = await generateNextLesson(courseId, totalLessons);
      setLessons((prev) => [...prev, newLesson]);
      setCurrentLessonIndex((prev) => prev + 1);
      setIsGenerating(false);
    } else {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handleQuizSubmit = () => {
    if (!course) return;
    let correct = 0;
    course.quiz.forEach((q) => {
      if (quizState.answers[q.id] === q.correctIndex) correct++;
    });
    dispatch({ type: 'SUBMIT', score: correct });
  };

  const allQuizAnswered = course?.quiz?.every((q) => quizState.answers[q.id] !== undefined) ?? false;

  if (loading) {
    return (
      <div className="min-h-screen bg-sb-dark">
        <Navbar />
        <LoadingState message="Loading course..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-sb-dark">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Course Not Found</h2>
          <p className="text-gray-400 mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/" className="bg-sb-purple hover:bg-sb-purple/80 text-white font-semibold px-6 py-3 rounded-full transition-all">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-sb-dark">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-sb-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            {course.title}
          </h1>
          <p className="text-gray-400 mb-6">{course.description}</p>

          {/* Progress Bar */}
          <div className="bg-sb-gray rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sb-green to-sb-purple rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">
              {completedLessons} of {totalLessons} lessons completed
            </span>
            <span className="text-sb-green font-medium">{progressPercent}%</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson List (Sidebar) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <h3 className="font-heading text-lg font-bold text-white mb-4">Lessons</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  thumbnail={lesson.thumbnail}
                  isActive={index === currentLessonIndex}
                  isCompleted={index < currentLessonIndex}
                  onClick={() => setCurrentLessonIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Current Lesson Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative bg-sb-gray/30 border border-sb-gray/50 rounded-2xl p-6 sm:p-8 min-h-[300px]">
              {isGenerating ? (
                <LoadingState message="AI is crafting your next lesson..." />
              ) : (
                <>
                  {/* Lesson badge */}
                  <div className="inline-flex items-center gap-2 bg-sb-purple/15 border border-sb-purple/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-xs font-medium text-sb-purple">
                      Lesson {currentLessonIndex + 1} of {totalLessons}
                    </span>
                    <span className="text-xs text-gray-500">|</span>
                    <span className="text-xs text-gray-400">{currentLesson?.duration}</span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-white mb-4">
                    {currentLesson?.title}
                  </h2>

                  {/* Simulated lesson content */}
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    {currentLesson?.content ? (
                      <p>{currentLesson.content}</p>
                    ) : (
                      <>
                        <p>
                          Welcome to this micro-lesson on <strong className="text-white">{currentLesson?.title}</strong>.
                          This bite-sized lesson is designed to teach you the core concepts in just a few minutes.
                        </p>
                        <div className="bg-sb-dark/50 rounded-xl p-4 border border-sb-gray/30">
                          <p className="text-sb-green text-sm font-mono">
                            // Key concept: {currentLesson?.title}
                          </p>
                          <p className="text-gray-400 text-sm mt-2">
                            Practice this concept by applying it in small projects. Repetition builds mastery!
                          </p>
                        </div>
                        <p>
                          Remember: the best way to learn is by doing. Try applying what you've learned
                          in a quick exercise before moving to the next lesson.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Next Lesson Button */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                      onClick={handleNextLesson}
                      className="inline-flex items-center justify-center gap-2 bg-sb-purple hover:bg-sb-purple/80 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-sb-purple/25"
                    >
                      {currentLessonIndex >= totalLessons - 1 ? 'Generate Next Lesson' : 'Next Lesson'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    {!showQuiz && (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="inline-flex items-center justify-center gap-2 border border-sb-orange/50 text-sb-orange hover:bg-sb-orange/10 font-semibold px-6 py-3 rounded-full transition-all duration-200"
                      >
                        Take Quiz
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Quiz Section */}
            {showQuiz && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-white">Quick Quiz</h3>
                  {quizState.submitted && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-sb-green">
                        Score: {quizState.score}/{course.quiz.length}
                      </span>
                      <button
                        onClick={() => dispatch({ type: 'RESET' })}
                        className="text-sm text-sb-purple hover:text-sb-purple/80 font-medium transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {course.quiz.map((q) => (
                    <QuizCard
                      key={q.id}
                      question={q.question}
                      options={q.options}
                      selectedIndex={quizState.answers[q.id]}
                      onSelect={(optionIndex) =>
                        dispatch({ type: 'SELECT_ANSWER', questionId: q.id, optionIndex })
                      }
                      isSubmitted={quizState.submitted}
                      correctIndex={q.correctIndex}
                    />
                  ))}
                </div>

                {!quizState.submitted && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!allQuizAnswered}
                    className={`mt-6 inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-full transition-all duration-200 ${
                      allQuizAnswered
                        ? 'bg-sb-orange hover:bg-sb-orange/80 text-white hover:shadow-lg hover:shadow-sb-orange/25'
                        : 'bg-sb-gray text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Quiz
                  </button>
                )}

                {quizState.submitted && (
                  <div className={`mt-6 p-4 rounded-xl border ${
                    quizState.score === course.quiz.length
                      ? 'bg-sb-green/10 border-sb-green/30'
                      : quizState.score >= course.quiz.length / 2
                        ? 'bg-sb-purple/10 border-sb-purple/30'
                        : 'bg-sb-orange/10 border-sb-orange/30'
                  }`}>
                    <p className="font-heading font-bold text-lg text-white">
                      {quizState.score === course.quiz.length
                        ? 'Perfect Score! You nailed it!'
                        : quizState.score >= course.quiz.length / 2
                          ? 'Great job! Keep learning!'
                          : 'Keep practicing, you\'ll get there!'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      You got {quizState.score} out of {course.quiz.length} correct.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
