import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearAuth, getUser, isAuthenticated } from "@/lib/auth";

export function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => setSignedIn(isAuthenticated());
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const signedOutNav = [
    { name: "Product", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Docs", path: "/install" },
    { name: "Blog", path: "/blog" },
  ];

  const signedInNav = [
    { name: "Docs", path: "/install" },
    { name: "Blog", path: "/blog" },
    { name: "Support", path: "/account" },
  ];

  const navItems = signedIn ? signedInNav : signedOutNav;
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    setSignedIn(false);
    navigate("/");
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
          {signedIn ? (
            <>
              <Link to="/dashboard">
                <Button size="sm" className="border-0 bg-teal-500 text-[#032321] hover:bg-teal-400">
                  Account / License Portal
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 hover:text-white">
                    <UserCircle2 className="mr-1 h-4 w-4" />
                    {user?.username || "Account"}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-white/10 bg-[#0a1127] text-white">
                  <DropdownMenuItem onClick={() => navigate("/account")}>Account</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>License Portal</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-white/70 hover:bg-white/10 hover:text-white">
                  Log In
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="border-0 bg-teal-500 text-[#032321] hover:bg-teal-400">
                  Start Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
