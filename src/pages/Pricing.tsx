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
        {/* NAV */}
        <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#030C1A]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <span className="text-[17px] font-semibold tracking-tight text-white">InsightOps</span>
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <Link to="/features" className="hover:text-white transition-colors duration-200">Product</Link>
              <Link to="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
              <Link to="/install" className="hover:text-white transition-colors duration-200">Install</Link>
              <Link to="/pricing" className="text-white font-medium">Pricing</Link>
            </nav>

            <div className="flex items-center gap-2">
              <SignedOut>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/downloads">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40 mr-1">
                    Downloads
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" appearance={clerkUserButtonAppearance} />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        <PricingSection />

        {/* Footer */}
        <footer className="border-t border-white/[0.07] py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/30 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo size="sm" showText={false} />
              <span>InsightOps · Data Intel. &amp; Modeling</span>
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
