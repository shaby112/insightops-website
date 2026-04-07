import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImagePlus, Loader2, ShieldCheck, Trash2, Upload, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchAllPosts, type BlogPost } from "@/lib/blog";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogAdmin() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Kuantra Team");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slug, setSlug] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [content, setContent] = useState("# Blog Title\n\nWrite your post in markdown here.");

  const [publishing, setPublishing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([]);

  const effectiveSlug = useMemo(() => toSlug(slug || title), [slug, title]);

  const parseJsonSafe = async (res: Response) => {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      throw new Error(text || `Request failed (${res.status})`);
    }
  };

  const refreshPosts = async () => {
    const posts = await fetchAllPosts();
    setExistingPosts(posts.filter((p) => !p.meta.draft));
  };

  useEffect(() => {
    refreshPosts().catch((e: any) => {
      setExistingPosts([]);
      setError(e?.message || "Unable to load existing posts");
    });
  }, []);

  const loadPostForEdit = (postSlug: string) => {
    const post = existingPosts.find((p) => p.slug === postSlug);
    if (!post) return;

    setTitle(post.meta.title || "");
    setDescription(post.meta.description || "");
    setAuthor(post.meta.author || "Kuantra Team");
    setDate(post.meta.date || new Date().toISOString().slice(0, 10));
    setSlug(post.slug);
    setOgImage(post.meta.ogImage || "");
    setContent(post.content || "");
    setMessage(`Loaded '${post.slug}' for editing.`);
    setError("");
  };

  const uploadImage = async (file?: File) => {
    if (!file || !token) return;
    setUploading(true);
    setError("");
    setMessage("");

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);

      const res = await fetch("/api/blog-upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          dataBase64: base64,
        }),
      });

      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data?.error || "Image upload failed");

      const url = data.path;
      if (!ogImage) setOgImage(url);
      setContent((prev) => `${prev}\n\n![${file.name}](${url})\n`);
      setMessage(`Image uploaded: ${url}`);
    } catch (e: any) {
      setError(e?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setError("Admin token is required.");

    setPublishing(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/blog-publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          author,
          date,
          slug: effectiveSlug,
          ogImage,
          content,
        }),
      });

      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data?.error || "Publish failed");

      setMessage(`Published successfully: ${data.url}`);
      await refreshPosts();
    } catch (e: any) {
      setError(e?.message || "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  const updatePost = async () => {
    if (!token) return setError("Admin token is required.");
    if (!effectiveSlug) return setError("Load/select a post first, or set a valid slug.");

    setUpdating(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/blog-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          author,
          date,
          slug: effectiveSlug,
          ogImage,
          content,
        }),
      });

      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data?.error || "Update failed");
      setMessage(`Updated successfully: ${data.url}`);
      await refreshPosts();
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const deletePost = async (targetSlug?: string) => {
    const slugToDelete = toSlug(targetSlug || effectiveSlug);
    if (!token) return setError("Admin token is required.");
    if (!slugToDelete) return setError("Valid slug is required for delete.");

    const ok = window.confirm(`Delete blog post '${slugToDelete}'? This cannot be undone.`);
    if (!ok) return;

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/blog-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug: slugToDelete }),
      });

      const data = await parseJsonSafe(res);
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setMessage(`Deleted successfully: ${slugToDelete}`);
      await refreshPosts();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#0A0A0A] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Blog Publisher</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create, edit, and delete blog posts</h1>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              View blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <form onSubmit={publish} className="space-y-4">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              <div className="flex items-center gap-2 font-medium"><ShieldCheck className="h-4 w-4" /> Protected publisher access</div>
              <p className="mt-1 text-emerald-100/80">Enter BLOG_ADMIN_TOKEN to publish, edit, delete, and upload images.</p>
            </div>

            <Input
              type="password"
              placeholder="BLOG_ADMIN_TOKEN"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/40"
              required
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" required />
              <Input placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" required />
              <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" required />
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" required />
              <Input placeholder="Slug (optional, auto from title)" value={slug} onChange={(e) => setSlug(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white md:col-span-2" />
              <Input placeholder="OG image URL (optional)" value={ogImage} onChange={(e) => setOgImage(e.target.value)} className="h-11 border-white/10 bg-white/5 text-white md:col-span-2" />
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/60">Final slug: <span className="text-white">{effectiveSlug || "(set title)"}</span></div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">Content (Markdown)</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[280px] border-white/10 bg-white/5 text-white" required />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                Upload image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  className="hidden"
                  onChange={(e) => uploadImage(e.target.files?.[0])}
                />
              </label>

              <Button type="submit" disabled={publishing} className="relative overflow-hidden border-0 bg-transparent px-5 text-white before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/40 before:via-purple-500/40 before:to-emerald-500/40 before:opacity-70 before:blur-sm">
                {publishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />} Publish new
              </Button>

              <Button type="button" disabled={updating} onClick={updatePost} className="border border-white/15 bg-white/5 text-white hover:bg-white/10">
                {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PencilLine className="mr-2 h-4 w-4" />} Update existing
              </Button>

              <Button type="button" disabled={deleting} onClick={() => deletePost()} className="border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20">
                {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />} Delete by slug
              </Button>
            </div>

            {message && <p className="text-sm text-emerald-300">{message}</p>}
            {error && <p className="text-sm text-red-300">{error}</p>}
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold">Existing posts</h2>
          <p className="mt-1 text-sm text-white/60">Click Edit to load post into form. Delete removes it from website.</p>

          <div className="mt-4 grid gap-3">
            {existingPosts.map((post) => (
              <div key={post.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div>
                  <p className="text-sm font-medium">{post.meta.title}</p>
                  <p className="text-xs text-white/55">/{post.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" onClick={() => loadPostForEdit(post.slug)} className="border border-white/15 bg-white/5 text-white hover:bg-white/10">
                    <PencilLine className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button type="button" onClick={() => deletePost(post.slug)} className="border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            ))}
            {existingPosts.length === 0 && <p className="text-sm text-white/50">No posts found.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
