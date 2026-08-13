"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidCategory, savePost } from "@/lib/posts";

export type WriteState = { error: string } | null;

export async function createPost(
  _prev: WriteState,
  formData: FormData,
): Promise<WriteState> {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title) return { error: "Title is required." };
  if (!isValidCategory(category)) return { error: "Pick Tech or Regulations." };
  if (!content) return { error: "Write a bit of body text first." };

  const slug = savePost({ title, category, excerpt, content });
  revalidatePath("/");
  revalidatePath(`/posts/${slug}`);
  redirect(`/posts/${slug}`);
}
