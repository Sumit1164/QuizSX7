import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Code2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Practice",
  description: "Choose aptitude, C++, Python, Java, or JavaScript placement practice topics on QuizSX7."
};

export default async function PracticePage() {
  const subjects = await getSubjects();

  return (
    <main className="container py-10">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-black">Practice</h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Select a subject, then choose a topic to start a focused MCQ test.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.slug} href={`/practice/${subject.slug}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {subject.title}
                  <ArrowRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>{subject.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
