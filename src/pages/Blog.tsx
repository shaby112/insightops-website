import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { fetchAllPosts, type BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchAllPosts();
        if (!mounted) return;
        const filtered = data.filter(
          (post) =>
            !post.meta.draft &&
            Boolean(post.meta.title) &&
            Boolean(post.meta.description) &&
            Boolean(post.meta.author) &&
            Boolean(post.meta.date)
        );
        setPosts(filtered);
      } catch {
        if (mounted) setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen px-6 pb-12 pt-24 text-white">
      <Helmet>
        <title>Blog | Kuantra</title>
        <meta name="description" content="Engineering updates, product news, and analytical deep-dives from the Kuantra team." />
        <meta property="og:title" content="Blog | Kuantra" />
      </Helmet>

      <div className="mx-auto max-w-4xl">
        <header className="mb-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Kuantra Blog</h1>
          <p className="text-xl text-white/60">Thoughts, updates, and engineering deep-dives from our team.</p>
        </header>

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-white/5 py-12 text-center text-white/40">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 py-12 text-center text-white/40">No posts found.</div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="mb-3 text-3xl font-semibold text-white transition-colors group-hover:text-blue-400">{post.meta.title}</h2>
                </Link>
                <p className="mb-6 text-lg leading-relaxed text-white/70">{post.meta.description}</p>
                <div className="flex items-center gap-6 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.meta.date ? format(new Date(post.meta.date), "MMMM d, yyyy") : "Draft"}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
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
