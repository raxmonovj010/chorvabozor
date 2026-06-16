import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function uploadImage(file: string) {
  const r = await cloudinary.uploader.upload(file, { folder: "chorvabozor" });
  return r.secure_url;
}
export default cloudinary;
