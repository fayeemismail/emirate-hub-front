export default function BouncingDotsLoader() {
  return (
    <div className="flex flex-col items-center gap-5 select-none">
      {/* Brand Wordmark */}
      <div className="flex items-center gap-2 tracking-[0.22em]">
        <span className="text-xl sm:text-2xl font-black text-gray-950">
          EMIRATE
        </span>
        <span className="text-xl sm:text-2xl font-black text-primary">
          HUB
        </span>
      </div>

      {/* Bouncing Dots in Brand Palette */}
      <div className="flex items-center gap-2.5" role="status" aria-label="Loading">
        <span className="w-3.5 h-3.5 rounded-full bg-primary animate-bounce-dot-1 shadow-xs" />
        <span className="w-3.5 h-3.5 rounded-full bg-black animate-bounce-dot-2 shadow-xs" />
        <span className="w-3.5 h-3.5 rounded-full bg-primary animate-bounce-dot-3 shadow-xs" />
      </div>
    </div>
  );
}
