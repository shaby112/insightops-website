import { requireAdminToken, supabaseRest } from "./_supabase-rest.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  if (!requireAdminToken(req)) return res.status(401).json({ error: "Unauthorized" });

  const { fileName, mimeType, dataBase64 } = req.body || {};
  if (!fileName || !mimeType || !dataBase64) {
    return res.status(400).json({ error: "fileName, mimeType, dataBase64 are required" });
  }

  if (!/^image\/(png|jpeg|jpg|webp|gif|svg\+xml)$/.test(mimeType)) {
    return res.status(400).json({ error: "Unsupported image type" });
  }

  const bucket = process.env.SUPABASE_BLOG_BUCKET || "blog-images";
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl) return res.status(500).json({ error: "Supabase URL not configured" });

  try {
    const safeName = String(fileName).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    const ext = safeName.includes(".") ? safeName.split(".").pop() : "png";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const buffer = Buffer.from(dataBase64, "base64");

    const response = await supabaseRest(`/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": mimeType,
        "x-upsert": "false",
      },
      body: buffer,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || data?.error || "Unable to upload image" });
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
    return res.status(200).json({ ok: true, path: publicUrl });
  } catch {
    return res.status(500).json({ error: "Unable to upload image" });
  }
}
