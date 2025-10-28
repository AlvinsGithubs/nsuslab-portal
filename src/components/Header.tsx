import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/constants";
import type { NavLink } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavbarThemeContext } from "@/App";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import nsus_logo from "@/asset/imgs/nsus_logo.png"

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavLink | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [navLeftOffset, setNavLeftOffset] = useState(0);

  const { language, setLanguage, t } = useLanguage();
  const navbarContext = useContext(NavbarThemeContext);
  const navbarTheme = navbarContext?.navbarTheme || "dark";

  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const updateNavOffset = () => {
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const containerRect = headerRef.current
          ?.querySelector(".max-w-screen-xl")
          ?.getBoundingClientRect();
        if (containerRect) {
          setNavLeftOffset(navRect.left - containerRect.left);
        }
      }
    };

    updateNavOffset();
    window.addEventListener("resize", updateNavOffset);

    return () => {
      window.removeEventListener("resize", updateNavOffset);
    };
  }, []);

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

        if (self.direction === 1) {
          setIsHeaderVisible(false);
          setActiveMenu(null);
        } else {
          setIsHeaderVisible(true);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const { currentPath, navigate } = useAppNavigation();
  const handleNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      navigate(event, path);
      setIsMobileMenuOpen(false);
      setActiveMenu(null);
    },
    [navigate]
  );

  const isHeaderActive = isScrolled || !!activeMenu;
  const baseTextColor = navbarTheme === "dark" ? "text-white" : "text-black";
  const finalTextColor = isHeaderActive ? "text-gray-600" : baseTextColor;
  const logoFilter = isHeaderActive
    ? "brightness-0"
    : navbarTheme === "dark"
    ? "brightness-0 invert"
    : "brightness-0";

  const subMenuAnimate: Variants = {
    enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        onMouseLeave={() => setActiveMenu(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isHeaderActive
            ? "bg-white backdrop-blur-sm border-b border-gray-200"
            : "bg-transparent border-b border-transparent"
        }`}
        animate={{ y: isHeaderVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`flex items-center justify-between w-full max-w-screen-xl mx-auto px-4 lg:px-8 h-16 transition-colors duration-300 ${finalTextColor}`}
        >
          <a
            href="#/"
            onClick={(e) => handleNavigate(e, "#/")}
            className="flex-shrink-0"
          >
            <img
              src={nsus_logo}
              alt="NSUS Logo"
              className={`h-4 transition-all duration-300 filter ${logoFilter}`}
            />
          </a>

          <nav className="hidden lg:flex" ref={navRef}>
            <ul className="flex items-center gap-x-6">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.nameKey}
                  onMouseEnter={() => setActiveMenu(link)}
                  className="group relative rounded-md"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    className="flex items-center gap-2 p-3 text-md cursor-pointer transition-colors duration-200 group-hover:text-gray-950"
                  >
                    <span
                      className={link.href === currentPath ? "font-bold" : ""}
                    >
                      {t(link.nameKey)}
                    </span>
                    {link.megaMenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeMenu?.nameKey === link.nameKey
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center justify-end gap-4">
            <div className="flex items-center">
              <button
                onClick={() => setLanguage("kr")}
                className={`font-semibold transition-colors px-2 ${
                  language === "kr"
                    ? finalTextColor
                    : "text-gray-400 hover:text-current"
                }`}
              >
                KR
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={`font-semibold transition-colors px-2 ${
                  language === "en"
                    ? finalTextColor
                    : "text-gray-400 hover:text-current"
                }`}
              >
                EN
              </button>
            </div>
            <button className="h-10 w-10 flex items-center justify-center">
              <Search size={22} strokeWidth={2} />
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={finalTextColor}
            >
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
              <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-12">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0"
                    style={{ width: `${navLeftOffset - 32}px` }}
                  >
                    <h2 className="text-3xl font-bold text-black mb-4">
                      {t(activeMenu.nameKey)}
                    </h2>
                    <p className="text-gray-600 text-base">
                      {t(`${activeMenu.nameKey}_description`)}
                    </p>
                  </div>

                  <div className="flex gap-x-12 px-2">
                    {activeMenu.megaMenu.map((column) => (
                      <div key={column.titleKey} className="w-56">
                        {activeMenu.nameKey === 'nav_career' && (
                          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                            {t(column.titleKey)}
                          </h3>
                        )}

                        <ul className="space-y-3">
                          {column.links.map((menuLink) => (
                            <li key={menuLink.nameKey}>
                              <a
                                href={menuLink.href}
                                onClick={(e) =>
                                  handleNavigate(e, menuLink.href)
                                }
                                className={`group relative inline-block text-base font-medium transition-colors 
                          ${
                            menuLink.href === currentPath
                              ? "text-nsus-blue font-black"
                              : "text-gray-700 hover:text-nsus-blue"
                          }`}
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

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  handleNavigate,
  currentPath,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (isOpen) {
      const activeParent = NAV_LINKS.find((link) =>
        link.megaMenu?.some((col) =>
          col.links.some((subLink) => subLink.href === currentPath)
        )
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
                        <ChevronDown
                          className={`transition-transform duration-300 ${
                            openSection === link.nameKey ? "rotate-180" : ""
                          }`}
                          size={20}
                        />
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
                              {link.megaMenu
                                .flatMap((col) => col.links)
                                .map((subLink) => (
                                  <a
                                    key={subLink.nameKey}
                                    href={subLink.href}
                                    onClick={(e) =>
                                      handleNavigate(e, subLink.href)
                                    }
                                    className={`block transition-colors ${
                                      subLink.href === currentPath
                                        ? "text-nsus-blue font-bold"
                                        : "text-gray-600 hover:text-black"
                                    }`}
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
                      className={`block py-2 font-semibold text-lg transition-colors ${
                        link.href === currentPath
                          ? "text-nsus-blue"
                          : "text-black"
                      }`}
                    >
                      {t(link.nameKey)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <button
                onClick={() => setLanguage("kr")}
                className={`font-semibold transition-colors px-2 ${
                  language === "kr" ? "text-black" : "text-gray-400"
                }`}
              >
                KR
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={`font-semibold transition-colors px-2 ${
                  language === "en" ? "text-black" : "text-gray-400"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;
