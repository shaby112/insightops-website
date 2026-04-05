import { getSupabaseAdmin, requireAdminToken } from "./_supabase";

function sanitizeSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  if (!requireAdminToken(req)) return res.status(401).json({ error: "Unauthorized" });

  const { title, description, author, content, date, slug, ogImage } = req.body || {};
  if (!title || !description || !author || !content || !slug) {
    return res.status(400).json({ error: "title, description, author, content, slug are required" });
  }

  const finalSlug = sanitizeSlug(slug);
  if (!finalSlug) return res.status(400).json({ error: "Invalid slug" });

  try {
    const supabase = getSupabaseAdmin();
    const postDate = date || new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        title,
        description,
        author,
        content,
        date: postDate,
        og_image: ogImage || null,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", finalSlug)
      .select("slug")
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: `Post not found for slug '${finalSlug}'` });

    return res.status(200).json({ ok: true, slug: data.slug, url: `/blog/${data.slug}` });
  } catch {
    return res.status(500).json({ error: "Unable to update post" });
  }
}
