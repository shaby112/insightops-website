export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { slug, title, description, author, content, date } = req.body;
  const token = req.headers.authorization;

  if (token !== `Bearer ${process.env.BLOG_API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // To save a file to the repo from a Vercel function, we must use the GitHub API
  // since the Vercel filesystem is ephemeral and read-only.
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GitHub token not configured.' });
  }

  try {
    const postDate = date || new Date().toISOString().split('T')[0];
    const markdown = `---
title: ${title}
description: ${description}
date: ${postDate}
author: ${author}
---

${content}
`;

    const repo = "shaby112/kuantra-website";
    const path = `src/content/blog/${slug}.md`;

    // Check if file exists first

    const checkResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=main`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      }
    });

    if (checkResponse.ok) {
      return res.status(409).json({ error: `Blog post with slug '${slug}' already exists.` });
    }

    // Push to GitHub API
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `docs: add new blog post ${slug}`,
        content: Buffer.from(markdown).toString("base64"),
        branch: "main"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    return res.status(200).json({ message: "Blog post successfully published to GitHub." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
