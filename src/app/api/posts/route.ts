import { NextResponse } from "next/server";
import { Post } from "@/models/post";
import { ApiPage } from "@/models/api-page";
import { mockPost } from "@/mocks";
import { INTERNAL_SERVER_ERROR } from "@/utils/api";

const mockPosts = [mockPost];

export async function GET(
  request: Request
): Promise<NextResponse<ApiPage<Post> | { error: string }>> {
  try {
    return NextResponse.json(
      {
        data: mockPosts,
        page: 1,
        count: 10,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return INTERNAL_SERVER_ERROR;
  }
}
