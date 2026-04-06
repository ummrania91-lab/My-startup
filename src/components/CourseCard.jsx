import { Link } from 'react-router-dom';

export default function CourseCard({ id, title, description, image }) {
  return (
    <Link
      to={`/course/${id}`}
      className="group flex-shrink-0 w-72 sm:w-80 bg-sb-gray rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-sb-purple/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-sb-green transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sb-purple text-sm font-medium">
          <span>Start Learning</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
