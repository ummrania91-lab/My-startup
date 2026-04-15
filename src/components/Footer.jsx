import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-sb-beige border-t border-sb-sand/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-heading font-bold text-xl text-sb-brown-dark">
            Skill<span className="text-sb-green">Bites</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-sb-brown-med">
            <a href="#about" className="hover:text-sb-green transition-colors">About</a>
            <a href="#privacy" className="hover:text-sb-green transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-sb-green transition-colors">Terms</a>
            <a href="#contact" className="hover:text-sb-green transition-colors">Contact</a>
          </div>
          <p className="text-xs text-sb-brown-med/60">&copy; 2026 SkillBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
