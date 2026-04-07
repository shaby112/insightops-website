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

  const finalSlug = sanitizeSlug(req.body?.slug || "");
  if (!finalSlug) return res.status(400).json({ error: "Valid slug is required" });

  try {
    const response = await supabaseRest(`/rest/v1/blog_posts?slug=eq.${encodeURIComponent(finalSlug)}`, {
      method: "DELETE",
      headers: {
        Prefer: "return=representation",
      },
    });

    const data = await response.json().catch(() => []);
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || data?.error || "Unable to delete post" });
    }

    const deleted = Array.isArray(data) ? data[0] : data;
    if (!deleted?.slug) return res.status(404).json({ error: `Post not found for slug '${finalSlug}'` });

    return res.status(200).json({ ok: true, slug: finalSlug });
  } catch {
    return res.status(500).json({ error: "Unable to delete post" });
  }
}
