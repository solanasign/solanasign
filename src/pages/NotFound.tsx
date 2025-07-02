import React from 'react';
import BeamsBackground from '../components/BeamsBackground'
import { logo } from '../assets/images'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <BeamsBackground>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">

        <div className="text-center">
          <img src={logo} alt="Sigma Connect Logo" className="mx-auto mb-4 w-24 h-24" />
          <h1 className="text-9xl font-bold" style={{ color: '#14244d' }}>404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-2 mb-8">The page you're looking for doesn't exist</p>
          <Link
            to="/"
            className="px-6 py-3 rounded-lg font-bold transition-colors"
            style={{ backgroundColor: '#14244d', color: '#fff' }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </BeamsBackground>
  );
};

export default NotFound; 