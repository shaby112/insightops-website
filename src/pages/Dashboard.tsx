import { useState } from "react";
import { Copy, Download, KeyRound, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setLicenseKey(`kuan_live_${randomHex}`);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge className="border border-teal-400/30 bg-teal-400/10 text-teal-200">License Portal</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Account & License Management</h1>
          <p className="mt-2 text-white/60">Manage subscription status, deployment keys, and onboarding assets.</p>
        </div>
        <Button className="border-0 bg-teal-500 text-[#032321] hover:bg-teal-400">
          <Download className="mr-2 h-4 w-4" />
          Download Docker Compose
        </Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70">Active Subscription</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p className="text-lg font-semibold text-emerald-200">Pro Plan</p>
            <p className="text-xs text-white/60">$200/month · Renews Apr 14, 2026</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70">License Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Active and verified
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70">Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-violet-300" />
            Ready for self-hosted setup
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">License Key</CardTitle>
          <CardDescription className="text-white/60">
            Generate a production key and copy it into your Docker environment variables.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!licenseKey ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 px-6 py-14 text-center">
              <div className="mb-4 rounded-full bg-teal-500/10 p-4">
                <KeyRound className="h-8 w-8 text-teal-300" />
              </div>
              <h2 className="mb-2 text-xl font-medium text-white">No active key</h2>
              <p className="mb-8 max-w-sm text-sm text-white/60">
                Create your first license key to activate Kuantra in your self-hosted Docker deployment.
              </p>
              <Button
                onClick={handleGenerateKey}
                disabled={isGenerating}
                className="h-11 border-0 bg-teal-500 px-8 text-[#032321] hover:bg-teal-400"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate License Key"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/45">Active key</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 break-all font-mono text-sm text-emerald-300">{licenseKey}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-8 w-8 shrink-0 text-white/60 hover:text-white"
                    aria-label="Copy license key"
                  >
                    {copied ? <span className="text-xs">Done</span> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-300/20 bg-yellow-500/10 p-4 text-sm text-yellow-100/90">
                This is a production credential. Store it in your <code>.env</code> file and rotate if exposed.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
