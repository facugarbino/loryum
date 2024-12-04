import { NextResponse } from "next/server";
import { Post } from "@/models/post";
import { mockPost } from "@/mocks";
import { INTERNAL_SERVER_ERROR } from "@/utils/api";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Post | { error: string }>> {
  const { id } = params;

  if (typeof id !== "string") {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    return NextResponse.json({ ...mockPost, id: id }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching post [${id}]:`, error);
    return INTERNAL_SERVER_ERROR;
  }
}
