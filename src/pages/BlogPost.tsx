import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
          <h1 className="text-2xl font-semibold mb-4 text-white">Post not found</h1>
          <p className="text-white/60 mb-6">The article you are looking for does not exist.</p>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-24 pb-24 px-6">
      <Helmet>
        <title>{post.meta.title} | InsightOps</title>
        <meta name="description" content={post.meta.description} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={post.meta.description} />
        <meta property="og:type" content="article" />
        {post.meta.ogImage && <meta property="og:image" content={post.meta.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <nav className="mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>
        </nav>
        
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-6 text-white/50 text-sm font-medium">
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Calendar className="w-4 h-4" /> 
              {post.meta.date ? format(new Date(post.meta.date), "MMMM d, yyyy") : "Draft"}
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <User className="w-4 h-4" /> 
              {post.meta.author}
            </span>
          </div>
        </header>
        
        {/* Tailwind Typography plugin classes for rendering markdown elegantly */}
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-blue-400 prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
