import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tutor', label: 'AI Tutor' },
  { to: '/study-plan', label: 'Study Plan' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/progress', label: 'Progress' },
  { to: '/focus', label: 'Focus' },
  { to: '/exam-prep', label: 'Exam Prep' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) => location.pathname === to;

  return (
    <nav className="sticky top-0 z-50 bg-sb-cream/95 backdrop-blur-sm border-b border-sb-sand/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-sb-brown-dark">
              Skill<span className="text-sb-green">Bites</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-sb-green-dark font-semibold'
                    : 'text-sb-brown-med hover:text-sb-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="bg-sb-green hover:bg-sb-green-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            >
              My Profile
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-sb-brown hover:text-sb-brown-dark focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 space-y-1 bg-sb-cream border-t border-sb-sand/40">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-sb-green/10 text-sb-green-dark'
                  : 'text-sb-brown hover:bg-sb-beige hover:text-sb-brown-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-sb-green hover:bg-sb-green-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 mt-2"
          >
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
