
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import DepartmentsPage from './pages/DepartmentsPage';
import BenefitsPage from './pages/BenefitsPage';
import CultureValuePage from './pages/CultureValuePage';
import FaqPage from './pages/FaqPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import JobDetailPage from './pages/JobDetailPage';
import DepartmentDetailPage from './pages/DepartmentDetailPage';
import PeopleDetailPage from './pages/PeopleDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NewsroomPage from './pages/NewsroomPage';
import BusinessUpdatesPage from './pages/BusinessUpdatesPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AboutUsPage from './pages/AboutUsPage'; 
import ContactPage from './pages/ContactPage';
import RoadToNsusPage from './pages/RoadToNsusPage';
import OurStoryPage from './pages/OurStoryPage';
import FinancialInfoPage from './pages/FinancialInfoPage';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setRoute(hash);
      
      const elementId = hash.split('#').pop();
      if (elementId && document.getElementById(elementId)) {
        // Let the browser handle anchor scrolling
      } else {
        window.scrollTo(0, 0);
      }
    };
    
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    const path = route.startsWith('#/') ? route.substring(2) : '';
    const parts = path.split('/');
    const page = parts[0].split('#')[0]; // Handle anchor links
    const slug = parts[1];

    if (page === 'jobs' && slug) {
      return <JobDetailPage slug={slug} />;
    }
    if (page === 'departments' && slug) {
      return <DepartmentDetailPage slug={slug} />;
    }
    if (page === 'people' && slug) {
      return <PeopleDetailPage slug={slug} />;
    }
    if (page === 'news' && slug) {
      return <NewsDetailPage slug={slug} />;
    }

    switch (`#/${page}`) {
      case '#/careers':
        return <HomePage />;
      case '#/road-to-nsus':
        return <RoadToNsusPage />;
      case '#/departments':
        return <DepartmentsPage />;
      case '#/our-story':
        return <OurStoryPage />;
      case '#/benefits':
        return <BenefitsPage />;
      case '#/financial-info':
        return <FinancialInfoPage />;
      case '#/culture':
        return <CultureValuePage />;
      case '#/history':
        return <HistoryPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/faq':
        return <FaqPage />;
      case '#/login':
        return <LoginPage />;
      case '#/news':
        return <NewsroomPage />;
      case '#/business-updates':
        return <BusinessUpdatesPage />;
      case '#/about': 
        return <AboutUsPage />;
      case '#/':
        return <AboutUsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <LanguageProvider>
      <div className="bg-white min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;