import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminEmail, verifyFirebaseToken } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const verified = await verifyFirebaseToken(token);
  if (!isAdminEmail(verified?.email)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ topics: [] });
  }

  const topics = await prisma.topic.findMany({
    include: { subject: true },
    orderBy: [{ subject: { title: "asc" } }, { title: "asc" }]
  });

  return NextResponse.json({ topics });
}
