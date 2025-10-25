"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CollectionImage {
  id: string;
  preview: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

export default function CollectionPage() {
  const params = useParams();
  const [collection, setCollection] = useState<CollectionImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const collectionId = params.id as string;
    const storedCollection = localStorage.getItem(`collection_${collectionId}`);
    
    if (storedCollection) {
      const parsedCollection = JSON.parse(storedCollection);
      setCollection(parsedCollection);
      
      // Calculate total value
      const total = parsedCollection.reduce((sum: number, img: CollectionImage) => sum + img.price, 0);
      setTotalValue(total);
    }
    
    setLoading(false);
  }, [params.id]);

  const handlePurchase = (imageId: string) => {
    // Mock purchase functionality
    alert(`Purchase functionality for image ${imageId} would be implemented here.`);
  };

  const handlePurchaseAll = () => {
    // Mock purchase all functionality
    alert(`Purchase all images for $${totalValue.toFixed(2)} would be implemented here.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (collection.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Collection Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The requested image collection could not be found or may have expired.
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Image Collection
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {collection.length} image{collection.length !== 1 ? 's' : ''} • Total Value: ${totalValue.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Home
              </Link>
              {totalValue > 0 && (
                <button
                  onClick={handlePurchaseAll}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Purchase All (${totalValue.toFixed(2)})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.map((image) => (
            <div
              key={image.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={image.preview}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                {image.price > 0 && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    ${image.price.toFixed(2)}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {image.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {image.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {image.price > 0 ? `$${image.price.toFixed(2)}` : 'Free'}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePurchase(image.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        image.price > 0
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {image.price > 0 ? 'Purchase' : 'Download'}
                    </button>
                    
                    <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collection Summary */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Collection Summary
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {collection.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total Images
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {collection.filter(img => img.price === 0).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Free Images
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ${totalValue.toFixed(2)}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total Value
              </div>
            </div>
          </div>
          
          {totalValue > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={handlePurchaseAll}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Purchase Entire Collection - ${totalValue.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            About This Collection
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This collection was created and shared using PixWeb. Each image includes detailed metadata 
            and pricing information set by the creator. You can purchase individual images or the entire collection.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Create your own collection
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
