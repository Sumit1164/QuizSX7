import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companies, subjects } from "@/lib/seed-data";

export function generateStaticParams() {
  return companies.map((company) => ({ company: company.slug }));
}

export function generateMetadata({ params }: { params: { company: string } }): Metadata {
  const company = companies.find((item) => item.slug === params.company);
  return {
    title: company ? `${company.name} Placement Preparation` : "Company Preparation",
    description: company?.summary
  };
}

export default function CompanyPage({ params }: { params: { company: string } }) {
  const company = companies.find((item) => item.slug === params.company);
  if (!company) notFound();

  return (
    <main className="container py-10">
      <div className="mb-8 max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-bold uppercase text-primary">
          <Building2 className="h-4 w-4" />
          Company path
        </p>
        <h1 className="mt-2 text-4xl font-black">{company.name} Placement Preparation</h1>
        <p className="mt-3 leading-7 text-muted-foreground">{company.summary}</p>
        <Button asChild className="mt-6">
          <Link href="/practice">
            Start practice <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.slug}>
            <CardHeader>
              <CardTitle>{subject.title}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: `${company.name} Placement Preparation`,
            description: company.summary,
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
