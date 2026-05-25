import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/components/quiz-player";
import { getSubjects, getTopic } from "@/lib/data";

export async function generateStaticParams() {
  const subjects = await getSubjects();
  return subjects.flatMap((subject) => subject.topics.map((topic) => ({ subject: subject.slug, topic: topic.slug })));
}

export async function generateMetadata({
  params
}: {
  params: { subject: string; topic: string };
}): Promise<Metadata> {
  const data = await getTopic(params.subject, params.topic);
  return {
    title: data ? `${data.topic.title} ${data.subject.title} MCQ Practice` : "Topic Practice",
    description: data?.topic.summary
  };
}

export default async function TopicPage({ params }: { params: { subject: string; topic: string } }) {
  const data = await getTopic(params.subject, params.topic);
  if (!data) notFound();

  return (
    <main className="container py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-primary">
            {data.subject.title} / {data.topic.title}
          </p>
          <h1 className="mt-2 text-4xl font-black">{data.topic.title} MCQ Practice</h1>
          <p className="mt-3 leading-7 text-muted-foreground">{data.topic.summary}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/login">Login to save progress</Link>
        </Button>
      </div>
      <QuizPlayer subjectSlug={params.subject} topicSlug={params.topic} questions={data.topic.questions} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${data.topic.title} MCQ Practice`,
            educationalLevel: "Undergraduate",
            audience: "B-Tech placement students",
            provider: {
              "@type": "Organization",
              name: "QuizSX7"
            }
          })
        }}
      />
    </main>
  );
}
