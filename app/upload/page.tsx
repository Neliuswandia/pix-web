"use client";

import { useState } from "react";
import Image from "next/image";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [price, setPrice] = useState<string>("");
  const [generatedLink, setGeneratedLink] = useState<string>("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(),
            file: file,
            preview: e.target?.result as string,
          };
          setUploadedImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDeleteImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const generateLink = () => {
    if (uploadedImages.length === 0) {
      alert("Please add at least one image before generating a link.");
      return;
    }
    
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price in KES.");
      return;
    }
    
    // Generate a unique collection ID
    const collectionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Generate link to payment app
    const paymentAppUrl = "http://localhost:3001";
    let link = "";
    
    if (uploadedImages.length === 1) {
      // Single image link
      link = `${paymentAppUrl}/?id=${uploadedImages[0].id}&collection=${collectionId}&price=${price}`;
    } else {
      // Collection link
      link = `${paymentAppUrl}/collection/${collectionId}`;
    }
    
    setGeneratedLink(link);
    
    // Save to localStorage for demo purposes
    const collectionData = {
      images: uploadedImages,
      price: price,
      currency: "KES",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`collection_${collectionId}`, JSON.stringify(collectionData));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Add Media Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Add Media
            </h2>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <Image
                  src="/file.svg"
                  alt="Upload"
                  width={48}
                  height={48}
                  className="mx-auto dark:invert opacity-50"
                />
                <div>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Drag and drop images here, or{" "}
                    <label className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
                      click to browse
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileInput}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Supports: JPG, PNG, GIF (max 10MB each)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Added Images ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={image.preview}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Input and Generate Link */}
          {uploadedImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price in KES
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter price in KES"
                  />
                </div>

                {!generatedLink ? (
                  <button
                    onClick={generateLink}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Generate Link
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                      >
                        Copy Link
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Share this link with others to showcase your image collection.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
