import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

const clerkUserButtonAppearance = {
  elements: {
    avatarBox: "h-8 w-8 ring-2 ring-violet-500/40",
    userButtonTrigger: "focus:shadow-none",
  },
};

export function AppHeader() {
  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { name: "Product", path: "/features" },
    { name: "Blog", path: "/blog" },
    { name: "Install", path: "/install" },
    { name: "Pricing", path: "/pricing" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-xl font-sans">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo size="sm" showText={false} />
          <span className="text-[17px] font-semibold tracking-tight text-white">Kuantra</span>
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
          <ThemeToggle />
          <SignedOut>
            <Link to="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Log In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                size="sm"
                className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40"
              >
                Get Started
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4 pl-2 border-l border-white/10">
              <div className="hidden lg:flex flex-col items-end leading-tight">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Account</span>
                <span className="text-sm font-bold text-white">{user?.username || user?.firstName || "User"}</span>
              </div>
              <Link to="/downloads">
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-lg shadow-violet-900/40"
                >
                  Downloads
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" appearance={clerkUserButtonAppearance} />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
