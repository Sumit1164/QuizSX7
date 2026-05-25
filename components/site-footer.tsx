import Link from "next/link";
import { BookOpenCheck, Code2, Github, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sumit-tripathi1164/",
    icon: Linkedin
  },
  {
    label: "X",
    href: "https://x.com/IgSumit2",
    textIcon: "X"
  },
  {
    label: "GitHub",
    href: "https://github.com/Sumit1164",
    icon: Github
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sumit_t.09/",
    icon: Instagram
  },
  {
    label: "Coding Platform",
    href: "https://s7code.vercel.app/auth",
    icon: Code2
  }
];

const practiceLinks = [
  { label: "Aptitude", href: "/practice/aptitude" },
  { label: "C++", href: "/practice/cpp" },
  { label: "Java", href: "/practice/java" },
  { label: "Python", href: "/practice/python" },
  { label: "JavaScript", href: "/practice/javascript" }
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container grid gap-8 py-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpenCheck className="h-5 w-5" />
            </span>
            <span>QuizSX7</span>
          </Link>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  {Icon ? <Icon className="h-5 w-5" /> : <span className="text-sm font-black">{item.textIcon}</span>}
                </a>
              );
            })}
          </div>
        </div>
        <nav aria-label="Practice links" className="min-w-44">
          <h2 className="text-sm font-black uppercase text-foreground">Practice</h2>
          <div className="mt-4 grid gap-2 text-sm font-semibold text-muted-foreground">
            {practiceLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
