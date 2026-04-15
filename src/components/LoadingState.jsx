export default function LoadingState({ message = 'AI is thinking...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-sb-sand animate-spin border-t-sb-green" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent animate-spin border-b-sb-brown" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="text-sb-brown-med text-sm font-medium animate-pulse">{message}</p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-sb-green animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}
