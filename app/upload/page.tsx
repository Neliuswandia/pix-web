"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [generatedLink, setGeneratedLink] = useState<string>("");

  const categories = ["Nature", "Architecture", "Portrait", "Abstract", "Street", "Macro"];

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!title || !description || !category) {
      alert("Please fill in title, description, and category before adding images.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage: UploadedImage = {
        id: Date.now().toString(),
        file: file,
        preview: e.target?.result as string,
        title: title,
        description: description,
        category: category,
        price: 0
      };
      setUploadedImages(prev => [...prev, newImage]);
      // Reset form fields
      setTitle("");
      setDescription("");
      setCategory("");
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handlePriceChange = (imageId: string, newPrice: number) => {
    setUploadedImages(prev => 
      prev.map(img => 
        img.id === imageId ? { ...img, price: newPrice } : img
      )
    );
  };

  const generateLink = () => {
    if (uploadedImages.length === 0) {
      alert("Please add at least one image before generating a link.");
      return;
    }
    
    // Generate a mock link for the collection
    const collectionId = Date.now().toString();
    const link = `${window.location.origin}/collection/${collectionId}`;
    setGeneratedLink(link);
    
    // Save to localStorage for demo purposes
    localStorage.setItem(`collection_${collectionId}`, JSON.stringify(uploadedImages));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied to clipboard!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Please fill in all required fields.");
      return;
    }
    // This will now be handled by the handleFile function
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Upload Image
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Share your amazing photographs with the community
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
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter a title for your image"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Describe your image..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add Images
              </label>
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
                      Drag and drop your image here, or{" "}
                      <label className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
                        click to browse
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileInput}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Supports: JPG, PNG, GIF (max 10MB) • Fill in title, description, and category first
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Uploaded Images Grid */}
          {uploadedImages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Added Images ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={image.preview}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Delete Image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {image.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {image.category}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {image.description}
                      </p>
                      
                      {/* Price Input */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={image.price}
                          onChange={(e) => handlePriceChange(image.id, parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Link Section */}
          {uploadedImages.length > 0 && (
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Generate Collection Link
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create a shareable link for your image collection with pricing information.
              </p>
              
              {!generatedLink ? (
                <button
                  onClick={generateLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Share this link with others to showcase your image collection with pricing.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link
              href="/gallery"
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold transition-colors text-center"
            >
              View Gallery
            </Link>
            <Link
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
