import React from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Truck, AlertCircle } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="bg-gray-100 p-4 md:p-8 flex items-center justify-center">
            <img 
              src={`https://picsum.photos/600/600?random=${Number(id) + 100}`} 
              alt="Product Detail" 
              className="max-w-full rounded-lg shadow-md" 
            />
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded">Electronics</span>
               <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded flex items-center gap-1">
                 <ShieldCheck size={12} /> AI Verified
               </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vintage Camera - Excellent Condition</h1>
            <p className="text-3xl font-bold text-indigo-600 mb-6">$125.00</p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Selling this vintage camera. Works perfectly, recently serviced. Lens is clean with no scratches.
              Comes with original leather case and strap. Perfect for collectors or students.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
               <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                     <div>
                        <p className="font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">Verified Seller • 98% Positive</p>
                     </div>
                  </div>
                  <button className="text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 flex items-center gap-2">
                    <MessageCircle size={16} /> Chat
                  </button>
               </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                <ShieldCheck size={20} /> Buy Securely with Escrow
              </button>
              <button className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                Make an Offer
              </button>
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
               <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
               <p>
                 <span className="font-semibold text-blue-800">Escrow Protection:</span> 
                 Your payment is held securely by SecureTrade until you receive the item and confirm it matches the description.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
