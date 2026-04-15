export default function QuizCard({ question, options, selectedIndex, onSelect, isSubmitted, correctIndex }) {
  const labels = ['A', 'B', 'C', 'D'];

  const getStyle = (i) => {
    const base = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200';
    if (isSubmitted) {
      if (i === correctIndex) return `${base} border-sb-green bg-sb-green/10 text-sb-green-dark`;
      if (i === selectedIndex) return `${base} border-red-400 bg-red-50 text-red-600`;
      return `${base} border-sb-sand/50 text-sb-brown-med/50`;
    }
    if (i === selectedIndex) return `${base} border-sb-green bg-sb-green/10 text-sb-brown-dark shadow-sm`;
    return `${base} border-sb-sand hover:border-sb-green/50 text-sb-brown`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-sb-sand/60 shadow-sm">
      <h4 className="font-heading font-bold text-lg text-sb-brown-dark mb-5">{question}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <button key={i} onClick={() => !isSubmitted && onSelect(i)} disabled={isSubmitted} className={getStyle(i)}>
            <span className="inline-flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i === selectedIndex ? 'bg-sb-green text-white' : 'bg-sb-beige text-sb-brown-med'
              }`}>{labels[i]}</span>
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
