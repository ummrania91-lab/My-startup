import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import { generateStudyPlan, POPULAR_SUBJECTS } from '../services/api';

export default function StudyPlan() {
  const [subjects, setSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSubject = () => {
    const s = subjectInput.trim();
    if (s && !subjects.includes(s)) {
      setSubjects([...subjects, s]);
      setSubjectInput('');
    }
  };

  const removeSubject = (s) => setSubjects(subjects.filter((x) => x !== s));

  const handleGenerate = async () => {
    if (subjects.length === 0) return;
    setLoading(true);
    const result = await generateStudyPlan(subjects, hoursPerDay, goal);
    setPlan(result);
    setLoading(false);
  };

  const [completedSessions, setCompletedSessions] = useState({});
  const toggleSession = (dayIdx, sessIdx) => {
    const key = `${dayIdx}-${sessIdx}`;
    setCompletedSessions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">📚 Personalized Study Plan</h1>
        <p className="text-sb-brown-med mb-8">Tell us your goals and we'll build a weekly schedule for you.</p>

        {!plan ? (
          <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Subjects */}
            <div>
              <label className="block text-sm font-semibold text-sb-brown-dark mb-2">What subjects are you studying?</label>
              <div className="flex gap-2">
                <input
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                  placeholder="Type a subject..."
                  list="subject-suggestions"
                  className="flex-1 border-2 border-sb-sand rounded-xl px-4 py-2.5 text-sm focus:border-sb-green outline-none"
                />
                <datalist id="subject-suggestions">
                  {POPULAR_SUBJECTS.map((s) => <option key={s} value={s} />)}
                </datalist>
                <button onClick={addSubject} className="bg-sb-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-sb-green-dark transition-all">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {subjects.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 bg-sb-green/10 text-sb-green-dark text-sm font-medium px-3 py-1.5 rounded-full">
                    {s}
                    <button onClick={() => removeSubject(s)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-semibold text-sb-brown-dark mb-2">Hours available per day: <span className="text-sb-green">{hoursPerDay}h</span></label>
              <input type="range" min="1" max="10" value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} className="w-full accent-sb-green" />
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold text-sb-brown-dark mb-2">What's your goal?</label>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Ace my finals, Learn Python in 30 days..."
                className="w-full border-2 border-sb-sand rounded-xl px-4 py-2.5 text-sm focus:border-sb-green outline-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={subjects.length === 0}
              className="w-full bg-sb-green hover:bg-sb-green-dark disabled:bg-sb-sand disabled:text-sb-brown-med text-white font-semibold py-3 rounded-full transition-all"
            >
              Generate My Study Plan
            </button>
          </div>
        ) : loading ? (
          <LoadingState message="Building your personalized plan..." />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-sb-brown-med">Goal: <span className="font-semibold text-sb-brown-dark">{plan.goal || 'General study'}</span></p>
              </div>
              <button onClick={() => setPlan(null)} className="text-sm text-sb-green hover:text-sb-green-dark font-medium">Edit Plan</button>
            </div>

            <div className="space-y-4">
              {plan.plan.map((day, dayIdx) => (
                <div key={day.day} className={`bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-5 ${day.isRest ? 'opacity-60' : ''}`}>
                  <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-3">{day.day} {day.isRest && '— Rest Day 🌿'}</h3>
                  {!day.isRest && (
                    <div className="space-y-2">
                      {day.sessions.map((sess, sessIdx) => {
                        const key = `${dayIdx}-${sessIdx}`;
                        const done = completedSessions[key];
                        return (
                          <button
                            key={sessIdx}
                            onClick={() => toggleSession(dayIdx, sessIdx)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                              done ? 'bg-sb-green/10 border border-sb-green/30' : 'bg-sb-beige hover:bg-sb-sand/30'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              done ? 'border-sb-green bg-sb-green' : 'border-sb-sand'
                            }`}>
                              {done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${done ? 'line-through text-sb-brown-med' : 'text-sb-brown-dark'}`}>{sess.topic}</p>
                              <p className="text-xs text-sb-brown-med">{sess.duration} — {sess.type}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
