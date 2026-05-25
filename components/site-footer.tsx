import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2 font-black">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpenCheck className="h-5 w-5" />
          </span>
          <span>QuizSX7</span>
        </Link>
        <nav className="flex flex-wrap gap-5 text-sm font-semibold text-muted-foreground">
          <Link href="/practice" className="hover:text-foreground">
            Practice
          </Link>
          <Link href="/companies/tcs" className="hover:text-foreground">
            Companies
          </Link>
          <Link href="/profile" className="hover:text-foreground">
            Profile
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">Placement practice for B-Tech students.</p>
      </div>
    </footer>
  );
}
