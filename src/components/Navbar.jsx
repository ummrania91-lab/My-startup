import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/#courses', label: 'Courses' },
    { to: '/#profile', label: 'Profile' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav className="sticky top-0 z-50 bg-sb-dark/95 backdrop-blur-sm border-b border-sb-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-sb-green via-sb-purple to-sb-orange bg-clip-text text-transparent">
              SkillBites
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 hover:text-sb-green ${
                  isActive(link.to) ? 'text-sb-green' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-sb-purple hover:bg-sb-purple/80 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-sb-purple/25">
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
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

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'bg-sb-purple/20 text-sb-green'
                  : 'text-gray-300 hover:bg-sb-gray hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button className="w-full bg-sb-purple hover:bg-sb-purple/80 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 mt-2">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
