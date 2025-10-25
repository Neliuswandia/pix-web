import Image from "next/image";
import Link from "next/link";

export default function About() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      description: "Passionate photographer with 10+ years of experience in digital photography.",
      image: "/next.svg"
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      description: "Full-stack developer specializing in modern web technologies and user experience.",
      image: "/vercel.svg"
    },
    {
      name: "Mike Johnson",
      role: "Community Manager",
      description: "Connecting photographers worldwide and building an amazing creative community.",
      image: "/globe.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                About PixWeb
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Learn more about our mission and the team behind PixWeb
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

      <div className="container mx-auto px-6 py-12">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              PixWeb is dedicated to creating a vibrant community where photographers of all levels 
              can share their work, discover inspiration, and connect with fellow artists. We believe 
              that photography is more than just capturing moments – it's about telling stories, 
              expressing creativity, and bringing people together through visual art.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What We Offer
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  A curated gallery of stunning photography from around the world
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Easy-to-use upload tools for sharing your creative work
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Personal profiles to showcase your photography portfolio
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  A supportive community of photographers and art enthusiasts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Regular features highlighting exceptional work from our community
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Values
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Creativity</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We celebrate unique perspectives and encourage artistic expression
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Community</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Building connections between photographers worldwide
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Quality</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Maintaining high standards for both content and user experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate individuals behind PixWeb
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover dark:invert"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Community Today
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start sharing your photography and discover amazing work from artists around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/upload"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Upload Your First Image
              </Link>
              <Link
                href="/gallery"
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
