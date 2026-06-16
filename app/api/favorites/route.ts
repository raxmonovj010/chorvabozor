import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; import Favorite from "@/models/Favorite";
import { getServerSession } from "next-auth"; import { authOptions } from "@/lib/auth";
export async function GET() {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const f = await Favorite.find({ userId: session.user.id }).populate({ path: "listingId", populate: { path: "seller", select: "name avatar" } }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(f);
}
export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { listingId } = await req.json();
  const existing = await Favorite.findOne({ userId: session.user.id, listingId });
  if (existing) { await Favorite.findByIdAndDelete(existing._id); return NextResponse.json({ favorited: false }); }
  await Favorite.create({ userId: session.user.id, listingId });
  return NextResponse.json({ favorited: true });
}
