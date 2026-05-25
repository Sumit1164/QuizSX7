"use client";

import Link from "next/link";
import { BookOpenCheck, LogOut, Menu, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { logout } from "@/lib/firebase-client";

const navItems = [
  { href: "/practice", label: "Practice" },
  { href: "/companies/tcs", label: "Companies" },
  { href: "/dashboard", label: "Dashboard" }
];

export function SiteHeader() {
  const { user, configured } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-black tracking-normal">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpenCheck className="h-5 w-5" />
          </span>
          <span>QuizSX7</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className="inline-flex items-center gap-1 hover:text-foreground">
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/profile">
                  <UserRound className="h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Log out" onClick={() => void logout()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">{configured ? "Login" : "Setup Auth"}</Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Link href="/practice">
              <Menu className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
