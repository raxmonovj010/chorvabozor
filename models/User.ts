import mongoose, { Schema, Document } from "mongoose";
export interface IUserDoc extends Document { name: string; phone?: string; email?: string; avatar?: string; region?: string; rating: number; totalSales: number; isVerified: boolean; }
const UserSchema = new Schema<IUserDoc>({ name: { type: String, required: true }, phone: { type: String, unique: true, sparse: true }, email: { type: String, unique: true, sparse: true }, avatar: String, region: String, rating: { type: Number, default: 0 }, totalSales: { type: Number, default: 0 }, isVerified: { type: Boolean, default: false } }, { timestamps: true });
export default mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);
