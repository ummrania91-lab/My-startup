export default function LessonCard({ title, duration, thumbnail, isActive, isCompleted, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${
        isActive
          ? 'bg-sb-purple/20 border-l-4 border-sb-green shadow-md'
          : 'bg-sb-gray/50 border-l-4 border-transparent hover:bg-sb-gray hover:border-sb-purple/50'
      }`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-sb-green' : 'text-white'}`}>
          {title}
        </h4>
        <span className="text-xs text-gray-400">{duration}</span>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-sb-green/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-sb-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : isActive ? (
          <div className="w-6 h-6 rounded-full bg-sb-purple/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-sb-purple animate-pulse" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-sb-gray/50" />
        )}
      </div>
    </button>
  );
}
