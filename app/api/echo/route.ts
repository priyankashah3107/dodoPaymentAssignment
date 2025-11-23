import { NextResponse } from "next/server";

let requestCount = 0;
const LIMIT = 5;
let resetTime = Date.now() + 60_000;

export async function POST(req: Request) {
  try {
    const now = Date.now();

    // Reset counter every minute
    if (now > resetTime) {
      requestCount = 0;
      resetTime = now + 60_000;
    }

    // Rate limit check
    if (requestCount >= LIMIT) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }

    // Increment counter before processing
    requestCount++;

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // Validate message field
    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'message' field" },
        { status: 400 }
      );
    }

    const message = body.message;

    // Simulate processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return echo response
    return NextResponse.json({ status: "ok", echo: message });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
