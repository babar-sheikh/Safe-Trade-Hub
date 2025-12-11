import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Wallet, Package, AlertCircle, TrendingUp, DollarSign, History } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, views: 2400 },
  { name: 'Tue', sales: 3000, views: 1398 },
  { name: 'Wed', sales: 2000, views: 9800 },
  { name: 'Thu', sales: 2780, views: 3908 },
  { name: 'Fri', sales: 1890, views: 4800 },
  { name: 'Sat', sales: 2390, views: 3800 },
  { name: 'Sun', sales: 3490, views: 4300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Seller Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
            <h2 className="text-2xl font-bold text-gray-900">1,250 <span className="text-sm font-normal text-gray-400">Tokens</span></h2>
          </div>
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Wallet size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-500 mb-1">Active Listings</p>
            <h2 className="text-2xl font-bold text-gray-900">12</h2>
          </div>
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Package size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-500 mb-1">Pending Escrow</p>
            <h2 className="text-2xl font-bold text-gray-900">$450.00</h2>
          </div>
          <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
            <History size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
            <p className="text-sm text-gray-500 mb-1">Total Sales</p>
            <h2 className="text-2xl font-bold text-gray-900">$3,420</h2>
          </div>
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} /> Performance Overview
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Recent Views
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Recent Transactions & Alerts */}
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-gray-900">Vintage Camera</p>
                                    <p className="text-xs text-gray-500">To: Alex M.</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">$120.00</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">In Escrow</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" /> Action Required
                </h3>
                <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">Verify your Identity</p>
                        <p className="text-xs text-red-600 mt-1">To withdraw funds, please complete KYC verification.</p>
                        <button className="mt-2 text-xs font-bold text-red-700 uppercase hover:underline">Start KYC</button>
                    </div>
                     <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">Ship Order #8821</p>
                        <p className="text-xs text-blue-600 mt-1">Buyer has deposited funds. Ship by tomorrow.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
