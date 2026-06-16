import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const listing: any = await Listing.findByIdAndUpdate(params.id, { $inc: { views: 1 } }, { new: true }).populate("seller", "name avatar phone region rating").lean();
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const similar: any = await Listing.find({ _id: { $ne: params.id }, status: "active", $or: [{ category: listing.category }, { "location.region": listing.location.region }] }).populate("seller", "name avatar").limit(6).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ listing, similar });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const listing = await Listing.findById(params.id);
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (listing.seller.toString() !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  return NextResponse.json(await Listing.findByIdAndUpdate(params.id, body, { new: true }));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const listing = await Listing.findById(params.id);
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (listing.seller.toString() !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await Listing.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
