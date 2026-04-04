import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // TODO: Replace with your actual Loops.so or Brevo endpoint
    // Example: fetch("https://app.loops.so/api/v1/contacts/create", { method: "POST", ... })
    
    // Simulate API call for now
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  if (status === "success") {
    return (
      <div className="flex animate-in fade-in slide-in-from-bottom-2 items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-100 backdrop-blur-md">
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        <span className="text-sm font-medium">You're on the list! We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-8 w-full max-w-md">
      <div className="group relative flex items-center rounded-xl bg-white/5 p-1.5 ring-1 ring-white/10 transition-all focus-within:bg-white/10 focus-within:ring-white/20 hover:bg-white/10">
        
        {/* Input */}
        <Input
          id="waitlist-form"
          type="email"
          placeholder="Enter your work email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="h-12 border-0 bg-transparent px-4 text-white placeholder:text-white/40 focus-visible:ring-0 sm:text-sm"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={status === "loading" || !email}
          className="relative ml-2 h-10 shrink-0 overflow-hidden rounded-lg bg-transparent px-5 font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50 sm:px-6 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/40 before:via-purple-500/40 before:to-emerald-500/40 before:opacity-70 before:blur-sm hover:before:from-indigo-500/60 hover:before:via-purple-500/60 hover:before:to-emerald-500/60 hover:scale-[1.02]"
        >
          <span className="relative flex items-center gap-2">
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Join <span className="hidden sm:inline">Waitlist</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </span>
        </Button>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40 font-medium">
        <Sparkles className="h-3 w-3 text-purple-400" /> 
        <span>Reserve your spot for early access</span>
      </p>
    </form>
  );
}
