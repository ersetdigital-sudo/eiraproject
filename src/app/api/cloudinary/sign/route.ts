import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { folder, public_id } = body;

  const timestamp = Math.round(Date.now() / 1000);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const crypto = await import("crypto");
  const folderStr = folder || "eira-project";
  const publicIdStr = public_id || `${folderStr}/${Date.now()}`;

  // Build signature for signed upload
  const paramsToSign = `folder=${folderStr}&public_id=${publicIdStr}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

  return NextResponse.json({
    timestamp,
    signature,
    api_key: apiKey,
    cloud_name: cloudName,
    folder: folderStr,
    public_id: publicIdStr,
  });
}
