import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "QuizSX7 | Placement Practice for B-Tech Students",
    template: "%s | QuizSX7"
  },
  description:
    "Practice aptitude, C++, Python, Java, JavaScript, and company placement questions with guided MCQ tests for B-Tech students.",
  applicationName: "QuizSX7",
  openGraph: {
    title: "QuizSX7",
    description: "Placement practice for TCS, Google, Amazon, Microsoft, Infosys, Flipkart and more.",
    url: "/",
    siteName: "QuizSX7",
    type: "website"
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#0b635e",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <AuthProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
