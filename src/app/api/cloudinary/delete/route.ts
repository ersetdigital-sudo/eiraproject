import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { public_id } = body;

  if (!public_id) {
    return NextResponse.json({ error: "public_id required" }, { status: 400 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const timestamp = Math.round(Date.now() / 1000);
  const crypto = await import("crypto");
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        public_id,
        timestamp: String(timestamp),
        api_key: apiKey,
        signature,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
