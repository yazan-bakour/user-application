"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import { useState, useEffect } from "react";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Navbar className="bg-background shadow-sm border-b border-divider">
      <NavbarBrand>
        <p className="font-bold text-foreground">React Hook Form & HeroUi</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-2">
          <span className="text-sm text-foreground">☀️</span>
          <Switch
            isSelected={isDarkMode}
            onValueChange={toggleTheme}
            aria-label="Toggle dark mode"
            size="sm"
          />
          <span className="text-sm text-foreground">🌙</span>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
