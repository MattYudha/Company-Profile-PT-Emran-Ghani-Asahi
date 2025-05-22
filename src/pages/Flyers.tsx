import React from "react";
import { Link } from "react-router-dom";

const Flyers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold">PT Emran Ghani Asahi</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/business-cards" className="hover:text-gray-300">
                  Business Cards
                </Link>
              </li>
              <li>
                <Link to="/brochures" className="hover:text-gray-300">
                  Brochures
                </Link>
              </li>
              <li>
                <Link to="/flyers" className="hover:text-gray-300">
                  Flyers
                </Link>
              </li>
              <li>
                <Link to="/banners" className="hover:text-gray-300">
                  Banners
                </Link>
              </li>
              <li>
                <Link to="/posters" className="hover:text-gray-300">
                  Posters
                </Link>
              </li>
              <li>
                <Link to="/logo-design" className="hover:text-gray-300">
                  Logo Design
                </Link>
              </li>
              <li>
                <Link to="/brand-identity" className="hover:text-gray-300">
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link to="/packaging" className="hover:text-gray-300">
                  Packaging
                </Link>
              </li>
              <li>
                <Link
                  to="/illustration-services"
                  className="hover:text-gray-300"
                >
                  Illustration Services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flyers</h2>
          <p className="text-gray-600 mb-6">
            Our flyer design and printing services are the perfect way to spread
            the word about your business, event, or promotion. We offer
            high-quality materials and custom designs that ensure your flyers
            stand out and get noticed.
          </p>
          <p className="text-gray-600">
            Whether you're launching a new product or advertising an upcoming
            event, our team will help you create flyers that make an impact.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 PT Emran Ghani Asahi. All rights reserved.</p>
          <p>
            Jl. Raya Cikarang No. 123, Cikarang, Bekasi, Jawa Barat, Indonesia
          </p>
          <p>Email: info@emranghani.com | Phone: +62 21 1234 5678</p>
        </div>
      </footer>
    </div>
  );
};

export default Flyers;
