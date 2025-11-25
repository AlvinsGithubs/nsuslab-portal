import React, { useState, useEffect, useContext } from "react";
import { fetchAllNewsArticles } from "@/lib/news";
import type { NewsArticle } from "@/types";
import Pagination from "@/components/Pagination";
import { NavbarThemeContext } from "@/App";
import BusinessUpdateCard from "./components/BusinessUpdateCard";

const BusinessUpdatesPage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4x3 grid

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const fetchedArticles = await fetchAllNewsArticles();
        const businessUpdates = fetchedArticles.filter(
          (a) => a.category === "Business Highlight"
        );
        setArticles(businessUpdates);
      } catch (err) {
        console.error("Error fetching news articles:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getNews();
  }, []);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-24 text-xl text-nsus-gray-500">
          Loading updates...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-24 text-xl text-red-500">{error}</div>
      );
    }

    if (paginatedArticles.length > 0) {
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {paginatedArticles.map((article) => (
              <BusinessUpdateCard key={article.id} article={article} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      );
    }

    return (
      <div className="text-center py-24 text-xl text-nsus-gray-500">
        No business updates found.
      </div>
    );
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-bold text-nsus-gray-900 mb-12">Business Updates</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default BusinessUpdatesPage;
