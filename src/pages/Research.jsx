import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import { summarizeContent } from '../services/api';

export default function Research() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const summary = await summarizeContent(text.trim());
    setResult(summary);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">🔍 Research & Summarizer</h1>
        <p className="text-sb-brown-med mb-8">Paste any text, article, or notes — get bullet points and key takeaways.</p>

        <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6 sm:p-8">
          <label className="block text-sm font-semibold text-sb-brown-dark mb-2">Paste your content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste an article, notes, PDF text, or any content you want summarized..."
            rows={8}
            className="w-full border-2 border-sb-sand rounded-xl px-4 py-3 text-sm text-sb-brown-dark placeholder-sb-brown-med/50 focus:border-sb-green outline-none resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-sb-brown-med">{text.split(/\s+/).filter(Boolean).length} words</span>
            <button
              onClick={handleSummarize}
              disabled={!text.trim() || loading}
              className="bg-sb-green hover:bg-sb-green-dark disabled:bg-sb-sand disabled:text-sb-brown-med text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all"
            >
              Summarize
            </button>
          </div>
        </div>

        {loading && <div className="mt-8"><LoadingState message="Analyzing and summarizing..." /></div>}

        {result && !loading && (
          <div className="mt-8 space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📝</span>
                <h3 className="font-heading font-bold text-lg text-sb-brown-dark">Summary</h3>
                <span className="text-xs text-sb-brown-med ml-auto">~{result.readingTime} read</span>
              </div>
              <p className="text-sb-brown leading-relaxed">{result.summary}</p>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-2xl border border-sb-sand/60 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💡</span>
                <h3 className="font-heading font-bold text-lg text-sb-brown-dark">Key Takeaways</h3>
              </div>
              <ul className="space-y-2">
                {result.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sb-green/10 text-sb-green-dark text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-sb-brown leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => { setResult(null); setText(''); }} className="text-sm text-sb-green hover:text-sb-green-dark font-medium">
              Summarize something else
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
