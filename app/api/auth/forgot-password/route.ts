import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // We don't want to reveal if the email exists, always return success
    if (user) {
      // In a real application, you would generate a reset token,
      // save it to the database with an expiration time,
      // and send an email with a link containing the token.
      console.log(`Mock: Sending password reset email to ${email}`);
    }

    return NextResponse.json({ message: "Password reset email sent if account exists" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
