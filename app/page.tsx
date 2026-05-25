import Link from "next/link";
import { ArrowRight, Building2, Code2, GraduationCap, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionSection } from "@/components/motion-section";
import { companies, subjects } from "@/lib/seed-data";

export default function HomePage() {
  return (
    <main>
      <section className="quiz-grid border-b">
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <Badge className="mb-5 border-primary/30 bg-primary/10 text-primary">Built for B-Tech placements</Badge>
            <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              QuizSX7
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Practice aptitude and programming MCQs for TCS, Google, Amazon, Microsoft, Infosys, Flipkart, and more
              with instant scoring, explanations, and profile progress.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/practice">
                  Start practice <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Create account</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-soft">
            <div className="grid gap-3">
              {subjects.slice(0, 5).map((subject, index) => (
                <Link
                  key={subject.slug}
                  href={`/practice/${subject.slug}`}
                  className="flex min-h-20 items-center justify-between rounded-md border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
                >
                  <div>
                    <p className="font-black">{subject.title}</p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted font-black">
                    {index + 1}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="container py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Practice by topic",
              text: "Move from subject to topic to focused MCQ tests with clean explanations."
            },
            {
              icon: LineChart,
              title: "Track every attempt",
              text: "See attempted, correct, wrong, skipped, and total score in your profile."
            },
            {
              icon: ShieldCheck,
              title: "Startup-ready stack",
              text: "Firebase auth, NeonDB data, Prisma schema, and Vercel-ready deployment."
            }
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <item.icon className="h-6 w-6 text-primary" />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="border-y bg-card py-14">
        <div className="container">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-black">Company preparation paths</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link key={company.slug} href={`/companies/${company.slug}`}>
                <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary">
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.summary}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="container grid gap-6 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge className="mb-3">SEO foundation</Badge>
          <h2 className="text-3xl font-black">Indexable preparation pages from day one</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Public pages for topics and companies help Google understand QuizSX7. Ranking still depends on content
            quality, authority, and time, but the technical foundation is ready.
          </p>
        </div>
        <Card>
          <CardContent className="grid gap-3 pt-5 sm:grid-cols-2">
            {["Aptitude clock questions", "TCS placement practice", "Python MCQ for B-Tech", "JavaScript interview basics"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-muted p-3 font-semibold">
                  <Sparkles className="h-4 w-4 text-secondary-foreground" />
                  {item}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </MotionSection>
    </main>
  );
}
