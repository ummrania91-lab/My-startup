import { useState } from 'react';
import { POPULAR_SUBJECTS } from '../services/api';

export default function SubjectSelector({ onSelect, placeholder = 'Search any subject...' }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = query.length > 0
    ? POPULAR_SUBJECTS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : POPULAR_SUBJECTS.slice(0, 12);

  const handleSelect = (subject) => {
    setQuery(subject);
    setShowSuggestions(false);
    onSelect(subject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSelect(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="flex items-center bg-white border-2 border-sb-sand rounded-full px-5 py-3 focus-within:border-sb-green transition-colors shadow-sm">
        <svg className="w-5 h-5 text-sb-brown-med mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sb-brown-dark placeholder-sb-brown-med/50 text-sm"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); setShowSuggestions(false); }} className="text-sb-brown-med hover:text-sb-brown-dark ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button type="submit" className="ml-3 bg-sb-green hover:bg-sb-green-dark text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-all">
          Go
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-sb-sand rounded-2xl shadow-lg max-h-60 overflow-y-auto z-50">
          {filtered.length > 0 ? filtered.map((subj) => (
            <button
              key={subj}
              type="button"
              onClick={() => handleSelect(subj)}
              className="w-full text-left px-5 py-2.5 text-sm text-sb-brown hover:bg-sb-beige hover:text-sb-green-dark transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              {subj}
            </button>
          )) : (
            <div className="px-5 py-3 text-sm text-sb-brown-med">
              Press <strong>Go</strong> to study "<span className="text-sb-green-dark">{query}</span>"
            </div>
          )}
        </div>
      )}
    </form>
  );
}
