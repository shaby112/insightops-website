import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function AppHeader() {
  const location = useLocation();

  const navItems = [
    { name: "Product", path: "/features" },
    { name: "Blog", path: "/blog" },
  ];

  const scrollToWaitlist = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      const form = document.getElementById("waitlist-form");
      if (form) {
        form.focus();
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050914]/95 font-sans backdrop-blur-xl supports-[backdrop-filter]:bg-[#050914]/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3.5 transition-opacity hover:opacity-90">
          <Logo size="md" showText={false} className="drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]" />
          <span className="text-[20px] font-semibold tracking-[0.01em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)]">
            Kuantra
          </span>
        </Link>
        
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/blog" && location.pathname.startsWith("/blog/"));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 ${
                  isActive ? "font-medium text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {location.pathname === "/" ? (
            <Button
              onClick={scrollToWaitlist}
              size="sm"
              className="relative overflow-hidden border-0 bg-transparent px-5 font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/40 before:via-purple-500/40 before:to-emerald-500/40 before:opacity-70 before:blur-sm"
            >
              Join Waitlist
            </Button>
          ) : (
            <Link to="/">
               <Button
                size="sm"
                className="relative overflow-hidden border-0 bg-transparent px-5 font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/40 before:via-purple-500/40 before:to-emerald-500/40 before:opacity-70 before:blur-sm"
              >
                Join Waitlist
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
