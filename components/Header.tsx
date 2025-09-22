
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://i.ibb.co/FmP8g1L/utopiacommunitie-logotype-1.png" alt="UTO⌘Bio Logo" className="h-10" />
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Login</a>
          <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
