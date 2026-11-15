/** Static versions of the scenes (no WebGL / loading): the same curve, drawn in SVG. */
export function SmileFallback({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" className={`h-full w-full ${className}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="fb-pearl" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d="M40 150 C 160 330, 640 330, 760 150" fill="none" stroke="url(#fb-pearl)" strokeWidth="26" strokeLinecap="round" />
      <path d="M110 140 C 230 230, 570 230, 690 140" fill="none" stroke="#843064" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ArchFallback() {
  const teeth = Array.from({ length: 14 }, (_, i) => i - 6.5);
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      <path d="M60 330 Q 300 -40 540 330" fill="none" stroke="#843064" strokeWidth="3" />
      {teeth.map((t) => {
        const a = (t / 7) * 1.25;
        const x = 300 + Math.sin(a) * 230;
        const y = 330 - Math.cos(a) * 280;
        return <ellipse key={t} cx={x} cy={y} rx="16" ry="20" fill="#f0f0f0" transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} />;
      })}
    </svg>
  );
}
