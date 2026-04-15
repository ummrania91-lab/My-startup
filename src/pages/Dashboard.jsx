import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubjectSelector from '../components/SubjectSelector';

const FEATURES = [
  { icon: '🧠', title: 'AI Tutor', desc: 'Chat with a smart tutor that adapts to your level', path: '/tutor', color: 'bg-sb-green/10 border-sb-green/30' },
  { icon: '📚', title: 'Study Plans', desc: 'Custom timetables built around your goals', path: '/study-plan', color: 'bg-sb-brown/10 border-sb-brown/30' },
  { icon: '✍🏽', title: 'Flashcards', desc: 'Active recall with spaced repetition', path: '/flashcards', color: 'bg-yellow-50 border-yellow-300/50' },
  { icon: '📊', title: 'Progress', desc: 'Track topics, accuracy, and weak areas', path: '/progress', color: 'bg-sb-green/10 border-sb-green/30' },
  { icon: '🔍', title: 'Summarizer', desc: 'Turn long content into key takeaways', path: '/research', color: 'bg-sb-brown/10 border-sb-brown/30' },
  { icon: '🧾', title: 'Homework Help', desc: 'Step-by-step problem solving', path: '/assignment', color: 'bg-yellow-50 border-yellow-300/50' },
  { icon: '🎯', title: 'Focus Mode', desc: 'Pomodoro timer and study sessions', path: '/focus', color: 'bg-sb-green/10 border-sb-green/30' },
  { icon: '🎓', title: 'Exam Prep', desc: 'Timed exams and predicted questions', path: '/exam-prep', color: 'bg-sb-brown/10 border-sb-brown/30' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSubjectSelect = (subject) => {
    navigate(`/tutor?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sb-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sb-brown/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-sb-green/10 border border-sb-green/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-sb-green animate-pulse" />
            <span className="text-xs font-medium text-sb-green-dark">AI-Powered Learning</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-sb-brown-dark leading-tight mb-6">
            Learn <span className="text-sb-green">Anything</span>,{' '}
            <span className="text-sb-brown">Your Way</span>
          </h1>

          <p className="text-lg text-sb-brown-med leading-relaxed mb-10 max-w-2xl mx-auto">
            Your personal AI study companion. Pick any subject — from calculus to creative writing — and get lessons, quizzes, flashcards, and exam prep tailored to you.
          </p>

          <SubjectSelector onSelect={handleSubjectSelect} placeholder="What do you want to learn today?" />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {[
              { value: 'Any Subject', label: 'You choose the topic' },
              { value: 'AI Tutor', label: 'Adapts to your pace' },
              { value: '12 Tools', label: 'All-in-one platform' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-sb-green">{s.value}</p>
                <p className="text-sm text-sb-brown-med">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-sb-brown-dark text-center mb-3">
          Everything You Need to Study Smarter
        </h2>
        <p className="text-sb-brown-med text-center mb-12 max-w-lg mx-auto">
          Powered by AI, designed for real learning — not just memorization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <button
              key={f.path}
              onClick={() => navigate(f.path)}
              className={`text-left p-6 rounded-2xl border ${f.color} hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-heading font-bold text-lg text-sb-brown-dark mt-3 mb-1">{f.title}</h3>
              <p className="text-sm text-sb-brown-med leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-sb-brown-dark text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Pick Any Subject', desc: 'Type any topic — maths, coding, history, art — literally anything.', color: 'text-sb-green' },
            { step: '02', title: 'AI Builds Your Path', desc: 'Get a personalized study plan, flashcards, and practice problems.', color: 'text-sb-brown' },
            { step: '03', title: 'Track & Improve', desc: 'See your progress, strengthen weak areas, and ace your goals.', color: 'text-sb-green-dark' },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-sb-sand/60 rounded-2xl p-6 shadow-sm">
              <span className={`text-4xl font-bold ${item.color}/30 font-heading`}>{item.step}</span>
              <h3 className="font-heading text-xl font-bold text-sb-brown-dark mt-3 mb-2">{item.title}</h3>
              <p className="text-sb-brown-med text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
