import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PomodoroTimer from '../components/PomodoroTimer';

export default function Focus() {
  const [focusLog, setFocusLog] = useState([]);
  const [task, setTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setFocusLog([{ task: task.trim(), time: new Date().toLocaleTimeString(), done: false }, ...focusLog]);
    setTask('');
  };

  const toggleDone = (i) => {
    setFocusLog(focusLog.map((item, idx) => idx === i ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">🎯 Focus & Productivity</h1>
        <p className="text-sb-brown-med mb-8">Stay in the zone with Pomodoro timing and session tracking.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer */}
          <div>
            <PomodoroTimer />
          </div>

          {/* Focus tasks */}
          <div>
            <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
              <h3 className="font-heading font-bold text-lg text-sb-brown-dark mb-4">Focus Tasks</h3>
              <form onSubmit={addTask} className="flex gap-2 mb-4">
                <input
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="What are you working on?"
                  className="flex-1 border-2 border-sb-sand rounded-xl px-4 py-2.5 text-sm focus:border-sb-green outline-none"
                />
                <button type="submit" className="bg-sb-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-sb-green-dark transition-all">Add</button>
              </form>

              {focusLog.length === 0 ? (
                <p className="text-sm text-sb-brown-med text-center py-8">Add a task to track what you're studying.</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {focusLog.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDone(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        item.done ? 'bg-sb-green/10' : 'bg-sb-beige hover:bg-sb-sand/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        item.done ? 'border-sb-green bg-sb-green' : 'border-sb-sand'
                      }`}>
                        {item.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${item.done ? 'line-through text-sb-brown-med' : 'text-sb-brown-dark font-medium'}`}>{item.task}</p>
                      </div>
                      <span className="text-xs text-sb-brown-med">{item.time}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick tips */}
            <div className="mt-4 bg-sb-green/5 border border-sb-green/20 rounded-2xl p-5">
              <h4 className="font-heading font-bold text-sb-brown-dark mb-2">💡 Focus Tips</h4>
              <ul className="space-y-1.5 text-sm text-sb-brown">
                <li>• Put your phone in another room</li>
                <li>• Work in 25-min bursts, rest for 5</li>
                <li>• Use the first session for the hardest task</li>
                <li>• After 4 sessions, take a longer 15-min break</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
