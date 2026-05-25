import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjects } from "@/lib/data";

export async function generateStaticParams() {
  const subjects = await getSubjects();
  return subjects.map((subject) => ({ subject: subject.slug }));
}

export async function generateMetadata({ params }: { params: { subject: string } }): Promise<Metadata> {
  const subjects = await getSubjects();
  const subject = subjects.find((item) => item.slug === params.subject);
  return {
    title: subject ? `${subject.title} Practice` : "Practice",
    description: subject?.description
  };
}

export default async function SubjectPage({ params }: { params: { subject: string } }) {
  const subjects = await getSubjects();
  const subject = subjects.find((item) => item.slug === params.subject);
  if (!subject) notFound();

  return (
    <main className="container py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase text-primary">Practice subject</p>
        <h1 className="mt-2 text-4xl font-black">{subject.title}</h1>
        <p className="mt-3 leading-7 text-muted-foreground">{subject.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subject.topics.map((topic) => (
          <Link key={topic.slug} href={`/practice/${subject.slug}/${topic.slug}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {topic.title}
                  <ArrowRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>{topic.summary}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
