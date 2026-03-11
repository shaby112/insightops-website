import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { PricingSection } from "@/components/pricing/PricingSection";

const clerkUserButtonAppearance = {
  elements: {
    avatarBox: "h-8 w-8 ring-2 ring-violet-500/40",
    userButtonTrigger: "focus:shadow-none",
  },
};

export default function Pricing() {
  return (
    <div className="dark">
      <main className="min-h-screen bg-[#030C1A] text-white font-sans">
        

        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
        </div>

        <PricingSection />

        {/* Footer */}
        <footer className="border-t border-white/[0.07] py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/30 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo size="sm" showText={false} />
              <span>Kuantra</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/" className="hover:text-white/60 transition-colors">Back to home</Link>
              <Link to="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
