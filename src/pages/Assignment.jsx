import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import { solveStepByStep } from '../services/api';

export default function Assignment() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    const result = await solveStepByStep(problem.trim());
    setSolution(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">🧾 Assignment & Homework Helper</h1>
        <p className="text-sb-brown-med mb-8">Don't just get answers — understand the reasoning behind every step.</p>

        <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6 sm:p-8">
          <label className="block text-sm font-semibold text-sb-brown-dark mb-2">Describe your problem</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Type or paste your homework question here... e.g., 'Solve 2x + 5 = 15' or 'Explain photosynthesis'"
            rows={4}
            className="w-full border-2 border-sb-sand rounded-xl px-4 py-3 text-sm text-sb-brown-dark placeholder-sb-brown-med/50 focus:border-sb-green outline-none resize-none"
          />
          <button
            onClick={handleSolve}
            disabled={!problem.trim() || loading}
            className="mt-4 bg-sb-green hover:bg-sb-green-dark disabled:bg-sb-sand disabled:text-sb-brown-med text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all"
          >
            Solve Step by Step
          </button>
        </div>

        {loading && <div className="mt-8"><LoadingState message="Working through the problem..." /></div>}

        {solution && !loading && (
          <div className="mt-8">
            <h3 className="font-heading font-bold text-xl text-sb-brown-dark mb-6">Step-by-Step Solution</h3>
            <div className="space-y-4">
              {solution.steps.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-sb-green text-white text-sm font-bold flex items-center justify-center">{s.step}</span>
                    <h4 className="font-heading font-bold text-lg text-sb-brown-dark">{s.title}</h4>
                  </div>
                  <p className="text-sb-brown leading-relaxed mb-3">{s.explanation}</p>
                  <div className="bg-sb-green/5 border border-sb-green/20 rounded-xl px-4 py-3">
                    <p className="text-sm text-sb-green-dark font-medium">💡 {s.highlight}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-sb-beige rounded-2xl p-5 border border-sb-sand/40">
              <p className="text-sm text-sb-brown font-medium">📌 {solution.tip}</p>
            </div>

            <button onClick={() => { setSolution(null); setProblem(''); }} className="mt-6 text-sm text-sb-green hover:text-sb-green-dark font-medium">
              Solve another problem
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
