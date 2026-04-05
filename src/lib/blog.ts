export interface BlogPostMeta {
  title: string;
  description: string;
  date?: string;
  author: string;
  draft?: boolean;
  ogImage?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string;
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog-list");
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  const data = await res.json();
  return data.posts || [];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`/api/blog-get?slug=${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog post");
  const data = await res.json();
  return data.post || null;
}
