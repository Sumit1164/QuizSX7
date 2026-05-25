import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyFirebaseToken } from "@/lib/firebase-admin";
import { calculateScore } from "@/lib/scoring";
import { submitAttemptSchema } from "@/lib/validators";
import { allTopics } from "@/lib/seed-data";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = submitAttemptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const verified = await verifyFirebaseToken(token);
  const firebaseUid = verified?.uid ?? parsed.data.firebaseUid;
  const email = verified?.email ?? parsed.data.email;

  if (!process.env.DATABASE_URL) {
    const topic = allTopics().find((item) => item.slug === parsed.data.topicSlug);
    const answers = parsed.data.answers.map((answer) => {
      const question = topic?.questions.find((item) => item.id === answer.questionId);
      return {
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId,
        correctOptionId: question?.correctOptionId ?? ""
      };
    });
    return NextResponse.json({ summary: calculateScore(answers), saved: false });
  }

  const topic = await prisma.topic.findFirst({
    where: { slug: parsed.data.topicSlug },
    include: {
      questions: {
        include: { options: true }
      }
    }
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found." }, { status: 404 });
  }

  const answers = parsed.data.answers.map((answer) => {
    const question = topic.questions.find((item) => item.id === answer.questionId);
    return {
      questionId: answer.questionId,
      selectedOptionId: answer.selectedOptionId,
      correctOptionId: question?.correctOptionId ?? ""
    };
  });
  const summary = calculateScore(answers);

  const user = await prisma.user.upsert({
    where: { firebaseUid },
    update: {
      email,
      displayName: parsed.data.displayName
    },
    create: {
      firebaseUid,
      email,
      displayName: parsed.data.displayName
    }
  });

  const attempt = await prisma.testAttempt.create({
    data: {
      userId: user.id,
      topicId: topic.id,
      attempted: summary.attempted,
      correct: summary.correct,
      wrong: summary.wrong,
      skipped: summary.skipped,
      score: summary.score,
      total: summary.total,
      answers: {
        create: answers.map((answer) => ({
          questionId: answer.questionId,
          selectedOptionId: answer.selectedOptionId,
          correct: answer.selectedOptionId === answer.correctOptionId
        }))
      }
    }
  });

  return NextResponse.json({ attemptId: attempt.id, summary, saved: true });
}
