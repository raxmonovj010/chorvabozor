import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const fd = await req.formData();
    const file = fd.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(`data:${file.type};base64,${buf.toString("base64")}`);
    return NextResponse.json({ url });
  } catch { return NextResponse.json({ error: "Upload failed" }, { status: 500 }); }
}
