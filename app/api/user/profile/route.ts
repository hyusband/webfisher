import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Since we merged profile into user model in schema.prisma, we can just return user properties
    // You could also map them back to the old structure if needed.
    const profile = {
      id: user.id,
      username: user.username,
      avatar_url: "cat", // Default or fetch from db if added to schema
      favorite_fish: "",
      is_admin: false,
    };

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        user_metadata: { username: user.username }
      },
      profile
    });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
