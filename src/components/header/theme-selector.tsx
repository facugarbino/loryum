"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const switchTheme = (darkMode: boolean) => {
    const newTheme = darkMode ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex gap-0 "
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
}
