import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "kuantra-theme";

function getStoredDarkMode(): boolean {
  if (typeof window === "undefined") return true;
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light") return false;
  return true;
}

if (typeof document !== "undefined") {
  document.documentElement.classList.toggle("dark", getStoredDarkMode());
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(getStoredDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
