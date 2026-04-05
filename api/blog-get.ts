import { getSupabaseAdmin } from "./_supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const slug = String(req.query?.slug || "").toLowerCase().trim();
  if (!slug) return res.status(400).json({ error: "slug is required" });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug,title,description,author,date,og_image,draft,content")
      .eq("slug", slug)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.draft) return res.status(404).json({ error: "Post not found" });

    const post = {
      slug: data.slug,
      meta: {
        title: data.title,
        description: data.description,
        author: data.author,
        date: data.date,
        ogImage: data.og_image || undefined,
        draft: data.draft,
      },
      content: data.content || "",
    };

    return res.status(200).json({ post });
  } catch {
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
}
