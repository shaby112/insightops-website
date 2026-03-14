function json(res, status, payload) {
  res.status(status).json(payload);
}

function buildMagicLink(email, origin) {
  const token = `mock_token_for_${encodeURIComponent(email)}_${Date.now()}`;
  return `${origin.replace(/\/$/, "")}/auth/verify?token=${token}`;
}

async function sendViaResend({ apiKey, fromEmail, toEmail, magicLink }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: "Your Kuantra magic sign-in link",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827;">
          <h2 style="margin: 0 0 12px;">Sign in to Kuantra</h2>
          <p style="margin: 0 0 16px; color: #4b5563;">Click the secure magic link below to continue:</p>
          <a href="${magicLink}" style="display:inline-block; padding:12px 18px; border-radius:10px; background:#14b8a6; color:#04211f; font-weight:600; text-decoration:none;">
            Sign in with Magic Link
          </a>
          <p style="margin: 18px 0 0; color: #6b7280; font-size: 13px;">If you did not request this email, you can ignore it.</p>
        </div>
      `,
      text: `Sign in to Kuantra using this magic link: ${magicLink}`,
    }),
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method Not Allowed" });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string") {
    return json(res, 400, { error: "Email is required and must be a string." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json(res, 400, { error: "Invalid email format." });
  }

  const domain = email.split("@")[1].toLowerCase();
  const FREEMAIL_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "protonmail.com",
    "zoho.com",
    "mail.com",
    "me.com",
    "msn.com",
  ];

  if (FREEMAIL_DOMAINS.includes(domain)) {
    return json(res, 403, {
      error: "Personal email addresses are not allowed. Please use your work email.",
    });
  }

  for (const freemail of FREEMAIL_DOMAINS) {
    if (domain.endsWith(`.${freemail}`)) {
      return json(res, 403, {
        error: "Personal email subdomains are not allowed. Please use your work email.",
      });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.MAGIC_LINK_FROM_EMAIL || "Kuantra <onboarding@resend.dev>";
  const appOrigin =
    process.env.MAGIC_LINK_APP_ORIGIN ||
    process.env.APP_ORIGIN ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://kuantra-website.vercel.app";

  const magicLink = buildMagicLink(email, appOrigin);

  if (!apiKey) {
    return json(res, 200, {
      success: true,
      message:
        "Magic link email provider is not configured yet. Add RESEND_API_KEY to enable real delivery.",
      _dev: {
        email,
        magicLink,
        provider: "mock",
      },
    });
  }

  try {
    const result = await sendViaResend({
      apiKey,
      fromEmail,
      toEmail: email,
      magicLink,
    });

    if (!result.ok) {
      return json(res, 502, {
        error: "Failed to send magic link email.",
        provider: "resend",
        details: result.data,
      });
    }

    return json(res, 200, {
      success: true,
      message: "Magic link sent successfully. Please check your inbox.",
      provider: "resend",
      requestId: result.data?.id || null,
    });
  } catch (error) {
    return json(res, 500, {
      error: "Unexpected error while sending magic link.",
      provider: "resend",
      details: String(error),
    });
  }
}
