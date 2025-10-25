import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to PixWeb
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for discovering, sharing, and managing beautiful images.
            Explore our gallery, upload your creations, and connect with fellow photographers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Gallery
            </Link>
            <Link
              href="/upload"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Upload Image
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <Image
                src="/globe.svg"
                alt="Gallery"
                width={48}
                height={48}
                className="mx-auto dark:invert"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Image Gallery
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through our curated collection of stunning images from photographers worldwide.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <Image
                src="/file.svg"
                alt="Upload"
                width={48}
                height={48}
                className="mx-auto dark:invert"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Easy Upload
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your photography with the world. Upload and organize your images effortlessly.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <Image
                src="/window.svg"
                alt="Profile"
                width={48}
                height={48}
                className="mx-auto dark:invert"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Personal Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create your photographer profile and showcase your best work to the community.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Quick Navigation
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              Contact
            </Link>
            <Link
              href="/profile"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              My Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
