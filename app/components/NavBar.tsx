import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="flex items-center text-text hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/create"
              className="flex items-center text-text hover:text-primary transition-colors duration-200"
            >
              Create
            </Link>
            <Link
              href="/about"
              className="flex items-center text-text hover:text-primary transition-colors duration-200"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
