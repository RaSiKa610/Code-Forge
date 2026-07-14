import { NextResponse } from "next/server";
import { getProfile } from "@/services/profile/getProfile";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      username: string;
    }>;
  }
) {
  const { username } =
    await context.params;

  const profile =
    await getProfile(username);

  if (!profile) {
    return NextResponse.json(
      {
        error:
          "User not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    profile
  );
}
