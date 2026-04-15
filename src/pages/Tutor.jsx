import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTutorResponse } from '../services/api';

export default function Tutor() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject') || '';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('simple');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (subject && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        text: `Welcome! I'm your AI tutor for **${subject}**. 🎓\n\nI can:\n- Explain concepts at any level\n- Quiz you to test understanding\n- Switch styles (simple, detailed, analogies)\n\nWhat would you like to learn about ${subject}?`,
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [subject, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getTutorResponse(input.trim(), style);
    setMessages((prev) => [...prev, response]);
    setLoading(false);
  };

  const styles = [
    { value: 'simple', label: 'Simple', icon: '💡' },
    { value: 'detailed', label: 'Detailed', icon: '📖' },
    { value: 'visual', label: 'Visual', icon: '🎨' },
    { value: 'analogy', label: 'Analogies', icon: '🔗' },
  ];

  return (
    <div className="min-h-screen bg-sb-cream flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="font-heading text-2xl font-bold text-sb-brown-dark">
            🧠 AI Tutor {subject && <span className="text-sb-green">— {subject}</span>}
          </h1>
          <p className="text-sm text-sb-brown-med mt-1">Ask anything. Say "explain like I'm 10" or "test me".</p>
        </div>

        {/* Style selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {styles.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                style === s.value
                  ? 'bg-sb-green text-white shadow-sm'
                  : 'bg-white border border-sb-sand text-sb-brown-med hover:border-sb-green/50'
              }`}
            >
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.length === 0 && !subject && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🧠</p>
              <h2 className="font-heading text-xl font-bold text-sb-brown-dark mb-2">Start a Conversation</h2>
              <p className="text-sb-brown-med text-sm">Ask me about any subject and I'll help you learn.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-sb-green text-white rounded-br-md'
                  : 'bg-white border border-sb-sand/60 text-sb-brown-dark rounded-bl-md shadow-sm'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-sb-sand/60 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-sb-green animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={subject ? `Ask about ${subject}...` : 'Ask me anything...'}
            className="flex-1 bg-white border-2 border-sb-sand rounded-full px-5 py-3 text-sm text-sb-brown-dark placeholder-sb-brown-med/50 focus:border-sb-green outline-none transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-sb-green hover:bg-sb-green-dark disabled:bg-sb-sand disabled:text-sb-brown-med text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            Send
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
