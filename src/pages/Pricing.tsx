import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { PricingSection } from "@/components/pricing/PricingSection";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/install" className="text-sm text-muted-foreground hover:text-foreground">
              Install
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <PricingSection />
    </main>
  );
}
