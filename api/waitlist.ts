import { getSupabaseAdmin } from "./_supabase.js";

function normalize(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
  if (!LOOPS_API_KEY) {
    return res.status(500).json({ error: "Waitlist service not configured." });
  }

  const firstName = normalize(req.body?.firstName);
  const lastName = normalize(req.body?.lastName);
  const businessName = normalize(req.body?.businessName);
  const email = normalize(req.body?.email).toLowerCase();
  const dataConnectors = normalize(req.body?.dataConnectors);

  if (!firstName || !lastName || !businessName || !email || !dataConnectors) {
    return res.status(400).json({ error: "firstName, lastName, businessName, email, and dataConnectors are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid business email." });
  }

  try {
    // Primary path: always make sure user is captured in Loops.
    const loopsRes = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        source: "kuantra-waitlist",
        subscribed: true,
        userGroup: "waitlist",
        businessName,
        dataConnectors,
      }),
    });

    const loopsData = await loopsRes.json().catch(() => ({}));

    if (!loopsRes.ok) {
      const message = loopsData?.message || loopsData?.error || "Failed to join waitlist.";
      return res.status(502).json({ error: message });
    }

    // Secondary path: best-effort DB storage (do not block signup if DB config is missing/broken).
    try {
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = getSupabaseAdmin();
        const { error: dbError } = await supabase.from("waitlist_signups").upsert(
          {
            email,
            first_name: firstName,
            last_name: lastName,
            business_name: businessName,
            source: "kuantra-waitlist",
          },
          { onConflict: "email" },
        );

        if (dbError) {
          console.error("waitlist_signups upsert failed:", dbError.message || dbError);
        }
      } else {
        console.warn("Supabase env vars missing; skipping waitlist_signups DB write.");
      }
    } catch (dbErr) {
      console.error("waitlist_signups write error:", dbErr);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Unable to reach waitlist service." });
  }
}
