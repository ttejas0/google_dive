"use client";
import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-20">
        <div className="flex justify-center rounded-lg bg-blue-600 px-20 py-5 text-lg text-white hover:bg-blue-700">
          <SignInButton forceRedirectUrl={"/drive"} />
        </div>
        <footer className="mt-16 text-sm text-neutral-500">
          © {new Date().getFullYear()} Drivecln. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
