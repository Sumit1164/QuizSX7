import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyFirebaseToken } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const verified = await verifyFirebaseToken(token);

  if (!verified) {
    return NextResponse.json({ attempts: [] });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ attempts: [] });
  }

  const user = await prisma.user.findUnique({
    where: { firebaseUid: verified.uid },
    include: {
      attempts: {
        include: {
          topic: {
            include: {
              subject: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        take: 20
      }
    }
  });

  return NextResponse.json({ attempts: user?.attempts ?? [] });
}
