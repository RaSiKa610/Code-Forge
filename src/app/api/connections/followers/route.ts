import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getFollowers } from "@/services/connections/getFollowers";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const followers = await getFollowers(session.user.id);

  return NextResponse.json(followers);
}
