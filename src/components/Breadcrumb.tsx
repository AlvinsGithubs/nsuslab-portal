
import React from 'react';

interface BreadcrumbLink {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };
    
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 caption text-nsus-gray-500">
        {links.map((link, index) => (
          <li key={link.name}>
            <div className="flex items-center">
              {index > 0 && (
                <svg className="flex-shrink-0 h-5 w-5 text-nsus-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              )}
              <a
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="hover:text-nsus-blue transition-colors"
                aria-current={index === links.length - 1 ? 'page' : undefined}
              >
                {link.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
