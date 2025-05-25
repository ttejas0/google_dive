"use client";
import { Button } from "~/components/ui/button";
import { signInRedirect } from "~/server/homepageActions";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center text-center">
          <div className="mb-8">
            <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-7xl">
              Your files,
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                everywhere
              </span>
            </h1>
            <p className="mb-12 text-xl leading-relaxed text-gray-300 md:text-2xl">
              Store, sync, and share your files with the simplicity you love.
              Drivecln makes cloud storage effortless and secure.
            </p>
          </div>

          <div className="flex justify-center">
            <form action={signInRedirect}>
              <Button
                size="lg"
                type="submit"
                className="bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700"
              >
                Get Started
              </Button>
            </form>
          </div>
          <footer className="mt-16 text-sm text-neutral-500">
            © {new Date().getFullYear()} Drivecln. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
}
