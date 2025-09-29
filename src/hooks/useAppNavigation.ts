import { useState, useEffect, useCallback } from 'react';
import type React from 'react';
import { gsap } from 'gsap';

export const useAppNavigation = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();

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
  }, [currentPath]);

  return { currentPath, navigate };
};