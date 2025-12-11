import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';

const categories = ["All", "Electronics", "Fashion", "Home", "Vehicles", "Sports", "Collectibles"];

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
                    ${selectedCategory === cat 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
             <Link key={i} to={`/product/${i}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                <div className="aspect-square bg-gray-200 relative">
                   <img src={`https://picsum.photos/500/500?random=${i + 100}`} alt="Product" className="w-full h-full object-cover" />
                   {i % 3 === 0 && <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Promoted</span>}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate pr-2">Listing Item Title #{i + 1}</h3>
                    <p className="font-bold text-indigo-700">${(Math.random() * 500 + 50).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 truncate">Short description of the item goes here...</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>New York, NY</span>
                    </div>
                    <span>{i * 2}d ago</span>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
