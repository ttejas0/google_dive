import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function Sandbox() {
  return (
    <div className="flex-col-2 flex gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
              ownerId: "mock-owner",
            })),
          );
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 5000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
          console.log(folderInsert);
          console.log(fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
