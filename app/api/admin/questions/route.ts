import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminEmail, verifyFirebaseToken } from "@/lib/firebase-admin";
import { questionSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const verified = await verifyFirebaseToken(token);
  if (!isAdminEmail(verified?.email)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL is required for admin writes." }, { status: 503 });
  }

  const parsed = questionSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const correctOption = parsed.data.options[parsed.data.correctOptionIndex];
  if (!correctOption) {
    return NextResponse.json({ error: "Correct option index is invalid." }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: {
      topicId: parsed.data.topicId,
      prompt: parsed.data.prompt,
      explanation: parsed.data.explanation,
      difficulty: parsed.data.difficulty,
      companyTags: parsed.data.companyTags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [],
      published: parsed.data.published,
      correctOptionId: "",
      options: {
        create: parsed.data.options.map((option) => ({ text: option.text }))
      }
    },
    include: { options: true }
  });

  const selectedCorrect = question.options[parsed.data.correctOptionIndex];
  const updated = await prisma.question.update({
    where: { id: question.id },
    data: { correctOptionId: selectedCorrect.id },
    include: { options: true }
  });

  return NextResponse.json({ question: updated });
}
