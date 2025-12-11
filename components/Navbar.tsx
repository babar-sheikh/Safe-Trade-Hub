import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, PlusCircle, LayoutDashboard, Menu, X, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">SecureTrade</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/marketplace" className={isActive('/marketplace')}>Marketplace</Link>
            <Link to="/sell" className={isActive('/sell')}>
               <span className="flex items-center gap-1"><PlusCircle size={18}/> Sell Item</span>
            </Link>
            <Link to="/dashboard" className={isActive('/dashboard')}>
                <span className="flex items-center gap-1"><LayoutDashboard size={18}/> Dashboard</span>
            </Link>
            <div className="flex items-center gap-4 ml-4">
                 <button className="text-gray-500 hover:text-gray-700">
                    <User size={20} />
                 </button>
                 <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                    1250 Tokens
                 </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700">Home</Link>
            <Link to="/marketplace" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700">Marketplace</Link>
            <Link to="/sell" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-indigo-600">Sell Item</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700">Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
