
import React, { useContext, useEffect } from 'react';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import { NavbarThemeContext } from '@/App';

const NotFoundPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-nsus-blue sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
              <p className="mt-2 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a
                href="#/"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '#/';
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nsus-blue hover:bg-blue-700"
              >
                <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
                Go back home
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
