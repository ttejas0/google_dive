"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { folders_table } from "~/server/db/schema";
import { cookies } from "next/headers";

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("User not found");
  }
  const [folder] = await db
    .select()
    .from(folders_table)
    .where(
      and(
        eq(folders_table.id, folderId),
        eq(folders_table.ownerId, session.userId),
      ),
    );

  if (!folder) {
    return { error: "Folder not found" };
  }
  await db.delete(folders_table).where(eq(folders_table.id, folderId));
  const c = await cookies();

  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
