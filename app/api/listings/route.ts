import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Listing from "@/models/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const sp = new URL(req.url).searchParams;
  const filter: any = { status: "active" };
  const c = sp.get("category"); if (c) filter.category = c;
  const r = sp.get("region"); if (r) filter["location.region"] = r;
  const min = sp.get("minPrice"), max = sp.get("maxPrice");
  if (min || max) { filter.price = {}; if (min) filter.price.$gte = Number(min); if (max) filter.price.$lte = Number(max); }
  const g = sp.get("gender"); if (g) filter["animal.gender"] = g;
  if (sp.get("vaccinated") === "true") filter["animal.isVaccinated"] = true;
  if (sp.get("withDocuments") === "true") filter["animal.withDocuments"] = true;
  const q = sp.get("q"); if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];

  const sort: any = { createdAt: -1 };
  const sf = sp.get("sort");
  if (sf === "price") sort.price = 1; else if (sf === "views") sort.views = -1;

  const page = Math.max(1, parseInt(sp.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(sp.get("limit") || "12")));
  const [listings, total] = await Promise.all([
    Listing.find(filter).populate("seller", "name avatar region").sort(sort).skip((page - 1) * limit).limit(limit).lean() as any,
    Listing.countDocuments(filter),
  ]);
  return NextResponse.json({ listings, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions as any);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await req.json();
  const listing = await Listing.create({ ...body, seller: session.user.id, phone: body.phone || session.user.phone });
  return NextResponse.json(listing, { status: 201 });
}
