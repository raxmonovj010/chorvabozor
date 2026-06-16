import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "base";

function getClient() {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase not configured");
  return createClient(supabaseUrl, supabaseKey);
}

export async function uploadImage(file: Buffer, fileName: string, mimeType: string): Promise<string> {
  const supabase = getClient();
  const path = `listings/${Date.now()}-${fileName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: mimeType, upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
