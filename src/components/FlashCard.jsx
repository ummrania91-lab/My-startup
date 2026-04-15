import { useState } from 'react';

export default function FlashCard({ front, back, difficulty, onRate }) {
  const [flipped, setFlipped] = useState(false);

  const diffColor = {
    easy: 'bg-sb-green/10 text-sb-green-dark',
    medium: 'bg-yellow-50 text-yellow-700',
    hard: 'bg-red-50 text-red-600',
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative cursor-pointer min-h-[240px] bg-white rounded-2xl border-2 border-sb-sand/60 shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col justify-center items-center text-center"
      >
        {/* Difficulty badge */}
        <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${diffColor[difficulty] || diffColor.medium}`}>
          {difficulty}
        </span>

        {/* Flip hint */}
        <span className="absolute bottom-4 text-xs text-sb-brown-med/50">
          {flipped ? 'Click to see question' : 'Click to reveal answer'}
        </span>

        {!flipped ? (
          <div>
            <p className="text-xs uppercase tracking-wider text-sb-brown-med mb-3 font-semibold">Question</p>
            <p className="font-heading text-xl text-sb-brown-dark leading-relaxed">{front}</p>
          </div>
        ) : (
          <div>
            <p className="text-xs uppercase tracking-wider text-sb-green mb-3 font-semibold">Answer</p>
            <p className="text-sb-brown leading-relaxed whitespace-pre-line">{back}</p>
          </div>
        )}
      </div>

      {/* Rating buttons */}
      {flipped && onRate && (
        <div className="flex justify-center gap-3 mt-4">
          {['Again', 'Hard', 'Good', 'Easy'].map((label, i) => {
            const colors = [
              'border-red-300 text-red-500 hover:bg-red-50',
              'border-yellow-300 text-yellow-600 hover:bg-yellow-50',
              'border-sb-green/50 text-sb-green hover:bg-sb-green/10',
              'border-sb-green text-sb-green-dark hover:bg-sb-green/10',
            ];
            return (
              <button
                key={label}
                onClick={() => { onRate(label.toLowerCase()); setFlipped(false); }}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${colors[i]}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
