import mongoose, { Schema, Document } from "mongoose";
export interface IFavoriteDoc extends Document { userId: mongoose.Types.ObjectId; listingId: mongoose.Types.ObjectId; }
const FavoriteSchema = new Schema<IFavoriteDoc>({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true } }, { timestamps: true });
FavoriteSchema.index({ userId: 1, listingId: 1 }, { unique: true });
export default mongoose.models.Favorite || mongoose.model<IFavoriteDoc>("Favorite", FavoriteSchema);
