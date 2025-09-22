
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Utopia Communities™. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
