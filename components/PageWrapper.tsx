
import React from 'react';

interface PageWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, subtitle, children, className = 'bg-white', containerClassName = 'max-w-7xl' }) => (
    <div className={`py-24 ${className}`}>
      <div className={`${containerClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-nsus-gray-900">{title}</h1>
          <p className="mt-4 text-lg text-nsus-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="mt-12">
          {children}
        </div>
      </div>
    </div>
);

export default PageWrapper;
