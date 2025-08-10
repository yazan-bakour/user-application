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
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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
            isSelected={theme === "dark"}
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
