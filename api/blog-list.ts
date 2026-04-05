import { getSupabaseAdmin } from "./_supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug,title,description,author,date,og_image,draft,updated_at")
      .eq("draft", false)
      .order("date", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

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
