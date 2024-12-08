import { createClient } from "@supabase/supabase-js";

const bucket = "werent";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;
const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  const uploadTime = Date.now();
  const newName = `${uploadTime}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (!data) throw new Error("Ielādējot attēlu radās kļūda");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
