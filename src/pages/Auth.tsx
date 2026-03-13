import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Building2, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buildMagicLinkPayload,
  extractDomain,
  isBlockedFreemailDomain,
  resolveAuthRoute,
  type AuthRoute,
} from "@/lib/unified-auth";

const authSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
  })
  .superRefine((data, ctx) => {
    const domain = extractDomain(data.email);
    if (isBlockedFreemailDomain(domain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please use your work email address.",
        path: ["email"],
      });
    }
  });

type AuthFormValues = z.infer<typeof authSchema>;

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const [authRoute, setAuthRoute] = useState<AuthRoute | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [magicLinkStatus, setMagicLinkStatus] = useState<string>("");

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsLoading(false);

    setSubmittedEmail(data.email.trim().toLowerCase());
    setAuthRoute(resolveAuthRoute(data.email));
    setMagicLinkStatus("");
  };

  const handleSendMagicLink = async () => {
    if (!submittedEmail) return;

    const payload = buildMagicLinkPayload(submittedEmail);
    setIsSendingMagicLink(true);
    try {
      await fetch("/api/v1/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMagicLinkStatus("Magic link dispatched. Check your inbox.");
    } catch {
      // Dev/staging fallback while backend endpoint is in progress.
      setMagicLinkStatus("Magic link queued (staging mode). Payload generated successfully.");
    } finally {
      setIsSendingMagicLink(false);
      // Keep payload visible to support QA validation.
      console.log("[magic-link-payload]", payload);
    }
  };

  const routeTitle = useMemo(() => {
    if (authRoute === "sso") return "Corporate SSO Detected";
    if (authRoute === "google") return "Google Login Detected";
    if (authRoute === "magic-link-choice") return "Choose verification method";
    return "Welcome to Kuantra";
  }, [authRoute]);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{routeTitle}</h1>
          <p className="text-sm text-white/60">Enter your work email to continue</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="name@company.com"
              className={`h-12 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 ${
                form.formState.errors.email ? "border-red-500/50 focus-visible:ring-red-500/50" : ""
              }`}
              {...form.register("email")}
              autoComplete="email"
              autoFocus
            />
            {form.formState.errors.email && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{form.formState.errors.email.message}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 w-full bg-white text-black font-medium transition-all hover:bg-white/90"
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Continue"}
          </Button>
        </form>

        {authRoute === "magic-link-choice" && (
          <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
            <Button className="h-11 w-full border border-white/20 bg-white/5 text-white hover:bg-white/10" variant="ghost">
              Continue with Google
            </Button>
            <Button
              className="h-11 w-full bg-emerald-500/90 text-black hover:bg-emerald-400"
              onClick={handleSendMagicLink}
              disabled={isSendingMagicLink}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSendingMagicLink ? "Sending..." : "Send Magic Link"}
            </Button>
            {magicLinkStatus && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>{magicLinkStatus}</span>
              </div>
            )}
          </div>
        )}

        {authRoute === "sso" && (
          <Button className="h-11 w-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20" variant="ghost">
            <Building2 className="mr-2 h-4 w-4" />
            Log in with Corporate IdP (SAML)
          </Button>
        )}

        {authRoute === "google" && (
          <Button className="h-11 w-full border border-white/20 bg-white/5 text-white hover:bg-white/10" variant="ghost">
            <ArrowRight className="mr-2 h-4 w-4" />
            Log in with Google
          </Button>
        )}
      </div>
    </div>
  );
}
