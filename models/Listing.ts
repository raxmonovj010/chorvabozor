import mongoose, { Schema, Document } from "mongoose";
export interface IListingDoc extends Document {
  title: string; description: string; price: number; priceNegotiable: boolean; category: string;
  animal: { breed?: string; age?: { value: number; unit: string }; gender?: string; weight?: number; count?: number; isVaccinated?: boolean; withDocuments?: boolean };
  location: { region: string; district?: string }; images: string[];
  seller: mongoose.Types.ObjectId; phone: string; showPhone: boolean; status: string; views: number;
}
const ListingSchema = new Schema<IListingDoc>({
  title: { type: String, required: true }, description: { type: String, required: true, minlength: 20 },
  price: { type: Number, required: true }, priceNegotiable: { type: Boolean, default: false },
  category: { type: String, enum: ["qoramol","qoy","echki","ot","tuya","parranda","boshqa"], required: true },
  animal: { breed: String, age: { value: Number, unit: { type: String, enum: ["kun","oy","yil"] } }, gender: { type: String, enum: ["erkak","urg'ocha","nomalum"] }, weight: Number, count: { type: Number, default: 1 }, isVaccinated: { type: Boolean, default: false }, withDocuments: { type: Boolean, default: false } },
  location: { region: { type: String, required: true }, district: String },
  images: [{ type: String }], seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true }, showPhone: { type: Boolean, default: false },
  status: { type: String, enum: ["active","sold","inactive"], default: "active" }, views: { type: Number, default: 0 },
}, { timestamps: true });
ListingSchema.index({ category: 1, status: 1 }); ListingSchema.index({ "location.region": 1 }); ListingSchema.index({ createdAt: -1 });
export default mongoose.models.Listing || mongoose.model<IListingDoc>("Listing", ListingSchema);
