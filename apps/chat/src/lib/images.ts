export interface ImageAttachment {
  id: string;
  mime_type: string;
  data: string;
  previewUrl: string;
}

const MAX_IMAGES = 6;
const MAX_DIMENSION = 1536;
const JPEG_QUALITY = 0.85;

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function resizeImage(
  file: File,
): Promise<{ mime_type: string; data: string }> {
  const dataUrl = await readFile(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Failed to load image"));
    el.src = dataUrl;
  });

  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(img, 0, 0, width, height);

  const mime_type = file.type === "image/png" ? "image/png" : "image/jpeg";
  const output = canvas.toDataURL(
    mime_type,
    mime_type === "image/jpeg" ? JPEG_QUALITY : undefined,
  );
  const [, base64] = output.split(",");
  return { mime_type, data: base64 };
}

export async function fileToAttachment(file: File): Promise<ImageAttachment> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are supported");
  }
  const { mime_type, data } = await resizeImage(file);
  return {
    id: crypto.randomUUID(),
    mime_type,
    data,
    previewUrl: `data:${mime_type};base64,${data}`,
  };
}

export async function filesToAttachments(
  files: FileList | File[],
  existing: ImageAttachment[],
): Promise<ImageAttachment[]> {
  const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
  const remaining = MAX_IMAGES - existing.length;
  if (remaining <= 0) {
    throw new Error(`At most ${MAX_IMAGES} images allowed`);
  }
  const toAdd = list.slice(0, remaining);
  const attachments = await Promise.all(toAdd.map(fileToAttachment));
  return [...existing, ...attachments];
}

export function attachmentsForApi(images: ImageAttachment[]) {
  return images.map(({ mime_type, data }) => ({ mime_type, data }));
}
