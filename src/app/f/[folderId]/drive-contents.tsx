"use client";

import { Upload, ChevronRight, PlusIcon } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { UploadButton } from "~/components/ui/uploadthings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateFolderModal from "~/components/createFolder";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folder: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/f/1" className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size (KB)</div>
              <div className="col-span-1">
                <PlusIcon
                  className="cursor-pointer transition-colors hover:text-gray-300"
                  size={20}
                  onClick={() => setIsCreateFolderOpen(true)}
                />
              </div>
            </div>
          </div>
          <ul>
            {props.folder.map((folder) => {
              return <FolderRow key={folder.id} folder={folder} />;
            })}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <UploadButton
            endpoint="driveUploader"
            input={{ folderId: props.currentFolderId }}
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        {/* CreateFolder Dialog */}
        <CreateFolderModal
          folderId={props.currentFolderId}
          isOpen={isCreateFolderOpen}
          onClose={() => setIsCreateFolderOpen(false)}
        />
      </div>
    </div>
  );
}
