import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import { useLanguage } from '../contexts/LanguageContext';
import ChevronDownIcon from './icons/ChevronDownIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
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

          {/* === Desktop Menu (Mega Menu) === */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.nameKey}
                className="relative group" // group 클래스 추가!
                onMouseEnter={() => setOpenDropdown(link.nameKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  //className="hover-line-effect text-base font-bold uppercase tracking-wider text-nsus-gray-200 hover:text-white transition-colors px-4 py-5 flex items-center"
                  className="menu-underline text-base font-bold uppercase tracking-wider text-white hover:text-nsus-blue transition-colors px-4 py-5 flex items-center space-x-1">                
                  {t(link.nameKey)}
                  {link.megaMenu && <ChevronDownIcon className="h-4 w-4" />}
                </a>
                {openDropdown === link.nameKey && link.megaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-auto bg-white rounded-b-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-8">
                        <div className="flex gap-x-12">
                            {link.megaMenu.map((column) => (
                                <div key={column.titleKey} className="w-56">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-nsus-gray-500 mb-4">{t(column.titleKey)}</h3>
                                    <ul className="space-y-3">
                                        {column.links.map((menuLink) => (
                                            <li key={menuLink.nameKey}>
                                                <a
                                                    href={menuLink.href}
                                                    onClick={(e) => {
                                                        handleNavigate(e, menuLink.href);
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="hover-line-effect block text-base font-medium text-nsus-gray-700 hover:text-nsus-blue transition-colors">
                                                    {t(menuLink.nameKey)}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="#/login" onClick={(e) => handleNavigate(e, '#/login')} className="text-base font-medium text-nsus-gray-200 hover:text-white transition-colors">{t('header_login')}</a>
            <div className="flex items-center">
              <button onClick={() => setLanguage('kr')} className={`font-bold transition-colors ${language === 'kr' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'}`}>KR</button>
              <span className="mx-1 text-nsus-gray-500">|</span>
              <button onClick={() => setLanguage('en')} className={`font-bold transition-colors ${language === 'en' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'}`}>EN</button>
            </div>
          </div>
          
          {/* === Mobile Menu (Hamburger) === */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu Panel === */}
      {isMenuOpen && (
        <div className="lg:hidden bg-nsus-gray-900 shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a key={link.nameKey} href={link.href} onClick={(e) => handleNavigate(e, link.href)} className="block px-3 py-2 rounded-md text-base font-medium text-nsus-gray-200 hover:text-white hover:bg-nsus-gray-800">
                {t(link.nameKey)}
              </a>
            ))}
          </nav>
          <div className="pt-4 pb-3 border-t border-nsus-gray-700">
             <div className="px-5 flex items-center justify-between">
                <a href="#/login" onClick={(e) => handleNavigate(e, '#/login')} className="w-full text-left text-base font-medium text-nsus-gray-200 hover:text-white hover:bg-nsus-gray-800 p-2 rounded-md">{t('header_login')}</a>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setLanguage('kr')} className={`font-bold p-2 rounded-md hover:bg-nsus-gray-800 transition-colors ${language === 'kr' ? 'text-white' : 'text-nsus-gray-400'}`}>KR</button>
                  <span className="text-nsus-gray-700">|</span>
                  <button onClick={() => setLanguage('en')} className={`p-2 rounded-md hover:bg-nsus-gray-800 transition-colors ${language === 'en' ? 'font-bold text-white' : 'text-nsus-gray-400'}`}>EN</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;