import { supabaseRest } from "./_supabase-rest.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const response = await supabaseRest(
      "/rest/v1/blog_posts?select=slug,title,description,author,date,og_image,draft,updated_at&draft=eq.false&order=date.desc",
      { method: "GET" },
    );

    const data = await response.json().catch(() => []);
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || data?.error || "Failed to fetch blog posts" });
    }

    const posts = (data || []).map((p) => ({
      slug: p.slug,
      meta: {
        title: p.title,
        description: p.description,
        author: p.author,
        date: p.date,
        ogImage: p.og_image || undefined,
        draft: p.draft,
      },
      content: "",
    }));

    return res.status(200).json({ posts });
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}
