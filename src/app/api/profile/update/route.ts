import { NextRequest, NextResponse } from "next/server";
import { updateProfile } from "@/services/profile/updateProfile";

export async function PATCH(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const updatedUser =
      await updateProfile(body);

    return NextResponse.json(
      updatedUser
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}
