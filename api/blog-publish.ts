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
  if (!title || !description || !author || !content) {
    return res.status(400).json({ error: "title, description, author, content are required" });
  }

  const finalSlug = sanitizeSlug(slug || title);
  if (!finalSlug) return res.status(400).json({ error: "Invalid slug" });

  try {
    const response = await supabaseRest("/rest/v1/blog_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        slug: finalSlug,
        title,
        description,
        author,
        content,
        date: date || new Date().toISOString().slice(0, 10),
        og_image: ogImage || null,
        draft: false,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const msg = data?.message || data?.error || "Unable to publish post";
      if (String(msg).toLowerCase().includes("duplicate") || String(msg).includes("23505")) {
        return res.status(409).json({ error: `A post already exists for slug '${finalSlug}'` });
      }
      return res.status(response.status).json({ error: msg });
    }

    const created = Array.isArray(data) ? data[0] : data;
    return res.status(200).json({ ok: true, slug: created.slug || finalSlug, url: `/blog/${created.slug || finalSlug}` });
  } catch {
    return res.status(500).json({ error: "Unable to publish post" });
  }
}
