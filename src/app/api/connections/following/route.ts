import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getFollowing } from "@/services/connections/getFollowing";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const following = await getFollowing(session.user.id);

  return NextResponse.json(following);
}
