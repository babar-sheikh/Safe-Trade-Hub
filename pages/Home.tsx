import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, Truck, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Safest Way to Buy & Sell Online
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              AI-verified listings, escrow-secured payments, and trusted community verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/marketplace" className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition text-center">
                Browse Marketplace
              </Link>
              <Link to="/sell" className="bg-indigo-500 border border-indigo-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition text-center">
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Escrow Protection</h3>
            <p className="text-gray-600">Funds are held securely until you receive and verify your item. Zero fraud risk.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Verification</h3>
            <p className="text-gray-600">Our Gemini-powered AI scans every listing for illegal items and verifies authenticity.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Tracked Logistics</h3>
            <p className="text-gray-600">Integrated shipping with real-time tracking updates directly in your dashboard.</p>
          </div>
        </div>
      </div>

      {/* Trending Section (Mock) */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="text-indigo-600" /> Trending Now
            </h2>
            <Link to="/marketplace" className="text-indigo-600 hover:text-indigo-800 font-medium">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square mb-3 relative">
                  <img src={`https://picsum.photos/400/400?random=${i}`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-green-700">Verified</span>
                </div>
                <h3 className="font-semibold text-gray-900">Premium Wireless Headphones</h3>
                <p className="text-sm text-gray-500 mb-2">Electronics</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">$149.00</span>
                  <span className="text-xs text-gray-400">2d ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
