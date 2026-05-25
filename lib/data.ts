import { prisma } from "@/lib/prisma";
import { subjects } from "@/lib/seed-data";

export async function getSubjects() {
  if (!process.env.DATABASE_URL) return subjects;

  try {
    const dbSubjects = await prisma.subject.findMany({
      include: {
        topics: {
          include: {
            questions: {
              where: { published: true },
              include: { options: true }
            }
          }
        }
      },
      orderBy: { title: "asc" }
    });

    return dbSubjects.map((subject) => ({
      ...subject,
      topics: subject.topics.map((topic) => ({
        ...topic,
        summary: topic.summary,
        questions: topic.questions.map((question) => ({
          ...question,
          companyTags: question.companyTags,
          options: question.options
        }))
      }))
    }));
  } catch {
    return subjects;
  }
}

export async function getTopic(subjectSlug: string, topicSlug: string) {
  const allSubjects = await getSubjects();
  const subject = allSubjects.find((item) => item.slug === subjectSlug);
  const topic = subject?.topics.find((item) => item.slug === topicSlug);
  return subject && topic ? { subject, topic } : null;
}
