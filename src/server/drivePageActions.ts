"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS } from "./db/queries";

export async function createRootFolder() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("User not found");
  }
  const rootFolderId = await MUTATIONS.onboardUser(session.userId);

  return redirect(`/f/${rootFolderId}`);
}

export async function createFolder(folderId: number, folderName: string) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("User not found");
  }
  const newFolderId = await MUTATIONS.createFolder({
    folder: {
      name: folderName,
      parent: folderId,
    },
    userId: session.userId,
  });
  console.log(newFolderId);
}
