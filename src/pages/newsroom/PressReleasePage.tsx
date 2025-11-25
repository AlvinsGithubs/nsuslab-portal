import React, { useState, useEffect, useMemo, useContext } from "react";
import { fetchAllNewsArticles } from "@/lib/news";
import type { NewsArticle } from "@/types";
import { NavbarThemeContext } from "@/App";
import PressReleaseSection from "./sections/PressReleaseSection";

const PressReleasePage: React.FC = () => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const fetchedArticles = await fetchAllNewsArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error fetching news articles:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getNews();
  }, []);

  const pressReleases = useMemo(
    () => articles.filter((a) => a.category === "Press Release"),
    [articles]
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-24 text-xl text-nsus-gray-500">
          Loading news...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-24 text-xl text-red-500">{error}</div>
      );
    }

    return <PressReleaseSection articles={pressReleases} />;
  };

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default PressReleasePage;
