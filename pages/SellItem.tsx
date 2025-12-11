import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, AlertTriangle, Check, DollarSign } from 'lucide-react';
import { verifyItemImage, suggestPrice } from '../services/geminiService';

const SellItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  
  // AI States
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{isSafe: boolean, reason: string} | null>(null);
  const [isPricing, setIsPricing] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState<{min: number, max: number, explanation: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Strip prefix for API if needed, but GenAI SDK usually handles it or wants raw base64. 
        // We will send the base64 data part only for the SDK.
        const base64Data = base64String.split(',')[1];
        setImage(base64String); // For display
        runVerification(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const runVerification = async (base64Data: string) => {
    setIsVerifying(true);
    setVerificationResult(null);
    try {
      const result = await verifyItemImage(base64Data);
      setVerificationResult(result);
      if (result.category) setCategory(result.category);
    } catch (error) {
      console.error(error);
      setVerificationResult({ isSafe: false, reason: "Verification failed. Please try again." });
    } finally {
      setIsVerifying(false);
    }
  };

  const getPriceSuggestion = async () => {
    if (!title || !description) return;
    setIsPricing(true);
    try {
      const result = await suggestPrice(title, description);
      setSuggestedPrice(result);
    } finally {
      setIsPricing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">List an Item for Sale</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div 
              className={`border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center cursor-pointer transition relative
                ${image ? 'border-indigo-300 bg-gray-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}`}
              onClick={() => !image && fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="h-full w-full object-contain rounded-lg p-2" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); setVerificationResult(null); }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-50 text-red-500"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Verification Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    {isVerifying && (
                      <div className="bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg flex items-center gap-3">
                        <Loader2 className="animate-spin text-indigo-600" size={20} />
                        <span className="text-sm font-medium">AI Analyzing image safety...</span>
                      </div>
                    )}
                    {verificationResult && (
                      <div className={`p-3 rounded-lg shadow-lg flex items-start gap-3 border ${verificationResult.isSafe ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {verificationResult.isSafe ? <Check size={20} /> : <AlertTriangle size={20} />}
                        <div>
                          <p className="text-sm font-bold">{verificationResult.isSafe ? "Verified Safe" : "Potential Policy Violation"}</p>
                          <p className="text-xs mt-1">{verificationResult.reason}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  <p className="text-xs text-indigo-600 mt-4 font-medium">Automatic AI Screening Active</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="e.g. iPhone 13 Pro Max - 128GB"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={4} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Describe condition, age, faults..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border-gray-300 border p-2.5 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="0.00"
                />
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                
                <button 
                  type="button"
                  onClick={getPriceSuggestion}
                  disabled={!title || !description || isPricing}
                  className="absolute right-2 top-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 disabled:opacity-50"
                >
                  {isPricing ? 'Analyzing...' : 'Suggest Price'}
                </button>
              </div>
              {suggestedPrice && (
                 <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                    <p className="font-semibold text-indigo-700">Market Estimate: ${suggestedPrice.min} - ${suggestedPrice.max}</p>
                    <p>{suggestedPrice.explanation}</p>
                 </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home & Furniture</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </div>

            <div className="pt-4">
              <button 
                type="button" 
                disabled={!verificationResult?.isSafe}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                List Item Now
              </button>
              {!verificationResult?.isSafe && image && (
                <p className="text-center text-xs text-red-500 mt-2">
                  Item cannot be listed until verified safe.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellItem;
