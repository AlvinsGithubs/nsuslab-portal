
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { fetchAllNewsArticles } from '@/lib/news';
import type { NewsArticle } from '@/types';
import Pagination from '@/components/Pagination';
import { NavbarThemeContext } from '@/App';

const ArticleCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        event.preventDefault();
        window.location.hash = path;
    };
    const path = `#/news/${article.slug}`;
    const formattedDate = new Date(article.publicationDate).toISOString().split('T')[0].replace(/-/g, '.');

    return (
        <a href={path} onClick={e => handleNavigate(e, path)} className="group block">
            <div className="aspect-[4/3] bg-nsus-gray-200 rounded-lg overflow-hidden">
                <img src={article.featuredImageUrl || `https://picsum.photos/seed/${article.id}/400/300`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="mt-4 text-sm text-nsus-gray-500">{formattedDate}</p>
            <h3 className="mt-1 font-bold text-lg text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight">{article.title}</h3>
        </a>
    );
};

const PressReleaseView: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    const featuredArticle = articles[0];
    const sideArticles = articles.slice(1, 3);
    const gridArticles = articles.slice(3);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
    const paginatedArticles = gridArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        event.preventDefault();
        window.location.hash = path;
    };

    if (articles.length === 0) {
        return <div className="text-center py-24 text-xl text-nsus-gray-500">No press releases found.</div>;
    }

    return (
        <div>
            <h1 className="text-5xl font-bold text-nsus-gray-900 text-center mb-16">Press Release</h1>
            {featuredArticle && (
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    <a href={`#/news/${featuredArticle.slug}`} onClick={e => handleNavigate(e, `#/news/${featuredArticle.slug}`)} className="group block relative rounded-lg overflow-hidden aspect-video">
                        <img src={featuredArticle.featuredImageUrl || `https://picsum.photos/seed/${featuredArticle.id}/800/450`} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <p className="text-sm">{new Date(featuredArticle.publicationDate).toISOString().split('T')[0].replace(/-/g, '.')}</p>
                            <h2 className="mt-1 text-2xl font-bold">{featuredArticle.title}</h2>
                        </div>
                    </a>
                    <div className="flex flex-col justify-center space-y-4">
                        {sideArticles.map(article => (
                            <a href={`#/news/${article.slug}`} onClick={e => handleNavigate(e, `#/news/${article.slug}`)} key={article.id} className="group flex items-center gap-4 p-2 rounded-lg hover:bg-nsus-gray-100">
                                <div className="w-36 h-24 bg-nsus-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={article.featuredImageUrl || `https://picsum.photos/seed/${article.id}/200/150`} alt={article.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs text-nsus-gray-500">{new Date(article.publicationDate).toISOString().split('T')[0].replace(/-/g, '.')}</p>
                                    <h3 className="font-bold text-base text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight mt-1">{article.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <div className="border-t border-nsus-gray-200 pt-16">
                <h2 className="text-3xl font-bold text-nsus-gray-900 mb-8">보도자료</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {paginatedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

const NewsroomPage: React.FC = () => {
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
  
  const pressReleases = useMemo(() => articles.filter(a => a.category === 'Press Release'), [articles]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-24 text-xl text-nsus-gray-500">Loading news...</div>;
    }

    if (error) {
      return <div className="text-center py-24 text-xl text-red-500">{error}</div>;
    }
    
    return <PressReleaseView articles={pressReleases} />;
  };

  return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {renderContent()}
        </div>
    </div>
  );
};

export default NewsroomPage;