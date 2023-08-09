import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api"))
    return NextResponse.json({ revalidated: true, now: Date.now() });
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.MY_SECRET_TOKEN)
    return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
// revalidatePath will revalidate all segments under a dynamic route segment.
// For example, if you have a dynamic segment /product/[id] and you call
