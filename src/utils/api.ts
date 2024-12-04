import { NextResponse } from "next/server";

export const INTERNAL_SERVER_ERROR = NextResponse.json(
  { error: "Something went wrong" },
  { status: 500 }
);
