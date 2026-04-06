import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-sb-dark border-t border-sb-gray/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="font-heading font-bold text-xl bg-gradient-to-r from-sb-green to-sb-purple bg-clip-text text-transparent">
            SkillBites
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            &copy; 2026 SkillBites. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
