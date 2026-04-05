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

  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.BLOG_ADMIN_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { slug } = req.body || {};
  const finalSlug = sanitizeSlug(slug || "");
  if (!finalSlug) return res.status(400).json({ error: "Valid slug is required" });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) return res.status(500).json({ error: "GitHub token not configured" });

  const repo = "shaby112/kuantra-website";
  const path = `src/content/blog/${finalSlug}.md`;

  try {
    const check = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=main`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!check.ok) {
      return res.status(404).json({ error: `Post not found for slug '${finalSlug}'` });
    }

    const existing = await check.json();
    const sha = existing?.sha;
    if (!sha) return res.status(500).json({ error: "Could not resolve file SHA" });

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `docs(blog): delete ${finalSlug}`,
        sha,
        branch: "main",
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.message || "Delete failed" });
    }

    return res.status(200).json({ ok: true, slug: finalSlug });
  } catch {
    return res.status(500).json({ error: "Unable to delete post" });
  }
}
