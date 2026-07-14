import { NextRequest, NextResponse } from "next/server";
import { unfollowUser } from "@/services/connections/unfollowUser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await unfollowUser(body.targetUserId);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    );
  }
}
