import { uploadImage } from "@/lib/api";

/** Picks an image file and uploads it via the API filesystem endpoint. */
export async function pickAndUploadImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }
      try {
        const url = await uploadImage(file);
        resolve(url);
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Upload failed"));
      }
    };
    input.click();
  });
}
