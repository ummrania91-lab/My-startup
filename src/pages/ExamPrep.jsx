import { useState, useEffect, useRef, useReducer } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuizCard from '../components/QuizCard';
import LoadingState from '../components/LoadingState';
import SubjectSelector from '../components/SubjectSelector';
import { generateExam } from '../services/api';

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT': return { ...state, answers: { ...state.answers, [action.qId]: action.idx } };
    case 'SUBMIT': return { ...state, submitted: true, score: action.score };
    case 'RESET': return { answers: {}, submitted: false, score: 0 };
    default: return state;
  }
}

export default function ExamPrep() {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(30);
  const timerRef = useRef(null);
  const [quiz, dispatch] = useReducer(quizReducer, { answers: {}, submitted: false, score: 0 });

  const handleGenerate = async (subject) => {
    setLoading(true);
    const result = await generateExam(subject, duration);
    setExam(result);
    setLoading(false);
  };

  const startExam = () => {
    setStarted(true);
    setTimeLeft(duration * 60);
  };

  useEffect(() => {
    if (started && timeLeft > 0 && !quiz.submitted) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && started && !quiz.submitted) {
      handleSubmit();
    }
    return () => clearInterval(timerRef.current);
  }, [started, timeLeft, quiz.submitted]);

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    if (!exam) return;
    const mcqs = exam.sections[0]?.questions || [];
    let correct = 0;
    mcqs.forEach((q) => { if (quiz.answers[q.id] === q.correctIndex) correct++; });
    dispatch({ type: 'SUBMIT', score: correct });
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const mcqs = exam?.sections[0]?.questions || [];
  const allAnswered = mcqs.every((q) => quiz.answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">🎓 Exam Prep Mode</h1>
        <p className="text-sb-brown-med mb-8">Simulate timed exams with predicted questions and real feedback.</p>

        {!exam && !loading && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="font-heading text-xl font-bold text-sb-brown-dark mb-2">Set Up Your Exam</h2>
            <div className="max-w-xs mx-auto mb-6">
              <label className="block text-sm font-semibold text-sb-brown-dark mb-2">Duration: {duration} minutes</label>
              <input type="range" min="10" max="120" step="5" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-sb-green" />
            </div>
            <SubjectSelector onSelect={handleGenerate} placeholder="Choose exam subject..." />
          </div>
        )}

        {loading && <LoadingState message="Generating your exam..." />}

        {exam && !started && !loading && (
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-sb-brown-dark mb-2">{exam.subject} Exam</h2>
            <p className="text-sb-brown-med mb-1">{exam.duration} minutes — {exam.totalMarks} marks</p>
            <p className="text-sm text-sb-brown-med mb-6">{exam.sections.length} sections</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {exam.sections.map((s) => (
                <span key={s.name} className="bg-sb-beige text-sb-brown-dark text-sm font-medium px-4 py-2 rounded-full">{s.name} ({s.marks} marks)</span>
              ))}
            </div>
            <button onClick={startExam} className="bg-sb-green hover:bg-sb-green-dark text-white font-semibold px-8 py-3 rounded-full transition-all shadow-md">
              Start Exam
            </button>
          </div>
        )}

        {started && exam && (
          <>
            {/* Timer bar */}
            <div className="sticky top-16 z-40 bg-sb-cream/95 backdrop-blur-sm py-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-sb-brown-dark">{exam.subject}</span>
                <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-sb-green-dark'}`}>{mins}:{secs}</span>
              </div>
              <div className="bg-sb-beige rounded-full h-2 mt-2">
                <div className="h-full bg-sb-green rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / (duration * 60)) * 100}%` }} />
              </div>
            </div>

            {/* MCQ section */}
            <div className="space-y-4 mb-8">
              <h3 className="font-heading font-bold text-lg text-sb-brown-dark">{exam.sections[0]?.name}</h3>
              {mcqs.map((q) => (
                <QuizCard
                  key={q.id}
                  question={q.question}
                  options={q.options}
                  selectedIndex={quiz.answers[q.id]}
                  onSelect={(idx) => dispatch({ type: 'SELECT', qId: q.id, idx })}
                  isSubmitted={quiz.submitted}
                  correctIndex={q.correctIndex}
                />
              ))}
            </div>

            {/* Written sections (display only) */}
            {exam.sections.slice(1).map((section) => (
              <div key={section.name} className="mb-8">
                <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-3">{section.name}</h3>
                {section.questions.map((q) => (
                  <div key={q.id} className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6 mb-3">
                    <p className="text-sb-brown-dark font-medium mb-2">{q.question}</p>
                    <p className="text-xs text-sb-brown-med">[{q.marks} marks]</p>
                    {!quiz.submitted && (
                      <textarea rows={3} placeholder="Write your answer..." className="w-full mt-3 border-2 border-sb-sand rounded-xl px-4 py-3 text-sm focus:border-sb-green outline-none resize-none" />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {!quiz.submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  allAnswered ? 'bg-sb-green hover:bg-sb-green-dark text-white shadow-md' : 'bg-sb-sand text-sb-brown-med cursor-not-allowed'
                }`}
              >
                Submit Exam
              </button>
            ) : (
              <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-8 text-center">
                <p className="text-5xl mb-4">🎉</p>
                <h2 className="font-heading text-2xl font-bold text-sb-brown-dark mb-2">Exam Complete!</h2>
                <p className="text-sb-brown-med mb-4">
                  MCQ Score: <span className="font-bold text-sb-green">{quiz.score}/{mcqs.length}</span>
                </p>
                <p className="text-sm text-sb-brown-med mb-6">
                  {quiz.score === mcqs.length ? 'Perfect score! You\'re exam-ready!' : quiz.score >= mcqs.length / 2 ? 'Good effort! Review the questions you missed.' : 'Keep studying — you\'ll get there!'}
                </p>
                <button
                  onClick={() => { setExam(null); setStarted(false); dispatch({ type: 'RESET' }); }}
                  className="bg-sb-green hover:bg-sb-green-dark text-white font-semibold px-6 py-3 rounded-full transition-all"
                >
                  Try Another Exam
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
