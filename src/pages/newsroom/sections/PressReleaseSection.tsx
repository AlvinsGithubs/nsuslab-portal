import Pagination from "@/components/Pagination";
import type { NewsArticle } from "@/types";
import PressReleaseCard from "../components/PressReleaseCard";
import React, { useState } from "react";

const PressReleaseSection: React.FC<{ articles: NewsArticle[] }> = ({
  articles,
}) => {
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
  const paginatedArticles = gridArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    window.location.hash = path;
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-24 text-xl text-nsus-gray-500">
        No press releases found.
      </div>
    );
  }

  return (
    <div>
      <div className="mt-12 mb-24" />
      <h2 className="font-bold text-nsus-gray-900 mb-12">Press Release</h2>
      {featuredArticle && (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 mb-12">
          <a
            href={`#/news/${featuredArticle.slug}`}
            onClick={(e) => handleNavigate(e, `#/news/${featuredArticle.slug}`)}
            className="group block relative rounded-lg overflow-hidden aspect-video"
          >
            <img
              src={
                featuredArticle.featuredImageUrl ||
                `https://picsum.photos/seed/${featuredArticle.id}/800/450`
              }
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-sm">
                {new Date(featuredArticle.publicationDate)
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, ".")}
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {featuredArticle.title}
              </h2>
            </div>
          </a>
          <div className="flex flex-col justify-between space-y-4">
            {sideArticles.map((article) => (
              <a
                href={`#/news/${article.slug}`}
                onClick={(e) => handleNavigate(e, `#/news/${article.slug}`)}
                key={article.id}
                className="group flex items-center gap-4 rounded-lg hover:bg-nsus-gray-100"
              >
                <div className="w-36 h-24 bg-nsus-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={
                      article.featuredImageUrl ||
                      `https://picsum.photos/seed/${article.id}/200/150`
                    }
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-nsus-gray-500">
                    {new Date(article.publicationDate)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, ".")}
                  </p>
                  <h3 className="font-bold text-base text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight mt-1">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-nsus-gray-200 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {paginatedArticles.map((article) => (
            <PressReleaseCard key={article.id} article={article} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PressReleaseSection