const logos = [
  {
    name: "DuckDB",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#FFD94A" />
        <path d="M7.2 13.1c0-2.4 1.9-4.3 4.3-4.3h4.4c.6 0 1.1.5 1.1 1.1v3.5c0 1.5-1.2 2.7-2.7 2.7h-2.8c-2.4 0-4.3-1.9-4.3-4.3Z" fill="#111111"/>
        <circle cx="10.3" cy="11.6" r="0.7" fill="#FFD94A" />
        <path d="M16.7 11.2h2.4l-1.2 1.2 1.2 1.2h-2.4z" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: "Docker",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="currentColor" d="M8 8h2v2H8V8Zm3 0h2v2h-2V8Zm3 0h2v2h-2V8ZM5 11h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm4-.4c-.2-.1-.8-.3-1.3-.2.1-1.1-.2-2-1-2.7l-1.2.9c.5.5.7 1.2.5 2-.2.8-.8 1.4-1.6 1.4H4.4c0 2.9 2.2 5.2 5.3 5.2h4.5c3.8 0 6.4-1.8 7-5.1.6-.2 1.2-.7 1.6-1.5-.7-.3-1.8-.2-2.4.3Z"/>
      </svg>
    ),
  },
  {
    name: "React",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="currentColor" d="M12 10.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm0-5.3c1.8 0 3.5.2 4.8.6 1.6.5 2.6 1.3 2.6 2.1s-1 1.6-2.6 2.1c-1.3.4-3 .6-4.8.6s-3.5-.2-4.8-.6C5.6 9.8 4.6 9 4.6 8.2s1-1.6 2.6-2.1c1.3-.4 3-.6 4.8-.6Zm0 8.6c1.6 0 3.2.2 4.6.5 1.7.4 2.8 1 3.1 1.7.3.7-.3 1.7-1.5 2.6-1 .8-2.4 1.5-4 2.1-1.6.6-3.2.9-4.6 1-1.8.1-3.1-.3-3.4-1-.3-.7.3-1.7 1.5-2.6 1-.8 2.4-1.5 4-2.1.1 0 .2-.1.3-.1Zm0 0c-1.4-.5-2.7-1.2-3.8-2-1.4-1-2.1-2-1.9-2.8.2-.8 1.3-1.3 3-1.7 1.4-.3 3-.5 4.7-.5s3.3.2 4.7.5c1.7.4 2.8 1 3 1.7.2.8-.5 1.8-1.9 2.8-1.1.8-2.4 1.5-3.8 2Z"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#3178C6" />
        <path d="M8 9h8v2h-3v7h-2v-7H8z" fill="white" />
      </svg>
    ),
  },
];

export function LogoMarquee() {
  return (
    <section className="border-y border-white/5 py-12 bg-white/[0.01] relative">
      <div className="mx-auto w-full max-w-7xl px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">Powered by modern open source</p>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-emerald-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
          >
            {logo.mark}
            <span className="text-sm font-medium tracking-wide text-violet-100">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
