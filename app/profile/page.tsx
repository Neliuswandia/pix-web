"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Photographer",
    email: "john@example.com",
    bio: "Passionate photographer specializing in landscape and street photography. Love capturing the beauty of everyday moments.",
    location: "New York, USA",
    website: "www.johnphotographer.com",
    joinDate: "January 2024"
  });

  // Mock user's uploaded images
  const userImages = [
    {
      id: 1,
      src: "/next.svg",
      title: "Mountain Sunset",
      category: "Nature",
      uploadDate: "2024-03-15",
      views: 245,
      likes: 18
    },
    {
      id: 2,
      src: "/vercel.svg",
      title: "City Streets",
      category: "Street",
      uploadDate: "2024-03-10",
      views: 189,
      likes: 12
    },
    {
      id: 3,
      src: "/globe.svg",
      title: "Portrait Study",
      category: "Portrait",
      uploadDate: "2024-03-05",
      views: 156,
      likes: 9
    },
    {
      id: 4,
      src: "/file.svg",
      title: "Abstract Colors",
      category: "Abstract",
      uploadDate: "2024-02-28",
      views: 203,
      likes: 15
    }
  ];

  const stats = {
    totalImages: userImages.length,
    totalViews: userImages.reduce((sum, img) => sum + img.views, 0),
    totalLikes: userImages.reduce((sum, img) => sum + img.likes, 0),
    followers: 42,
    following: 28
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your profile and view your photography portfolio
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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src="/next.svg"
                      alt="Profile Picture"
                      fill
                      className="rounded-full object-cover dark:invert"
                    />
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Change Photo
                  </button>
                </div>

                {/* Profile Details */}
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {profileData.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {profileData.bio}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="font-medium mr-2">Location:</span>
                          {profileData.location}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="font-medium mr-2">Website:</span>
                          <a href={`https://${profileData.website}`} className="text-blue-600 hover:underline">
                            {profileData.website}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="font-medium mr-2">Joined:</span>
                          {profileData.joinDate}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                      >
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.totalImages}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Images</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.totalLikes}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.followers}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Followers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Portfolio
                  </h3>
                  <Link
                    href="/upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Upload New Image
                  </Link>
                </div>

                {userImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userImages.map((image) => (
                      <div
                        key={image.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover dark:invert"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {image.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {image.category} • {image.uploadDate}
                          </p>
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{image.views} views</span>
                            <span>{image.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Image
                      src="/file.svg"
                      alt="No images"
                      width={64}
                      height={64}
                      className="mx-auto mb-4 opacity-50 dark:invert"
                    />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No images uploaded yet
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Start building your portfolio by uploading your first image
                    </p>
                    <Link
                      href="/upload"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Upload Image
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
