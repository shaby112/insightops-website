import fm from "front-matter";

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

const mdFiles = import.meta.glob("/src/content/blog/*.md", { eager: true, query: "?raw" });

function getMarkdownPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, module] of Object.entries(mdFiles)) {
    try {
      const rawContent = (module as any).default || module;
      const parsed = fm<BlogPostMeta>(rawContent as string);
      const slug = path.split("/").pop()?.replace(".md", "") || "";

      posts.push({
        slug,
        meta: parsed.attributes,
        content: parsed.body,
      });
    } catch (error) {
      console.error(`Skipping malformed blog file: ${path}`, error);
    }
  }

  return posts.sort((a, b) => {
    const bt = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    const at = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    return bt - at;
  });
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || `Request failed (${res.status})`);
  }
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("/api/blog-list");
    const data = await parseJsonSafe(res);

    if (!res.ok) {
      throw new Error(data?.error || `Failed to fetch blog posts (${res.status})`);
    }

    return data.posts || [];
  } catch (error) {
    console.error("Falling back to markdown posts because API failed:", error);
    return getMarkdownPosts().filter((p) => !p.meta.draft);
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/api/blog-get?slug=${encodeURIComponent(slug)}`);
    const data = await parseJsonSafe(res);

    if (res.status === 404) {
      const fallback = getMarkdownPosts().find((post) => post.slug === slug);
      return fallback || null;
    }

    if (!res.ok) {
      throw new Error(data?.error || `Failed to fetch blog post (${res.status})`);
    }

    return data.post || null;
  } catch (error) {
    console.error("Falling back to markdown post because API failed:", error);
    const fallback = getMarkdownPosts().find((post) => post.slug === slug);
    return fallback || null;
  }
}
