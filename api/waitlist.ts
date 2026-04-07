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

  if (!firstName || !lastName || !businessName || !email) {
    return res.status(400).json({ error: "firstName, lastName, businessName, and email are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid business email." });
  }

  try {
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
      return res.status(500).json({
        error:
          dbError.message ||
          "Unable to store waitlist signup. Ensure waitlist_signups table exists and SUPABASE_* vars are set.",
      });
    }

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
      }),
    });

    const loopsData = await loopsRes.json().catch(() => ({}));

    if (!loopsRes.ok) {
      const message = loopsData?.message || loopsData?.error || "Saved, but failed to subscribe contact in Loops.";
      return res.status(502).json({ error: message });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Unable to reach waitlist service." });
  }
}
