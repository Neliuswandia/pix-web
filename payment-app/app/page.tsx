"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Mock data for demonstration - in real app this would come from database
const imageData: { [key: string]: any } = {
  "1": {
    id: "1",
    src: "/api/placeholder/800/600", // This would be your actual image URL
    title: "Beautiful Landscape",
    photographer: "John Doe",
    price: 2500,
    description: "A stunning landscape photograph captured during golden hour"
  },
  "2": {
    id: "2", 
    src: "/api/placeholder/800/600",
    title: "Urban Architecture",
    photographer: "Jane Smith", 
    price: 3000,
    description: "Modern city architecture with dramatic lighting"
  }
};

export default function PaymentPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const searchParams = useSearchParams();
  
  // Get image ID from URL parameters
  const imageId = searchParams.get('id') || '1';
  const collectionId = searchParams.get('collection') || '';
  
  const image = imageData[imageId];

  useEffect(() => {
    // Auto-show payment modal after a short delay
    const timer = setTimeout(() => {
      setShowPaymentModal(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setPaymentSuccess(true);
    
    // Hide modal after success
    setTimeout(() => {
      setShowPaymentModal(false);
      // Here you would typically redirect to download page or show unblurred image
    }, 2000);
  };

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Image Not Found</h1>
          <p className="text-gray-600">The requested image could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PixWeb Gallery</h1>
          <p className="text-gray-600">Premium Photography Collection</p>
        </div>

        {/* Image Display */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            {/* Blurred Image */}
            <div className="aspect-video relative">
              <Image
                src="/next.svg" // Using placeholder since we don't have actual images
                alt={image.title}
                fill
                className={`object-cover transition-all duration-300 ${!paymentSuccess ? 'blur-image' : ''}`}
                priority
              />
              
              {/* Overlay for unpaid image */}
              {!paymentSuccess && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold mb-2">Premium Content</h2>
                    <p className="text-lg">Purchase to view full resolution</p>
                  </div>
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{image.title}</h2>
              <p className="text-gray-600 mb-4">by {image.photographer}</p>
              <p className="text-gray-700 mb-4">{image.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">
                  KES {image.price.toLocaleString()}
                </div>
                {!paymentSuccess && (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Purchase Now
                  </button>
                )}
                {paymentSuccess && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Payment Successful!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 payment-modal flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all">
              {!paymentSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">💳</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Purchase</h3>
                    <p className="text-gray-600">Secure payment for high-resolution image</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">{image.title}</span>
                      <span className="font-bold text-blue-600">KES {image.price.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">by {image.photographer}</div>
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
                        `Pay KES ${image.price.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">Your image is now available in full resolution</p>
                  <button
                    onClick={() => {
                      // Here you would trigger download or show unblurred image
                      setShowPaymentModal(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Download Image
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
