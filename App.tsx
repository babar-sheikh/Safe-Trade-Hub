import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import SellItem from './pages/SellItem';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import SupportChatbot from './components/SupportChatbot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/sell" element={<SellItem />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <SupportChatbot />
      </div>
    </Router>
  );
};

export default App;
