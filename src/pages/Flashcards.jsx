import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlashCard from '../components/FlashCard';
import LoadingState from '../components/LoadingState';
import SubjectSelector from '../components/SubjectSelector';
import { generateFlashcards } from '../services/api';

export default function Flashcards() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });

  const handleGenerate = async (subj) => {
    setSubject(subj);
    setLoading(true);
    const result = await generateFlashcards(subj);
    setCards(result);
    setCurrentIndex(0);
    setStats({ again: 0, hard: 0, good: 0, easy: 0 });
    setLoading(false);
  };

  const handleRate = (rating) => {
    setStats((prev) => ({ ...prev, [rating]: prev[rating] + 1 }));
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setStats({ again: 0, hard: 0, good: 0, easy: 0 });
  };

  const totalRated = stats.again + stats.hard + stats.good + stats.easy;
  const done = totalRated === cards.length && cards.length > 0;

  return (
    <div className="min-h-screen bg-sb-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-sb-brown-dark mb-2">✍🏽 Flashcards & Active Recall</h1>
        <p className="text-sb-brown-med mb-8">Spaced repetition — the science-backed way to remember everything.</p>

        {cards.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">🧠</p>
            <h2 className="font-heading text-xl font-bold text-sb-brown-dark mb-4">Pick a Subject</h2>
            <SubjectSelector onSelect={handleGenerate} placeholder="Generate flashcards for..." />
          </div>
        )}

        {loading && <LoadingState message="Generating flashcards..." />}

        {cards.length > 0 && !loading && (
          <>
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-sb-brown-med">
                <span className="font-semibold text-sb-green">{subject}</span> — Card {currentIndex + 1} of {cards.length}
              </p>
              <button onClick={() => { setCards([]); setSubject(''); }} className="text-sm text-sb-brown-med hover:text-sb-green font-medium">
                Change Subject
              </button>
            </div>

            <div className="bg-sb-beige rounded-full h-2 mb-8">
              <div className="h-full bg-sb-green rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
            </div>

            {done ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-sb-sand/60 shadow-sm">
                <p className="text-5xl mb-4">🎉</p>
                <h2 className="font-heading text-2xl font-bold text-sb-brown-dark mb-4">Session Complete!</h2>
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center"><p className="text-2xl font-bold text-red-500">{stats.again}</p><p className="text-xs text-sb-brown-med">Again</p></div>
                  <div className="text-center"><p className="text-2xl font-bold text-yellow-500">{stats.hard}</p><p className="text-xs text-sb-brown-med">Hard</p></div>
                  <div className="text-center"><p className="text-2xl font-bold text-sb-green">{stats.good}</p><p className="text-xs text-sb-brown-med">Good</p></div>
                  <div className="text-center"><p className="text-2xl font-bold text-sb-green-dark">{stats.easy}</p><p className="text-xs text-sb-brown-med">Easy</p></div>
                </div>
                <button onClick={restart} className="bg-sb-green hover:bg-sb-green-dark text-white font-semibold px-6 py-3 rounded-full transition-all">
                  Study Again
                </button>
              </div>
            ) : (
              <FlashCard
                front={cards[currentIndex].front}
                back={cards[currentIndex].back}
                difficulty={cards[currentIndex].difficulty}
                onRate={handleRate}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
