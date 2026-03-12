export function FoundersLetter() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        <div className="md:w-1/3 shrink-0">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45 mb-4">From the Founders</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden">
              <img src="/placeholder-avatar.jpg" alt="Founders" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">The Kuantra Team</h3>
              <p className="text-xs text-white/50 font-mono">Building for operators</p>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-medium">
          <h2 className="text-2xl font-medium tracking-tight text-white mb-6">Why we built Kuantra</h2>
          <p>
            For years, setting up a simple dashboard meant stringing together an overly complex stack. You had to move data out of your database, drop it into a warehouse, write dbt models, and then connect a heavy BI tool just to see a bar chart.
          </p>
          <p>
            It was slow, expensive, and frankly, overkill for 90% of use cases.
          </p>
          <p>
            We realized most teams were not asking for more layers — they were asking for fewer moving parts and faster answers. So we designed Kuantra to remove setup drag, keep data where it already lives, and make insight generation feel immediate.
          </p>
          <p>
            Kuantra is built for operators who need clarity, not ceremony: fast to deploy, private by default, and practical from day one.
          </p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 italic">
              "Simple things should be simple, complex things should be possible."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
