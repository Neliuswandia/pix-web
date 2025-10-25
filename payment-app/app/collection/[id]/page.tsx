"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock data for collections - in real app this would come from database
const collectionData: { [key: string]: any } = {
  "abc123": {
    id: "abc123",
    images: [
      {
        id: "1",
        src: "/next.svg",
        title: "Mountain Sunset",
        photographer: "John Doe",
        price: 2500,
        description: "Breathtaking sunset over mountain peaks"
      },
      {
        id: "2", 
        src: "/vercel.svg",
        title: "City Lights",
        photographer: "John Doe",
        price: 3000,
        description: "Urban nightscape with vibrant city lights"
      }
    ],
    totalPrice: 5500,
    photographer: "John Doe",
    title: "Nature & Urban Collection"
  }
};

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const collection = collectionData[params.id];

  if (!collection) {
    notFound();
  }

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const getSelectedTotal = () => {
    return collection.images
      .filter((img: any) => selectedImages.includes(img.id))
      .reduce((total: number, img: any) => total + img.price, 0);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setPaymentSuccess(true);
    
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{collection.title}</h1>
          <p className="text-gray-600">by {collection.photographer}</p>
          <p className="text-sm text-gray-500 mt-2">Select images to purchase</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {collection.images.map((image: any) => (
            <div
              key={image.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                selectedImages.includes(image.id) ? 'ring-4 ring-blue-500' : ''
              }`}
              onClick={() => toggleImageSelection(image.id)}
            >
              <div className="aspect-square relative">
                {/* Blurred Image */}
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    !paymentSuccess || !selectedImages.includes(image.id) ? 'blur-image' : ''
                  }`}
                />
                
                {/* Selection Overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity ${
                  !paymentSuccess || !selectedImages.includes(image.id) ? 'bg-opacity-30' : 'bg-opacity-0'
                } flex items-center justify-center`}>
                  {(!paymentSuccess || !selectedImages.includes(image.id)) && (
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-sm">Click to select</p>
                    </div>
                  )}
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                    selectedImages.includes(image.id) ? 'bg-blue-500' : 'bg-black bg-opacity-30'
                  }`}>
                    {selectedImages.includes(image.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                <div className="text-lg font-bold text-blue-600">
                  KES {image.price.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Summary */}
        {selectedImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 sticky bottom-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  Total: KES {getSelectedTotal().toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Purchase Selected
              </button>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 payment-modal flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all">
              {!paymentSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">💳</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Purchase</h3>
                    <p className="text-gray-600">Secure payment for selected images</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="space-y-2 mb-3">
                      {collection.images
                        .filter((img: any) => selectedImages.includes(img.id))
                        .map((img: any) => (
                          <div key={img.id} className="flex justify-between text-sm">
                            <span>{img.title}</span>
                            <span>KES {img.price.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">KES {getSelectedTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>M-Pesa</option>
                        <option>Airtel Money</option>
                        <option>Credit Card</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number / Card Details
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 0712345678"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Pay KES ${getSelectedTotal().toLocaleString()}`
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">Your images are now available in full resolution</p>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Download Images
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
