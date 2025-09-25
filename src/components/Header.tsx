import React, { useState, useEffect, useLayoutEffect, useRef, useContext, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS } from '@/constants';
import type { NavLink } from '@/types'; // constants.ts의 타입을 그대로 사용
import { useLanguage } from '@/contexts/LanguageContext';
import { NavbarThemeContext } from '@/App';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavLink | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const { language, setLanguage, t } = useLanguage();
  const navbarContext = useContext(NavbarThemeContext);
  const navbarTheme = navbarContext?.navbarTheme || 'dark';

  const headerRef = useRef<HTMLElement | null>(null);

  // 스크롤에 따른 헤더 스타일 및 가시성 제어
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const isScrolledPast = self.scroll() > 50;
        setIsScrolled(isScrolledPast);

        if (self.scroll() < 50) {
          setIsHeaderVisible(true);
          return;
        }

        if (self.direction === 1) { // 아래로 스크롤
          setIsHeaderVisible(false);
          setActiveMenu(null);
        } else { // 위로 스크롤
          setIsHeaderVisible(true);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  // 모바일 메뉴가 열렸을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  
  // 현재 페이지 내에서 사용자가 동일 라우팅 메뉴 클릭시, 경로(hash) 추적 후 상태 변경 로직 추가
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/')
  useEffect( () => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    }
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 해시 기반 네비게이션 함수
  const handleNavigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();

    // 현재 경로와 클릭 경로가 같으면 화면 반짝이는 애니메이션
    if (path === currentPath) {
      const mainContent = document.querySelector('main');
      if (!mainContent) return;

      const tl = gsap.timeline();
      tl
        .to(mainContent, { opacity: 0, duration: 0.3 })
        .call(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
        })
        .to(mainContent, { opacity: 1, duration: 0.3 });
    } else if (path && path !== '#') {
      window.location.hash = path;
    }

    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [currentPath]);

  // --- 스타일 동적 계산 ---
  const isHeaderActive = isScrolled || !!activeMenu;
  const baseTextColor = navbarTheme === 'dark' ? 'text-white' : 'text-black';
  const finalTextColor = isHeaderActive ? 'text-black' : baseTextColor;
  const logoFilter = isHeaderActive ? 'brightness-0' : (navbarTheme === 'dark' ? 'brightness-0 invert' : 'brightness-0');

  // --- 애니메이션 Variants ---
  const subMenuAnimate = {
    enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isHeaderActive ? "bg-white backdrop-blur-sm border-b border-gray-200" : "bg-transparent border-b border-transparent"}`}
        animate={{ y: isHeaderVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={`flex items-center justify-between w-full max-w-[1680px] mx-auto px-4 h-20 transition-colors duration-300 ${finalTextColor}`}>
          
          <a href="#/" onClick={(e) => handleNavigate(e, '#/')} className="flex-shrink-0">
            <img
              src="https://i.ibb.co/MWhTmRr/nsus-logo.png"
              alt="NSUS Logo"
              className={`h-6 transition-all duration-300 filter ${logoFilter}`}
            />
          </a>

          <nav className="hidden lg:flex justify-center flex-grow">
            <ul className="flex items-center gap-x-6"> {/* gap-x-10을 gap-x-6으로 줄여서 패딩 공간 확보 */}
              {NAV_LINKS.map((link) => (
                <li
                  key={link.nameKey}
                  onMouseEnter={() => setActiveMenu(link)}
                  // ✅ 1. li 태그를 group으로 만들고, 호버 영역과 스타일을 지정합니다.
                  className="group relative rounded-md"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    // ✅ 2. 패딩을 a 태그에 적용하고, group-hover 시 텍스트 색상을 검은색으로 변경합니다.
                    // Active & Press 상태 스타일 추가
                    className="flex items-center gap-2 p-3 font-semibold cursor-pointer"
                  >
                    <span className={link.href === currentPath ? 'font-bold' : ''}>{t(link.nameKey)}</span>
                    {link.megaMenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${activeMenu?.nameKey === link.nameKey ? "rotate-180" : ""}`}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center justify-end gap-4">
            <div className="flex items-center">
              <button
                onClick={() => setLanguage('kr')}
                className={`font-semibold transition-colors px-2 ${language === 'kr' ? finalTextColor : 'text-gray-400 hover:text-current'}`}
              >KR</button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`font-semibold transition-colors px-2 ${language === 'en' ? finalTextColor : 'text-gray-400 hover:text-current'}`}
              >EN</button>
            </div>
            <button className="h-10 w-10 flex items-center justify-center">
              <Search size={22} strokeWidth={2} />
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className={finalTextColor}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu?.megaMenu && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg"
              initial="exit"
              animate="enter"
              exit="exit"
              variants={subMenuAnimate}
            >
              <div className="max-w-screen-xl mx-auto px-8 py-10">
                <div className="flex gap-x-12">
                  {activeMenu.megaMenu.map((column) => (
                    <div key={column.titleKey} className="w-56">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                        {t(column.titleKey)}
                      </h3>
                      <ul className="space-y-3">
                        {column.links.map((menuLink) => (
                          <li key={menuLink.nameKey}>
                            <a
                              href={menuLink.href}
                              onClick={(e) => handleNavigate(e, menuLink.href)}
                              className={`group relative inline-block text-base font-medium transition-colors 
                                ${menuLink.href === currentPath ? 'text-nsus-blue font-black' : 'text-gray-700 hover:text-nsus-blue'}`
                              }
                            >
                              <span>{t(menuLink.nameKey)}</span>
                               <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-nsus-blue transition-all duration-300 group-hover:w-[calc(100%+2px)]"></span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        handleNavigate={handleNavigate}
        currentPath={currentPath}
      />
    </>
  );
};


// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleNavigate: (e: React.MouseEvent<HTMLAnchorElement>, p: string) => void;
  currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, handleNavigate, currentPath }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const toggleSection = (key: string) => {
    setOpenSection(prev => prev === key ? null : key);
  };

  // 모바일 메뉴가 열릴 때 현재 경로가 포함된 섹션을 자동으로 열어주는 로직 추가
  useEffect(() => {
    if (isOpen) {
      const activeParent = NAV_LINKS.find(link => 
        link.megaMenu?.some(col => col.links.some(subLink => subLink.href === currentPath))
      );
      if (activeParent) {
        setOpenSection(activeParent.nameKey);
      }
    }
  }, [isOpen, currentPath]);  

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white z-[1000] p-6 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-black">Menu</h3>
            <button onClick={() => setIsOpen(false)} className="text-black">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {NAV_LINKS.map((link) => (
                <li key={link.nameKey} className="py-2">
                  {link.megaMenu ? (
                    <div>
                      <button
                        onClick={() => toggleSection(link.nameKey)}
                        className="w-full flex justify-between items-center py-2 text-left font-semibold text-lg text-black"
                      >
                        {t(link.nameKey)}
                        <ChevronDown className={`transition-transform duration-300 ${openSection === link.nameKey ? "rotate-180" : ""}`} size={20} />
                      </button>
                      <AnimatePresence>
                        {openSection === link.nameKey && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 pb-2 pl-4 space-y-3">
                              {link.megaMenu.flatMap(col => col.links).map(subLink => (
                                <a
                                  key={subLink.nameKey}
                                  href={subLink.href}
                                  onClick={(e) => handleNavigate(e, subLink.href)}
                                  className={`block transition-colors ${subLink.href === currentPath ? 'text-nsus-blue font-bold' : 'text-gray-600 hover:text-black'}`}
                                >
                                  {t(subLink.nameKey)}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigate(e, link.href)}
                      className={`block py-2 font-semibold text-lg transition-colors ${link.href === currentPath ? 'text-nsus-blue' : 'text-black'}`}
                    >
                      {t(link.nameKey)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <button
                onClick={() => setLanguage('kr')}
                className={`font-semibold transition-colors px-2 ${language === 'kr' ? 'text-black' : 'text-gray-400'}`}
              >KR</button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`font-semibold transition-colors px-2 ${language === 'en' ? 'text-black' : 'text-gray-400'}`}
              >EN</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;

// import React, { useState } from 'react';
// import { NAV_LINKS } from '../constants';
// import MenuIcon from './icons/MenuIcon';
// import XIcon from './icons/XIcon';
// import { useLanguage } from '../contexts/LanguageContext';
// import ChevronDownIcon from './icons/ChevronDownIcon';

// type MegaMenuColumn = {
//   titleKey: string;
//   links: { nameKey: string; href: string; descKey?: string }[];
// };

// type NavLink = {
//   nameKey: string;
//   href: string;
//   megaMenu?: MegaMenuColumn[];
// };

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);   // desktop
//   const [mobileOpen, setMobileOpen] = useState<string | null>(null);       // mobile
//   const { language, setLanguage, t } = useLanguage();

//   const handleNavigate = (
//     event: React.MouseEvent<HTMLAnchorElement>,
//     path: string
//   ) => {
//     event.preventDefault();
//     if (path !== '#') {
//       window.location.hash = path;
//     }
//     if (isMenuOpen) setIsMenuOpen(false);
//   };

//   const toggleMobileSection = (key: string) => {
//     setMobileOpen((prev) => (prev === key ? null : key));
//   };

//   // 모바일에서 메가메뉴 컬럼을 한 리스트로 평탄화
//   const flattenMegaMenu = (cols: MegaMenuColumn[]) =>
//     cols.flatMap((c) => c.links);

//   return (
//     <header className="sticky top-0 z-50 bg-nsus-gray-900 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="#/" onClick={(e) => handleNavigate(e, '#/')} className="no-underline">
//               <img
//                 src="https://i.ibb.co/MWhTmRr/nsus-logo.png"
//                 alt="NSUS Logo"
//                 className="h-9"
//               />
//             </a>
//           </div>

//           {/* === Desktop Menu (Mega Menu) === */}
//           <nav className="hidden lg:flex lg:items-center lg:space-x-4">
//             {(NAV_LINKS as NavLink[]).map((link) => (
//               <div
//                 key={link.nameKey}
//                 className="relative group"
//                 onMouseEnter={() => setOpenDropdown(link.nameKey)}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 <a
//                   href={link.href}
//                   onClick={(e) => handleNavigate(e, link.href)}
//                   className="no-underline text-base font-bold uppercase tracking-wider text-white hover:text-nsus-blue transition-colors px-4 py-5"
//                 >
//                   <span className="inline-flex items-center gap-2 whitespace-nowrap">
//                     {/* 텍스트만 밑줄 애니메이션 */}
//                     <span className="menu-underline">{t(link.nameKey)}</span>
//                     {link.megaMenu && <ChevronDownIcon className="h-5 w-5" />}
//                   </span>
//                 </a>

//                 {/* Mega Menu Dropdown */}
//                 {openDropdown === link.nameKey && link.megaMenu && (
//                   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-auto bg-white rounded-b-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
//                     <div className="p-8">
//                       <div className="flex gap-x-12">
//                         {link.megaMenu.map((column) => (
//                           <div key={column.titleKey} className="w-56">
//                             <h3 className="text-sm font-bold uppercase tracking-wider text-nsus-gray-500 mb-4">
//                               {t(column.titleKey)}
//                             </h3>
//                             <ul className="space-y-3">
//                               {column.links.map((menuLink) => (
//                                 <li key={menuLink.nameKey}>
//                                   <a
//                                     href={menuLink.href}
//                                     onClick={(e) => {
//                                       handleNavigate(e, menuLink.href);
//                                       setOpenDropdown(null);
//                                     }}
//                                     className="block no-underline text-base font-medium text-nsus-gray-700 hover:text-nsus-blue transition-colors"
//                                   >
//                                     <span className="menu-underline">{t(menuLink.nameKey)}</span>
//                                   </a>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Right: Login & Language */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {/* <a
//               href="#/login"
//               onClick={(e) => handleNavigate(e, '#/login')}
//               className="no-underline text-base font-medium text-nsus-gray-200 hover:text-white transition-colors"
//             >
//               {t('header_login')}
//             </a> */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setLanguage('kr')}
//                 className={`font-bold transition-colors ${
//                   language === 'kr' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'
//                 }`}
//               >
//                 KR
//               </button>
//               <span className="mx-1 text-nsus-gray-500">|</span>
//               <button
//                 onClick={() => setLanguage('en')}
//                 className={`font-bold transition-colors ${
//                   language === 'en' ? 'text-white' : 'text-nsus-gray-400 hover:text-white'
//                 }`}
//               >
//                 EN
//               </button>
//             </div>
//           </div>

//           {/* === Mobile Menu (Hamburger) === */}
//           <div className="lg:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? (
//                 <XIcon className="h-6 w-6 text-white" />
//               ) : (
//                 <MenuIcon className="h-6 w-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* === Mobile Menu Panel (Accordion) === */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white text-nsus-gray-900 shadow-2xl border-t border-nsus-gray-300">
//           {/* 헤더 라인 */}
//           <div className="flex items-center justify-between px-5 py-4">
//             <h2 className="text-lg font-semibold">Menu</h2>
//             <button onClick={() => setIsMenuOpen(false)}>
//               <XIcon className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="h-px bg-nsus-gray-300" />

//           {/* 탑 레벨 아코디언 */}
//           <nav className="divide-y divide-nsus-gray-300">
//             {(NAV_LINKS as NavLink[]).map((link) => {
//               const hasSub = !!link.megaMenu?.length;
//               const isOpen = mobileOpen === link.nameKey;

//               // 모바일에서 메가메뉴 항목 펼침 시 보여줄 리스트
//               const subLinks = hasSub ? flattenMegaMenu(link.megaMenu!) : [];

//               return (
//                 <div key={link.nameKey}>
//                   {/* 상단 항목 (버튼 or 링크) */}
//                   {hasSub ? (
//                     <button
//                       onClick={() => toggleMobileSection(link.nameKey)}
//                       aria-expanded={isOpen}
//                       className="w-full flex items-center justify-between px-5 py-4"
//                     >
//                       <span className="text-base font-semibold">{t(link.nameKey)}</span>
//                       <ChevronDownIcon
//                         className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
//                       />
//                     </button>
//                   ) : (
//                     <a
//                       href={link.href}
//                       onClick={(e) => handleNavigate(e, link.href)}
//                       className="block px-5 py-4 no-underline text-base font-semibold hover:bg-nsus-gray-100 transition-colors"
//                     >
//                       {t(link.nameKey)}
//                     </a>
//                   )}

//                   {/* 펼쳐진 서브 리스트 */}
//                   {hasSub && isOpen && (
//                     <div className="px-5 pb-5 space-y-5">
//                       {subLinks.map((item) => (
//                         <a
//                           key={item.nameKey}
//                           href={item.href}
//                           onClick={(e) => handleNavigate(e, item.href)}
//                           className="block no-underline"
//                         >
//                           <div className="text-[15px] font-semibold leading-tight">{t(item.nameKey)}</div>
//                           {/* descKey가 있으면 한 줄 더 노출 (옵션) */}
//                           {item.descKey && (
//                             <div className="text-sm text-nsus-gray-700 mt-1">
//                               {t(item.descKey)}
//                             </div>
//                           )}
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* 기타: 로그인/언어 스위치 */}
//           <div className="mt-2 pt-3 pb-4 border-t border-nsus-gray-300">
//             <div className="px-5 flex items-center justify-between">
//               {/* <a
//                 href="#/login"
//                 onClick={(e) => handleNavigate(e, '#/login')}
//                 className="w-full text-left text-base font-medium text-nsus-gray-900 hover:bg-nsus-gray-100 p-2 rounded-md no-underline"
//               >
//                 {t('header_login')}
//               </a> */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setLanguage('kr')}
//                   className={`font-bold p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${
//                     language === 'kr' ? 'text-nsus-gray-400' : 'text-nsus-gray-600'
//                   }`}
//                 >
//                   KR
//                 </button>
//                 <span className="text-nsus-gray-400">|</span>
//                 <button
//                   onClick={() => setLanguage('en')}
//                   className={`p-2 rounded-md hover:bg-nsus-gray-100 transition-colors ${
//                     language === 'en' ? 'font-bold text-nsus-gray-400' : 'text-nsus-gray-600'
//                   }`}
//                 >
//                   EN
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
