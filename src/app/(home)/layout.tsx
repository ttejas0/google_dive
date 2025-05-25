export default function HomePage(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="container mx-auto px-4 py-20">{props.children}</main>
    </div>
  );
}
