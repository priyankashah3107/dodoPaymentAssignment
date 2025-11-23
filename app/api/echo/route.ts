import { NextResponse } from "next/server";

let requestCount = 0;
const LIMIT = 5;
let resetTime = Date.now() + 60_000;

export async function POST(req: Request) {
  const now = Date.now();

  // Reset counter every minute
  if (now > resetTime) {
    requestCount = 0;
    resetTime = now + 60_000;
  }

  // Rate limit
  if (requestCount >= LIMIT) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  requestCount++;

  const body = await req.json();
  const message = body.message;

  // Simulate delay
  await new Promise((res) => setTimeout(res, 2000));

  return NextResponse.json({ status: "ok", echo: message });
}
