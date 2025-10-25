import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data for individual images
const imageData: { [key: string]: any } = {
  "1": {
    id: 1,
    src: "/next.svg",
    alt: "Beautiful Landscape",
    title: "Mountain Sunset",
    description: "A breathtaking sunset view from the mountain peak, capturing the golden hour with stunning natural beauty. This image was taken during a hiking expedition in the Rocky Mountains.",
    photographer: {
      name: "John Doe",
      avatar: "/vercel.svg",
      bio: "Professional landscape photographer with 10+ years of experience"
    },
    category: "Nature",
    uploadDate: "2024-03-15",
    views: 245,
    likes: 18,
    comments: 5,
    tags: ["sunset", "mountain", "landscape", "nature", "golden hour"],
    camera: "Canon EOS R5",
    lens: "24-70mm f/2.8",
    settings: {
      aperture: "f/8.0",
      shutter: "1/125s",
      iso: "ISO 200",
      focal: "35mm"
    }
  },
  "2": {
    id: 2,
    src: "/vercel.svg",
    alt: "Urban Architecture",
    title: "City Streets",
    description: "Modern urban architecture showcasing the intersection of contemporary design and city life. Captured during the blue hour for optimal lighting.",
    photographer: {
      name: "Jane Smith",
      avatar: "/globe.svg",
      bio: "Urban photographer specializing in architectural photography"
    },
    category: "Architecture",
    uploadDate: "2024-03-10",
    views: 189,
    likes: 12,
    comments: 3,
    tags: ["urban", "architecture", "city", "modern", "blue hour"],
    camera: "Sony A7 IV",
    lens: "16-35mm f/2.8",
    settings: {
      aperture: "f/11",
      shutter: "1/60s",
      iso: "ISO 400",
      focal: "24mm"
    }
  }
};

interface ImagePageProps {
  params: {
    id: string;
  };
}

export default function ImagePage({ params }: ImagePageProps) {
  const image = imageData[params.id];

  if (!image) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/gallery"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover dark:invert"
                  priority
                />
              </div>
              
              {/* Image Actions */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{image.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{image.comments}</span>
                    </button>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {image.views} views
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {image.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {image.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div>Category: <span className="text-blue-600">{image.category}</span></div>
                <div>Uploaded: {image.uploadDate}</div>
              </div>
            </div>

            {/* Photographer Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Photographer
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={image.photographer.avatar}
                  alt={image.photographer.name}
                  width={48}
                  height={48}
                  className="rounded-full dark:invert"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {image.photographer.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {image.photographer.bio}
                  </p>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                Follow Photographer
              </button>
            </div>

            {/* Camera Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Camera & Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Camera:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{image.camera}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Lens:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{image.lens}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Aperture:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{image.settings.aperture}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Shutter:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{image.settings.shutter}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">ISO:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{image.settings.iso}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Focal:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{image.settings.focal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
