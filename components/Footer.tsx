
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nsus-gray-900 text-nsus-gray-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} NSUS LAB Corp. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Affiliates</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
