import { PrismaClient } from "@prisma/client";
import { subjects } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const subject of subjects) {
    const dbSubject = await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {
        title: subject.title,
        description: subject.description
      },
      create: {
        slug: subject.slug,
        title: subject.title,
        description: subject.description
      }
    });

    for (const topic of subject.topics) {
      const dbTopic = await prisma.topic.upsert({
        where: {
          subjectId_slug: {
            subjectId: dbSubject.id,
            slug: topic.slug
          }
        },
        update: {
          title: topic.title,
          summary: topic.summary
        },
        create: {
          subjectId: dbSubject.id,
          slug: topic.slug,
          title: topic.title,
          summary: topic.summary
        }
      });

      for (const question of topic.questions) {
        await prisma.question.deleteMany({
          where: { id: question.id }
        });

        await prisma.question.create({
          data: {
            id: question.id,
            topicId: dbTopic.id,
            prompt: question.prompt,
            explanation: question.explanation,
            difficulty: question.difficulty,
            correctOptionId: question.correctOptionId,
            companyTags: question.companyTags,
            options: {
              create: question.options.map((option) => ({
                id: option.id,
                text: option.text
              }))
            }
          }
        });
      }
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
