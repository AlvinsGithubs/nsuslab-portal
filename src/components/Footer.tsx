import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { NAV_LINKS } from "@/constants";
import nsus_logo from "@/asset/imgs/nsus_logo.png"

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, onClick }) => (
  <li>
    <a
      href={href}
      onClick={onClick}
      className="text-nsus-gray-500 hover:text-nsus-gray-900 hover:underline"
    >
      {children}
    </a>
  </li>
);

const LinkedInSocialLink: React.FC = () => (
  <a
    href="https://www.linkedin.com/company/nsusgroup/posts/?feedView=all"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
    aria-label="NSUSLAB LinkedIn"
  >
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  </a>
);

const Footer: React.FC = () => {
  const { navigate } = useAppNavigation();
  const { t } = useLanguage(); 

  return (
    <footer className="bg-nsus-gray-100 border-t border-nsus-gray-200">
      <div className="max-w-screen-xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-12 lg:col-span-4 pb-6 lg:pb-0">
            <div className="mb-6">
              <img
                src={nsus_logo}
                alt="NSUS Logo"
                className="h-4 transition-all duration-300 brightness-0"
              />
            </div>
            <div className="caption text-nsus-gray-500 mb-4 ">
              Copyright {new Date().getFullYear()} NSUSLAB. All rights reserved.
            </div>
            <div className="flex items-center space-x-5 ">
              <LinkedInSocialLink />
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 lg:col-span-8 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {NAV_LINKS.map((link) => (
                <div key={link.nameKey}>
                  {!link.megaMenu ? (
                    <a href={link.href} onClick={(e) => navigate(e, link.href)}>
                      <h6 className="font-bold text-nsus-gray-900 mb-4">
                        {t(link.nameKey)}
                      </h6>
                    </a>
                  ) : (
                    <>
                      <h6 className="font-bold text-nsus-gray-900 mb-4">
                        {t(link.nameKey)}
                      </h6>
                      <ul className="space-y-3">
                        {link.megaMenu
                          .flatMap((column) => column.links)
                          .map((subLink) => (
                            <FooterLink
                              key={subLink.nameKey}
                              href={subLink.href}
                              onClick={(e) => navigate(e, subLink.href)}
                            >
                              {t(subLink.nameKey)}
                            </FooterLink>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
