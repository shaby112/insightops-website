import { getSupabaseAdmin, requireAdminToken } from "./_supabase";

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
  const supabaseUrl = process.env.SUPABASE_URL;
  if (!supabaseUrl) return res.status(500).json({ error: "Supabase URL not configured" });

  try {
    const supabase = getSupabaseAdmin();
    const safeName = String(fileName).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
    const ext = safeName.includes(".") ? safeName.split(".").pop() : "png";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const buffer = Buffer.from(dataBase64, "base64");

    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: mimeType,
      upsert: false,
    });

    if (error) return res.status(500).json({ error: error.message });

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
    return res.status(200).json({ ok: true, path: publicUrl });
  } catch {
    return res.status(500).json({ error: "Unable to upload image" });
  }
}
