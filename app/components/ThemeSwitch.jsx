"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-[72px] items-center rounded-full bg-slate-200 px-1 transition dark:bg-slate-700"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform dark:bg-slate-900 ${
          currentTheme === "dark" ? "translate-x-9" : "translate-x-0"
        }`}
      >
        {currentTheme === "dark" ? (
          <Moon size={14} className="text-yellow-400" />
        ) : (
          <Sun size={14} className="text-orange-500" />
        )}
      </span>
    </button>
  );
}