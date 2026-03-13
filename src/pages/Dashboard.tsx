import { useState } from "react";
import { Copy, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    // Simulate network delay for mock action
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setLicenseKey(`kuan_live_${randomHex}`);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">License Management</h1>
        <p className="mt-2 text-white/60">Manage your InsightOps platform access keys.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        {!licenseKey ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-emerald-500/10 p-4">
              <KeyRound className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-white">No active license</h2>
            <p className="mb-8 max-w-sm text-sm text-white/60">
              You haven't generated a license key yet. Create one to authenticate your InsightOps deployment.
            </p>
            <Button
              onClick={handleGenerateKey}
              disabled={isGenerating}
              className="h-12 bg-white px-8 text-black hover:bg-white/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate License Key"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Active License Key</h3>
                <p className="text-sm text-white/60">Keep this key secret. It provides full access to your cluster.</p>
              </div>
            </div>

            <div className="relative flex items-center rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-emerald-400">
              <code className="flex-1 break-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {licenseKey}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="ml-4 h-8 w-8 shrink-0 text-white/60 hover:text-white"
              >
                {copied ? <span className="text-xs">Copied</span> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="rounded-lg bg-yellow-500/10 p-4 text-sm text-yellow-500/90">
              This is a production key. Add it to your <code>.env</code> file or InsightOps configuration.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
