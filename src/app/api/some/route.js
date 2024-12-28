import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("Hello word");
}

//http://localhost:3000/api/some
