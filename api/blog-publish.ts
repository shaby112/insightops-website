function sanitizeSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function yamlQuote(value = "") {
  return JSON.stringify(String(value ?? ""));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.BLOG_ADMIN_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, description, author, content, date, slug, ogImage } = req.body || {};

  if (!title || !description || !author || !content) {
    return res.status(400).json({ error: "title, description, author, content are required" });
  }

  const finalSlug = sanitizeSlug(slug || title);
  if (!finalSlug) return res.status(400).json({ error: "Invalid slug" });

  const postDate = date || new Date().toISOString().split("T")[0];
  const markdown = `---\ntitle: ${yamlQuote(title)}\ndescription: ${yamlQuote(description)}\ndate: ${yamlQuote(postDate)}\nauthor: ${yamlQuote(author)}\n${ogImage ? `ogImage: ${yamlQuote(ogImage)}\n` : ""}---\n\n${content}\n`;

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

    if (check.ok) {
      return res.status(409).json({ error: `A post already exists for slug '${finalSlug}'` });
    }

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `docs(blog): publish ${finalSlug}`,
        content: Buffer.from(markdown).toString("base64"),
        branch: "main",
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.message || "Publish failed" });
    }

    return res.status(200).json({ ok: true, slug: finalSlug, url: `/blog/${finalSlug}` });
  } catch {
    return res.status(500).json({ error: "Unable to publish post" });
  }
}
