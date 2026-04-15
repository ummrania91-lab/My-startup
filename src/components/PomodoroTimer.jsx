import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState('focus'); // focus | break | longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const durations = { focus: 25 * 60, break: 5 * 60, longBreak: 15 * 60 };

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      if (mode === 'focus') {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        setMode(newSessions % 4 === 0 ? 'longBreak' : 'break');
        setTimeLeft(newSessions % 4 === 0 ? durations.longBreak : durations.break);
      } else {
        setMode('focus');
        setTimeLeft(durations.focus);
      }
      setRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft, mode, sessions, durations.break, durations.focus, durations.longBreak]);

  const toggleTimer = () => setRunning(!running);
  const resetTimer = () => { setRunning(false); setTimeLeft(durations[mode]); };

  const switchMode = (newMode) => {
    setRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const progress = 1 - timeLeft / durations[mode];

  const modeColors = {
    focus: 'text-sb-green-dark',
    break: 'text-sb-brown',
    longBreak: 'text-sb-brown-med',
  };

  const modeLabels = { focus: 'Focus Time', break: 'Short Break', longBreak: 'Long Break' };

  return (
    <div className="bg-white rounded-3xl border border-sb-sand/60 shadow-md p-8 max-w-md mx-auto text-center">
      {/* Mode tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {Object.entries(modeLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === key
                ? 'bg-sb-green text-white shadow-sm'
                : 'bg-sb-beige text-sb-brown-med hover:bg-sb-sand/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#EDE8DE" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none" stroke="#4A7C59" strokeWidth="6"
            strokeDasharray={`${progress * 283} 283`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold font-heading ${modeColors[mode]}`}>
            {mins}:{secs}
          </span>
          <span className="text-xs text-sb-brown-med mt-1">{modeLabels[mode]}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${
            running
              ? 'bg-sb-sand text-sb-brown hover:bg-sb-brown-med/20'
              : 'bg-sb-green text-white hover:bg-sb-green-dark shadow-md'
          }`}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-full border-2 border-sb-sand text-sb-brown-med text-sm font-medium hover:bg-sb-beige transition-all"
        >
          Reset
        </button>
      </div>

      {/* Sessions counter */}
      <div className="flex justify-center items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < sessions % 4 ? 'bg-sb-green' : 'bg-sb-sand'
            }`}
          />
        ))}
        <span className="text-xs text-sb-brown-med ml-2">{sessions} sessions completed</span>
      </div>
    </div>
  );
}
