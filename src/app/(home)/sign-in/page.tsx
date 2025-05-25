"use client";
import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="flex justify-center rounded-lg bg-blue-600 px-20 py-5 text-lg text-white hover:bg-blue-700">
        <SignInButton forceRedirectUrl={"/drive"} />
      </div>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} Drivecln. All rights reserved.
      </footer>
    </div>
  );
}
