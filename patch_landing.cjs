const fs = require('fs');
const path = require('path');

const landingPath = path.join(__dirname, 'src', 'pages', 'Landing.tsx');
let code = fs.readFileSync(landingPath, 'utf8');

// 1. Add imports
code = code.replace(
  'import { ArrowRight, CheckCircle2, Database, Gauge, Share2, Shield } from "lucide-react";',
  'import { ArrowRight, CheckCircle2, Database, Gauge, Share2, Shield, Calendar, User } from "lucide-react";\nimport { format } from "date-fns";\nimport { getAllPosts } from "@/lib/blog";'
);

// 2. Add latestPosts
code = code.replace(
  'export default function Landing() {\n  const { user } = useUser();',
  'export default function Landing() {\n  const { user } = useUser();\n  const latestPosts = getAllPosts().slice(0, 3);'
);

// 3. Update main nav
const navMatch = `<nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <Link to="/features" className="hover:text-white transition-colors duration-200">
                Product
              </Link>`;
const newNav = `<nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <Link to="/features" className="hover:text-white transition-colors duration-200">
                Product
              </Link>
              <Link to="/blog" className="hover:text-white transition-colors duration-200">
                Blog
              </Link>`;
code = code.replace(navMatch, newNav);

// 4. Update footer nav
const footerNavMatch = `<div className="flex items-center gap-5">
              <Link to="/pricing" className="hover:text-white/70 transition-colors">
                Pricing
              </Link>`;
const newFooterNav = `<div className="flex items-center gap-5">
              <Link to="/pricing" className="hover:text-white/70 transition-colors">
                Pricing
              </Link>
              <Link to="/blog" className="hover:text-white/70 transition-colors">
                Blog
              </Link>`;
code = code.replace(footerNavMatch, newFooterNav);

// 5. Add Latest Insights section before footer
const footerMatch = '<footer className="border-t border-white/[0.08] py-8">';
const insightsSection = `        {latestPosts.length > 0 && (
          <section className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Latest Insights</h2>
                <p className="mt-2 text-sm text-white/60">Product updates, engineering deep-dives, and data strategy.</p>
              </div>
              <Link 
                to="/blog" 
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                View all posts 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  to={\`/blog/\${post.slug}\`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)]"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex flex-col">
                    <div className="mb-5 flex items-center gap-4 text-xs font-medium text-white/40">
                      <span className="flex items-center gap-1.5 text-violet-200/50">
                        <Calendar className="h-3.5 w-3.5" /> 
                        {format(new Date(post.meta.date), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> 
                        {post.meta.author}
                      </span>
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-violet-300">
                      {post.meta.title}
                    </h3>
                    
                    <p className="line-clamp-3 text-sm leading-relaxed text-white/60">
                      {post.meta.description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read article 
                    <ArrowRight className="ml-1.5 h-4 w-4 -translate-x-2 transition-transform duration-300 group-hover:translate-x-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-white/[0.08] py-8">`;

code = code.replace(footerMatch, insightsSection);

fs.writeFileSync(landingPath, code);
console.log('Landing.tsx patched successfully');