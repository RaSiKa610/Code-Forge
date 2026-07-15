import { NextRequest, NextResponse } from "next/server";
import { followUser } from "@/services/connections/followUser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await followUser(body.targetUserId);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}
