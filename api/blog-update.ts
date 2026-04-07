import { requireAdminToken, supabaseRest } from "./_supabase-rest.js";

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
    const response = await supabaseRest(`/rest/v1/blog_posts?slug=eq.${encodeURIComponent(finalSlug)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title,
        description,
        author,
        content,
        date: date || new Date().toISOString().slice(0, 10),
        og_image: ogImage || null,
        updated_at: new Date().toISOString(),
      }),
    });

    const data = await response.json().catch(() => []);
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || data?.error || "Unable to update post" });
    }

    const updated = Array.isArray(data) ? data[0] : data;
    if (!updated?.slug) return res.status(404).json({ error: `Post not found for slug '${finalSlug}'` });

    return res.status(200).json({ ok: true, slug: updated.slug, url: `/blog/${updated.slug}` });
  } catch {
    return res.status(500).json({ error: "Unable to update post" });
  }
}
