import fm from 'front-matter';

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

// Vite feature: eager import of all markdown files as raw strings
const mdFiles = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw' });

export function getAllPosts(): BlogPost[] {
  const posts = Object.entries(mdFiles).map(([path, module]) => {
    // Vite's ?raw query returns the string as default export in newer versions, or just the string
    const rawContent = (module as any).default || module;
    const parsed = fm<BlogPostMeta>(rawContent as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    return {
      slug,
      meta: parsed.attributes,
      content: parsed.body,
    };
  });

  // Sort by date descending (undated posts last)
  return posts.sort((a, b) => {
    const bt = b.meta.date ? new Date(b.meta.date).getTime() : 0;
    const at = a.meta.date ? new Date(a.meta.date).getTime() : 0;
    return bt - at;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
