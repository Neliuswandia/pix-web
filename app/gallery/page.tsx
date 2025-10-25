import Image from "next/image";
import Link from "next/link";

// Mock data for gallery images
const galleryImages = [
  {
    id: 1,
    src: "/next.svg",
    alt: "Sample Image 1",
    title: "Beautiful Landscape",
    photographer: "John Doe",
    category: "Nature"
  },
  {
    id: 2,
    src: "/vercel.svg",
    alt: "Sample Image 2",
    title: "Urban Architecture",
    photographer: "Jane Smith",
    category: "Architecture"
  },
  {
    id: 3,
    src: "/globe.svg",
    alt: "Sample Image 3",
    title: "Portrait Study",
    photographer: "Mike Johnson",
    category: "Portrait"
  },
  {
    id: 4,
    src: "/file.svg",
    alt: "Sample Image 4",
    title: "Abstract Art",
    photographer: "Sarah Wilson",
    category: "Abstract"
  },
  {
    id: 5,
    src: "/window.svg",
    alt: "Sample Image 5",
    title: "Street Photography",
    photographer: "Alex Brown",
    category: "Street"
  },
  {
    id: 6,
    src: "/next.svg",
    alt: "Sample Image 6",
    title: "Macro Photography",
    photographer: "Emily Davis",
    category: "Macro"
  }
];

const categories = ["All", "Nature", "Architecture", "Portrait", "Abstract", "Street", "Macro"];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Image Gallery
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Discover amazing photographs from our community
              </p>
            </div>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Link
              key={image.id}
              href={`/gallery/${image.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover dark:invert"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {image.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  by {image.photographer}
                </p>
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Images
          </button>
        </div>
      </div>
    </div>
  );
}
