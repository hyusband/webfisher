import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ message: "Code is required" }, { status: 400 });
    }

    const creator = await prisma.creatorPartner.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!creator) {
      return NextResponse.json({ message: "Invalid code" }, { status: 404 });
    }

    // Check if already redeemed
    const existingRedemption = await prisma.codeRedemption.findUnique({
      where: {
        userId_creatorId: {
          userId,
          creatorId: creator.id,
        },
      },
    });

    if (existingRedemption) {
      return NextResponse.json({ message: "Code already redeemed" }, { status: 400 });
    }

    await prisma.codeRedemption.create({
      data: {
        userId,
        creatorId: creator.id,
      },
    });

    return NextResponse.json({ message: "Code redeemed successfully" });
  } catch (error) {
    console.error("Redeem code error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
