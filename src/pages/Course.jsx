import { useState, useEffect, useReducer, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import QuizCard from '../components/QuizCard';
import LoadingState from '../components/LoadingState';
import { fetchCourseById, generateNextLesson } from '../services/api';
// IMPORTANT: Ensure "react-canvas-draw" is in your package.json dependencies!
import CanvasDraw from "react-canvas-draw"; 

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
  
  // States for AI Agent Output
  const [agentOutput, setAgentOutput] = useState("");
  const [isAgentLoading, setIsAgentLoading] = useState(false);
  const [typedNotes, setTypedNotes] = useState("");

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

  // AI Agent Logic: Feynman Technique & Flashcards
  const handleAgentRequest = async (taskType) => {
    setIsAgentLoading(true);
    try {
      // In a real setup, you'd call callStudyAgent(typedNotes, taskType) here
      // For now, this triggers the "Brain" logic we discussed
      console.log(`Agent Task: ${taskType} with notes: ${typedNotes}`);
      
      // Simulating a response until your Supabase Edge Function is live
      setTimeout(() => {
        setAgentOutput(`I have analyzed your notes. Since you are studying ${course?.title}, I recommend focusing on the connection between the core concepts. Would you like me to generate 5 flashcards now?`);
        setIsAgentLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsAgentLoading(false);
    }
  };

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

  if (loading) return <div className="min-h-screen bg-sb-dark"><Navbar /><LoadingState message="Loading course..." /></div>;

  if (!course) return <div className="min-h-screen bg-sb-dark"><Navbar /><div className="py-20 text-center text-white">Course Not Found</div><Footer /></div>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-sb-dark">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Lessons */}
          <div className="lg:col-span-1 order-3 lg:order-1">
            <h3 className="text-white font-bold mb-4">Lessons</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <LessonCard key={lesson.id} title={lesson.title} isActive={index === currentLessonIndex} onClick={() => setCurrentLessonIndex(index)} />
              ))}
            </div>
          </div>

          {/* Center - Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-sb-gray/30 border border-sb-gray/50 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{currentLesson?.title}</h2>
              <div className="text-gray-300 mb-8">
                {currentLesson?.content || "Content loading..."}
              </div>
              <div className="flex gap-3">
                <button onClick={handleNextLesson} className="bg-sb-purple text-white px-6 py-2 rounded-full">Next Lesson</button>
                {!showQuiz && <button onClick={() => setShowQuiz(true)} className="border border-sb-orange text-sb-orange px-6 py-2 rounded-full">Quiz</button>}
              </div>
            </div>

            {/* AI Agent Output Display */}
            {agentOutput && (
              <div className="mt-6 p-4 bg-[#F5F5DC] border-l-4 border-[#2E7D32] rounded-r-xl shadow-md">
                <h5 className="text-[#2E7D32] font-bold text-xs uppercase tracking-widest mb-1">Agent Assessment</h5>
                <p className="text-[#5D4037] text-sm leading-relaxed">{agentOutput}</p>
              </div>
            )}
          </div>

          {/* Right Sidebar - AI Study Agent & Canvas */}
          <div className="lg:col-span-1 order-2 lg:order-3">
            <div className="bg-[#F5F5DC] p-5 rounded-2xl border border-[#D2B48C] sticky top-8 shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#D2B48C] pb-2">
                 <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center text-white text-xs">AI</div>
                 <h4 className="text-[#5D4037] font-bold text-sm">Study Agent</h4>
              </div>

              {/* FIXED CANVAS: Added explicit background and width logic */}
              <div className="relative bg-white rounded-lg border border-[#D2B48C] overflow-hidden">
                <div className="p-1 text-[9px] text-white bg-[#D2B48C] font-bold text-center">STYLUS / NOTES CANVAS</div>
                <CanvasDraw
                    ref={canvasRef}
                    brushColor="#5D4037"
                    canvasWidth={250} // Explicit width fix
                    canvasHeight={180}
                    brushRadius={2}
                    lazyRadius={0}
                    backgroundColor="#FFFFFF"
                />
                <button 
                  onClick={() => canvasRef.current.clear()} 
                  className="absolute bottom-1 right-1 text-[9px] bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Clear
                </button>
              </div>

              <textarea 
                className="w-full bg-white/50 mt-3 p-3 text-xs text-[#5D4037] border border-[#D2B48C] rounded-lg focus:ring-1 focus:ring-[#2E7D32] focus:outline-none"
                placeholder="Type your summary for AI review..."
                rows="4"
                value={typedNotes}
                onChange={(e) => setTypedNotes(e.target.value)}
              />

              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => handleAgentRequest('SUMMARIZE')}
                  disabled={isAgentLoading}
                  className="w-full bg-[#2E7D32] text-white text-[11px] py-2.5 rounded-lg font-bold hover:bg-[#1B5E20] transition-colors"
                >
                    {isAgentLoading ? "Analyzing..." : "Summarize (Feynman)"}
                </button>
                <button 
                  onClick={() => handleAgentRequest('FLASHCARDS')}
                  className="w-full border border-[#2E7D32] text-[#2E7D32] text-[11px] py-2.5 rounded-lg font-bold hover:bg-[#2E7D32]/5"
                >
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
