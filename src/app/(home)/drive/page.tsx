import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES } from "~/server/db/queries";
import { createRootFolder } from "~/server/drivePageActions";

export default async function DrivePage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form action={createRootFolder}>
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
          <div className="flex justify-center rounded-lg bg-blue-600 px-20 py-5 text-lg text-white hover:bg-blue-700">
            <button type="submit">Create New Drive</button>
          </div>
          <footer className="mt-16 text-sm text-neutral-500">
            © {new Date().getFullYear()} Drivecln. All rights reserved.
          </footer>
        </div>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
