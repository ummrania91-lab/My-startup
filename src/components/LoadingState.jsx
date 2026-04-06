export default function LoadingState({ message = 'AI is generating your content...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-sb-gray animate-spin border-t-sb-purple" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent animate-spin border-b-sb-green" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>

      {/* Message */}
      <p className="text-gray-400 text-sm font-medium animate-pulse">{message}</p>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-sb-purple animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
