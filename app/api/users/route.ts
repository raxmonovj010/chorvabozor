import { NextRequest, NextResponse } from "next/server"; import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; import Listing from "@/models/Listing";
import { getServerSession } from "next-auth"; import { authOptions } from "@/lib/auth";
export async function GET() {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const user = await User.findById(session.user.id).lean();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [total, active] = await Promise.all([Listing.countDocuments({ seller: session.user.id }), Listing.countDocuments({ seller: session.user.id, status: "active" })]);
  return NextResponse.json({ ...user, listingsCount: total, activeCount: active });
}
export async function PUT(req: NextRequest) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB(); const body = await req.json();
  return NextResponse.json(await User.findByIdAndUpdate(session.user.id, body, { new: true }).lean());
}
