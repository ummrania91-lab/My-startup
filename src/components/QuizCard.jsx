export default function QuizCard({ question, options, selectedIndex, onSelect, isSubmitted, correctIndex }) {
  const getOptionStyle = (index) => {
    const base = 'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200';

    if (isSubmitted) {
      if (index === correctIndex) {
        return `${base} border-sb-green bg-sb-green/15 text-sb-green`;
      }
      if (index === selectedIndex && index !== correctIndex) {
        return `${base} border-red-500 bg-red-500/15 text-red-400`;
      }
      return `${base} border-sb-gray/50 text-gray-500 opacity-50`;
    }

    if (index === selectedIndex) {
      return `${base} border-sb-purple bg-sb-purple/15 text-white shadow-md shadow-sb-purple/10`;
    }

    return `${base} border-sb-gray hover:border-sb-purple/50 text-gray-300 hover:text-white`;
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-sb-gray/30 rounded-2xl p-6 border border-sb-gray/50">
      <h4 className="font-heading font-bold text-lg text-white mb-5">{question}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && onSelect(index)}
            disabled={isSubmitted}
            className={getOptionStyle(index)}
          >
            <span className="inline-flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                index === selectedIndex
                  ? 'bg-sb-purple text-white'
                  : 'bg-sb-gray text-gray-400'
              }`}>
                {optionLabels[index]}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
