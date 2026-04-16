import { useState, useEffect, useReducer, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import QuizCard from '../components/QuizCard';
import LoadingState from '../components/LoadingState';
import { fetchCourseById, generateNextLesson } from '../services/api';
import CanvasDraw from "react-canvas-draw"; // Stylus support

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
  
  // Ref for the Stylus/Pen Canvas
  const canvasRef = useRef(null);

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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-sb-purple transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">{course.title}</span>
        </div>

        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            {course.title}
          </h1>
          <p className="text-gray-400 mb-6">{course.description}</p>

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lessons List */}
          <div className="lg:col-span-1 order-3 lg:order-1">
            <h3 className="font-heading text-lg font-bold text-white mb-4">Lessons</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isActive={index === currentLessonIndex}
                  isCompleted={index < currentLessonIndex}
                  onClick={() => setCurrentLessonIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Center - Current Lesson Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative bg-sb-gray/30 border border-sb-gray/50 rounded-2xl p-6 sm:p-8 min-h-[300px]">
              {isGenerating ? (
                <LoadingState message="AI is crafting your next lesson..." />
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 bg-sb-purple/15 border border-sb-purple/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-xs font-medium text-sb-purple">
                      Lesson {currentLessonIndex + 1} of {totalLessons}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-white mb-4">
                    {currentLesson?.title}
                  </h2>

                  <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                    {currentLesson?.content ? <p>{currentLesson.content}</p> : <p>Welcome to this micro-lesson on {currentLesson?.title}...</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={handleNextLesson} className="bg-sb-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-sb-purple/80 transition-all">
                      {currentLessonIndex >= totalLessons - 1 ? 'Generate Next Lesson' : 'Next Lesson'}
                    </button>
                    {!showQuiz && (
                      <button onClick={() => setShowQuiz(true)} className="border border-sb-orange/50 text-sb-orange px-6 py-3 rounded-full font-semibold hover:bg-sb-orange/10 transition-all">
                        Take Quiz
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            
            {/* Quiz Section (remains visible here when toggled) */}
            {showQuiz && (
                <div className="mt-8 bg-sb-gray/20 p-6 rounded-2xl border border-sb-orange/20">
                    <h3 className="text-white font-bold mb-4">Quick Quiz</h3>
                    {course.quiz.map((q) => (
                        <QuizCard
                            key={q.id}
                            question={q.question}
                            options={q.options}
                            selectedIndex={quizState.answers[q.id]}
                            onSelect={(idx) => dispatch({ type: 'SELECT_ANSWER', questionId: q.id, optionIndex: idx })}
                            isSubmitted={quizState.submitted}
                            correctIndex={q.correctIndex}
                        />
                    ))}
                    {!quizState.submitted && (
                        <button onClick={handleQuizSubmit} disabled={!allQuizAnswered} className="mt-4 bg-sb-orange text-white px-8 py-2 rounded-full disabled:opacity-50">
                            Submit Quiz
                        </button>
                    )}
                </div>
            )}
          </div>

          {/* Right Sidebar - AI Study Agent & Stylus Notes (NEW) */}
          <div className="lg:col-span-1 order-2 lg:order-3">
            <div className="bg-[#F5F5DC] p-5 rounded-2xl border border-[#D2B48C] sticky top-8">
              <div className="flex items-center gap-2 mb-4 border-b border-[#D2B48C] pb-2">
                 <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center text-white text-xs">AI</div>
                 <h4 className="text-[#5D4037] font-bold text-sm">Study Agent</h4>
              </div>
              
              <p className="text-[#5D4037] text-xs mb-4 italic opacity-80">
                Using Feynman Technique to assess your pace...
              </p>

              {/* Note Taking Area with Stylus Support */}
              <div className="relative bg-white/50 rounded-lg border border-[#D2B48C] overflow-hidden">
                <div className="p-2 text-[10px] text-[#5D4037] font-bold border-b border-[#D2B48C]">STYLUS NOTES</div>
                <CanvasDraw
                    ref={canvasRef}
                    brushColor="#5D4037"
                    canvasWidth="100%"
                    canvasHeight={200}
                    brushRadius={1}
                    lazyRadius={0}
                    backgroundColor="transparent"
                />
              </div>

              <textarea 
                className="w-full bg-transparent mt-3 p-2 text-xs text-[#5D4037] border-b border-[#D2B48C] focus:outline-none placeholder-[#D2B48C]"
                placeholder="Type your summary for AI review..."
              />

              <div className="mt-4 space-y-2">
                <button className="w-full bg-[#2E7D32] text-white text-[11px] py-2 rounded-lg font-bold">
                    Summarize Lesson
                </button>
                <button className="w-full border border-[#2E7D32] text-[#2E7D32] text-[11px] py-2 rounded-lg font-bold">
                    Generate Flashcards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
