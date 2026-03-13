import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const clerkUserButtonAppearance = {
  elements: {
    avatarBox: "h-8 w-8 ring-2 ring-violet-500/40",
    userButtonTrigger: "focus:shadow-none",
  },
};

export function AppHeader() {
    const location = useLocation();

  const navItems = [
    { name: "Product", path: "/features" },
    { name: "Blog", path: "/blog" },
    { name: "Install", path: "/install" },
    { name: "Pricing", path: "/pricing" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050914]/95 supports-[backdrop-filter]:bg-[#050914]/85 backdrop-blur-xl font-sans">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3.5 transition-opacity hover:opacity-90">
          <Logo size="md" showText={false} className="drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]" />
          <span className="text-[20px] font-semibold tracking-[0.01em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)]">Kuantra</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/blog' && location.pathname.startsWith('/blog/'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 ${
                  isActive ? "text-white font-medium" : "text-white/55 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Log In
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="sm"
                className="relative overflow-hidden rounded-lg bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 hover:border-white/20 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/30 before:via-purple-500/30 before:to-emerald-500/30 before:opacity-50 before:blur-md"
              >
                Get Started
              </Button>
            </Link>
          
            <Link to="/dashboard">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-900/40"
              >
                Dashboard
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
