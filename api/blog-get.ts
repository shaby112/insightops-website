import { supabaseRest } from "./_supabase-rest.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const slug = String(req.query?.slug || "").toLowerCase().trim();
  if (!slug) return res.status(400).json({ error: "slug is required" });

  try {
    const response = await supabaseRest(
      `/rest/v1/blog_posts?select=slug,title,description,author,date,og_image,draft,content&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { method: "GET" },
    );

    const data = await response.json().catch(() => []);
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || data?.error || "Failed to fetch blog post" });
    }

    const row = Array.isArray(data) ? data[0] : null;
    if (!row || row.draft) return res.status(404).json({ error: "Post not found" });

    return res.status(200).json({
      post: {
        slug: row.slug,
        meta: {
          title: row.title,
          description: row.description,
          author: row.author,
          date: row.date,
          ogImage: row.og_image || undefined,
          draft: row.draft,
        },
        content: row.content || "",
      },
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
}
