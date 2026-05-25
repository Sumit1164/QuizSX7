import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ClipboardList, UserRound } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "QuizSX7 student dashboard for placement practice."
};

export default function DashboardPage() {
  return (
    <main className="container py-10">
      <h1 className="text-4xl font-black">Dashboard</h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Continue practice, review your test history, and build consistency for placement preparation.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/practice">
          <Card className="h-full transition hover:border-primary">
            <CardHeader>
              <ClipboardList className="h-6 w-6 text-primary" />
              <CardTitle className="flex items-center justify-between">
                Practice topics <ArrowRight className="h-5 w-5" />
              </CardTitle>
              <CardDescription>Start aptitude or programming MCQs.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/profile">
          <Card className="h-full transition hover:border-primary">
            <CardHeader>
              <UserRound className="h-6 w-6 text-primary" />
              <CardTitle className="flex items-center justify-between">
                Profile history <ArrowRight className="h-5 w-5" />
              </CardTitle>
              <CardDescription>See saved attempts and score summaries.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
