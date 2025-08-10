"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Wizard", href: "/wizard" },
    { name: "Forms List", href: "/forms" },
  ];

  return (
    <Navbar
      className="bg-background shadow-sm border-b border-divider"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold italic text-primary-700">
            FORMeNGINE
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href}>
              <Button
                variant={
                  pathname === item.href ||
                  (item.href === "/wizard" && pathname.startsWith("/wizard"))
                    ? "flat"
                    : "light"
                }
                color={
                  pathname === item.href ||
                  (item.href === "/wizard" && pathname.startsWith("/wizard"))
                    ? "primary"
                    : "default"
                }
                size="sm"
                radius="none"
              >
                {item.name}
              </Button>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

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

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className={`w-full block ${
                pathname === item.href ||
                (item.href === "/wizard" && pathname.startsWith("/wizard"))
                  ? "text-primary font-semibold"
                  : "text-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
