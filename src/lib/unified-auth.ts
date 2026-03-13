const FREEMAIL_ROOTS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
];

const SSO_DOMAINS = ["kuantra.ai", "insightops.io", "acme-enterprise.com"];

export type AuthRoute = "blocked" | "sso" | "google" | "magic-link-choice";

export function extractDomain(email: string): string {
  return email.split("@")[1]?.trim().toLowerCase().replace(/\.+$/, "") || "";
}

export function isBlockedFreemailDomain(domain: string): boolean {
  return FREEMAIL_ROOTS.some((root) => domain === root || domain.endsWith(`.${root}`));
}

export function resolveAuthRoute(email: string): AuthRoute {
  const domain = extractDomain(email);
  if (!domain || isBlockedFreemailDomain(domain)) return "blocked";
  if (SSO_DOMAINS.includes(domain)) return "sso";

  // Placeholder for returning-user provider memory until backend wiring is live.
  if (email.toLowerCase().startsWith("google.")) return "google";

  return "magic-link-choice";
}

export function buildMagicLinkPayload(email: string) {
  return {
    email: email.trim().toLowerCase(),
    channel: "email_magic_link",
    redirect_url: `${window.location.origin}/auth/callback`,
    source: "unified_auth_card",
    requested_at: new Date().toISOString(),
  };
}
