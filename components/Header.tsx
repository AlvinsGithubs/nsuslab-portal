
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    // Don't navigate if href is '#'
    if (path !== '#') {
      window.location.hash = path;
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-nsus-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#/" onClick={(e) => handleNavigate(e, '#/')}>
              <img src="https://i.ibb.co/MWhTmRr/nsus-logo.png" alt="NSUS Logo" className="h-9" />
            </a>
          </div>

          {/* === Desktop Menu (Dropdown) === */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.nameKey}
                className="relative group" // group 클래스 추가
                onMouseEnter={() => setOpenDropdown(link.nameKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  className="hover-line-effect text-base font-bold uppercase tracking-wider text-nsus-gray-700 hover:text-nsus-blue transition-colors px-4 py-7 flex items-center"
                >
                  {t(link.nameKey)}
                </a>
                <AnimatePresence>
                  {openDropdown === link.nameKey && link.subLinks && (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-white rounded-b-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-2">
                        {link.subLinks.map((subLink) => (
                          <a
                            key={subLink.nameKey}
                            href={subLink.href}
                            onClick={(e) => {
                              handleNavigate(e, subLink.href);
                              setOpenDropdown(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-nsus-gray-700 hover:bg-nsus-gray-100 hover:text-nsus-blue"
                          >
                            {t(subLink.nameKey)}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="#/login" onClick={(e) => handleNavigate(e, '#/login')} className="text-base font-medium text-nsus-gray-700 hover:text-nsus-blue transition-colors">{t('header_login')}</a>
            <div className="flex items-center">
              <button onClick={() => setLanguage('kr')} className={`font-bold transition-colors ${language === 'kr' ? 'text-nsus-gray-900' : 'text-nsus-gray-500 hover:text-nsus-gray-900'}`}>KR</button>
              <span className="mx-1 text-nsus-gray-300">|</span>
              <button onClick={() => setLanguage('en')} className={`font-bold transition-colors ${language === 'en' ? 'text-nsus-gray-900' : 'text-nsus-gray-500 hover:text-nsus-gray-900'}`}>EN</button>
            </div>
          </div>
          
          {/* === Mobile Menu (Hamburger) - Unchanged === */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-6 w-6 text-nsus-gray-900" /> : <MenuIcon className="h-6 w-6 text-nsus-gray-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu Panel - Unchanged === */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a key={link.nameKey} href={link.href} onClick={(e) => handleNavigate(e, link.href)} className="block px-3 py-2 rounded-md text-base font-medium text-nsus-gray-700 hover:text-nsus-blue hover:bg-nsus-gray-100">
                {t(link.nameKey)}
              </a>
            ))}
          </nav>
          <div className="pt-4 pb-3 border-t border-nsus-gray-200">
             <div className="px-5 flex items-center justify-between">
                <a href="#/login" onClick={(e) => handleNavigate(e, '#/login')} className="w-full text-left text-base font-medium text-nsus-gray-700 hover:text-nsus-blue hover:bg-nsus-gray-100 p-2 rounded-md">{t('header_login')}</a>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setLanguage('kr')} className={`font-bold p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${language === 'kr' ? 'text-nsus-gray-900' : 'text-nsus-gray-500'}`}>KR</button>
                  <span className="text-nsus-gray-300">|</span>
                  <button onClick={() => setLanguage('en')} className={`p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${language === 'en' ? 'font-bold text-nsus-gray-900' : 'text-nsus-gray-500'}`}>EN</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;