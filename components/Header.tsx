import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import { useLanguage } from '../contexts/LanguageContext';
import ChevronDownIcon from './icons/ChevronDownIcon';

type MegaMenuColumn = {
  titleKey: string;
  links: { nameKey: string; href: string; descKey?: string }[];
};

type NavLink = {
  nameKey: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);   // desktop
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);       // mobile
  const { language, setLanguage, t } = useLanguage();

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    if (path !== '#') {
      window.location.hash = path;
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMobileSection = (key: string) => {
    setMobileOpen((prev) => (prev === key ? null : key));
  };

  // 모바일에서 메가메뉴 컬럼을 한 리스트로 평탄화
  const flattenMegaMenu = (cols: MegaMenuColumn[]) =>
    cols.flatMap((c) => c.links);

  return (
    <header className="sticky top-0 z-50 bg-nsus-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#/" onClick={(e) => handleNavigate(e, '#/')} className="no-underline">
              <img
                src="https://i.ibb.co/MWhTmRr/nsus-logo.png"
                alt="NSUS Logo"
                className="h-9"
              />
            </a>
          </div>

          {/* === Desktop Menu (Mega Menu) === */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-4">
            {(NAV_LINKS as NavLink[]).map((link) => (
              <div
                key={link.nameKey}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.nameKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  className="no-underline text-base font-bold uppercase tracking-wider text-white hover:text-nsus-blue transition-colors px-4 py-5"
                >
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    {/* 텍스트만 밑줄 애니메이션 */}
                    <span className="menu-underline">{t(link.nameKey)}</span>
                    {link.megaMenu && <ChevronDownIcon className="h-5 w-5" />}
                  </span>
                </a>

                {/* Mega Menu Dropdown */}
                {openDropdown === link.nameKey && link.megaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-auto bg-white rounded-b-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-8">
                      <div className="flex gap-x-12">
                        {link.megaMenu.map((column) => (
                          <div key={column.titleKey} className="w-56">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-nsus-gray-500 mb-4">
                              {t(column.titleKey)}
                            </h3>
                            <ul className="space-y-3">
                              {column.links.map((menuLink) => (
                                <li key={menuLink.nameKey}>
                                  <a
                                    href={menuLink.href}
                                    onClick={(e) => {
                                      handleNavigate(e, menuLink.href);
                                      setOpenDropdown(null);
                                    }}
                                    className="block no-underline text-base font-medium text-nsus-gray-700 hover:text-nsus-blue transition-colors"
                                  >
                                    <span className="menu-underline">{t(menuLink.nameKey)}</span>
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

          {/* Right: Login & Language */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <a
              href="#/login"
              onClick={(e) => handleNavigate(e, '#/login')}
              className="no-underline text-base font-medium text-nsus-gray-200 hover:text-white transition-colors"
            >
              {t('header_login')}
            </a> */}
            <div className="flex items-center">
              <button
                onClick={() => setLanguage('kr')}
                className={`font-bold transition-colors ${
                  language === 'kr' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'
                }`}
              >
                KR
              </button>
              <span className="mx-1 text-nsus-gray-500">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`font-bold transition-colors ${
                  language === 'en' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* === Mobile Menu (Hamburger) === */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XIcon className="h-6 w-6 text-white" />
              ) : (
                <MenuIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu Panel (Accordion) === */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-nsus-gray-900 shadow-2xl border-t border-nsus-gray-300">
          {/* 헤더 라인 */}
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="h-px bg-nsus-gray-300" />

          {/* 탑 레벨 아코디언 */}
          <nav className="divide-y divide-nsus-gray-300">
            {(NAV_LINKS as NavLink[]).map((link) => {
              const hasSub = !!link.megaMenu?.length;
              const isOpen = mobileOpen === link.nameKey;

              // 모바일에서 메가메뉴 항목 펼침 시 보여줄 리스트
              const subLinks = hasSub ? flattenMegaMenu(link.megaMenu!) : [];

              return (
                <div key={link.nameKey}>
                  {/* 상단 항목 (버튼 or 링크) */}
                  {hasSub ? (
                    <button
                      onClick={() => toggleMobileSection(link.nameKey)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <span className="text-base font-semibold">{t(link.nameKey)}</span>
                      <ChevronDownIcon
                        className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigate(e, link.href)}
                      className="block px-5 py-4 no-underline text-base font-semibold hover:bg-nsus-gray-100 transition-colors"
                    >
                      {t(link.nameKey)}
                    </a>
                  )}

                  {/* 펼쳐진 서브 리스트 */}
                  {hasSub && isOpen && (
                    <div className="px-5 pb-5 space-y-5">
                      {subLinks.map((item) => (
                        <a
                          key={item.nameKey}
                          href={item.href}
                          onClick={(e) => handleNavigate(e, item.href)}
                          className="block no-underline"
                        >
                          <div className="text-[15px] font-semibold leading-tight">{t(item.nameKey)}</div>
                          {/* descKey가 있으면 한 줄 더 노출 (옵션) */}
                          {item.descKey && (
                            <div className="text-sm text-nsus-gray-700 mt-1">
                              {t(item.descKey)}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 기타: 로그인/언어 스위치 */}
          <div className="mt-2 pt-3 pb-4 border-t border-nsus-gray-300">
            <div className="px-5 flex items-center justify-between">
              {/* <a
                href="#/login"
                onClick={(e) => handleNavigate(e, '#/login')}
                className="w-full text-left text-base font-medium text-nsus-gray-900 hover:bg-nsus-gray-100 p-2 rounded-md no-underline"
              >
                {t('header_login')}
              </a> */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLanguage('kr')}
                  className={`font-bold p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${
                    language === 'kr' ? 'text-nsus-gray-900' : 'text-nsus-gray-700'
                  }`}
                >
                  KR
                </button>
                <span className="text-nsus-gray-400">|</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${
                    language === 'en' ? 'font-bold text-nsus-gray-900' : 'text-nsus-gray-700'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
