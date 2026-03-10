import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";

export default function Blog() {
  const posts = useMemo(() => getAllPosts(), []);

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-24 pb-12 px-6">
      <Helmet>
        <title>Blog | Kuantra</title>
        <meta name="description" content="Engineering updates, product news, and analytical deep-dives from the Kuantra team." />
        <meta property="og:title" content="Blog | Kuantra" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Kuantra Blog
          </h1>
          <p className="text-xl text-white/60">
            Thoughts, updates, and engineering deep-dives from our team.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-white/40 py-12 text-center border border-white/10 rounded-xl bg-white/5">
            No posts found. Drop a .md file into src/content/blog to get started.
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="group border border-white/10 bg-white/5 p-8 rounded-2xl hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07]"
              >
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {post.meta.title}
                  </h2>
                </Link>
                <p className="text-white/70 mb-6 text-lg leading-relaxed">
                  {post.meta.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> 
                    {post.meta.date ? format(new Date(post.meta.date), "MMMM d, yyyy") : "Draft"}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" /> 
                    {post.meta.author}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
