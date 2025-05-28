import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import { createFolder } from "~/server/drivePageActions";
import { useRouter } from "next/navigation";

interface CreateFolderProps {
  isOpen: boolean;
  onClose: () => void;
  folderId: number;
}

export default function CreateFolderModal({
  isOpen,
  onClose,
  folderId,
}: CreateFolderProps) {
  const [folderName, setFolderName] = useState("");
  const navigate = useRouter();

  const handleCreate = async () => {
    if (!folderName.trim()) return;
    console.log("Creating folder:", folderName);
    setFolderName("");
    onClose();
    // Add your folder creation logic here
    await createFolder(folderId, folderName);
    navigate.refresh();
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await handleCreate();
    }
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    setFolderName("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-15 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative mx-4 w-full max-w-md transform rounded-lg border border-gray-700 bg-gray-800 shadow-2xl transition-all duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-200"
        >
          <XIcon size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Create New Folder
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <input
            type="text"
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={handleClose}
            className="rounded-md bg-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!folderName.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
