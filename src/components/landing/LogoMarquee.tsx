const logos = [
  {
    name: "PostgreSQL",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="currentColor" d="M14.2 2.1c-3.2 0-5.8 2.3-5.8 5.3v8.2c0 .8.6 1.4 1.5 1.4.8 0 1.4-.6 1.4-1.4v-2.4c.9.3 1.8.5 2.9.5 3.1 0 5.6-2.5 5.6-5.8S17.3 2.1 14.2 2.1Zm0 8.9c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1c1.1 0 2.1.9 2.1 2.1S15.3 11 14.2 11Z"/>
      </svg>
    ),
  },
  {
    name: "MySQL",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="currentColor" d="M4 18c2.4-4.8 5.2-7.3 8.6-7.7 1.8-.2 3.7.5 5.4 2.1l2-2c-2.2-2.1-4.9-3.2-7.7-2.8-4.5.5-8 3.6-10.3 9.2L4 18Zm8.4-2.8c1.7-.3 3.1.4 4.1 1.8l2.2-1.8c-1.6-2.1-3.9-3.1-6.7-2.7l.4 2.7Z"/>
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
