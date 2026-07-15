import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "@/services/connections/searchUsers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("q") ?? "";
    const page = Number(searchParams.get("page") ?? "1");

    const result = await searchUsers(query, page);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to search users" },
      { status: 500 }
    );
  }
}
