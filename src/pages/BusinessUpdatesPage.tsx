
import React, { useState, useEffect } from 'react';
import { fetchAllNewsArticles } from '@/lib/news';
import type { NewsArticle } from '@/types';
import Pagination from '@/components/Pagination';

const ArticleCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        event.preventDefault();
        window.location.hash = path;
    };
    const path = `#/news/${article.slug}`;
    const formattedDate = new Date(article.publicationDate).toISOString().split('T')[0].replace(/-/g, '.');

    return (
        <a href={path} onClick={e => handleNavigate(e, path)} className="group block">
            <div className="aspect-square bg-nsus-gray-200 rounded-lg overflow-hidden">
                <img src={article.featuredImageUrl || `https://picsum.photos/seed/${article.id}/400/400`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="mt-4 font-bold text-lg text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight">{article.title}</h3>
            <p className="mt-1 text-sm text-nsus-gray-500">{formattedDate}</p>
        </a>
    );
};


const BusinessUpdatesPage: React.FC = () => {
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
                const businessUpdates = fetchedArticles.filter(a => a.category === 'Business Highlight');
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
    const paginatedArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center py-24 text-xl text-nsus-gray-500">Loading updates...</div>;
        }

        if (error) {
            return <div className="text-center py-24 text-xl text-red-500">{error}</div>;
        }

        if (paginatedArticles.length > 0) {
            return (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {paginatedArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            );
        }

        return <div className="text-center py-24 text-xl text-nsus-gray-500">No business updates found.</div>;
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-5xl font-bold text-nsus-gray-900 text-center mb-16">Business Updates</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default BusinessUpdatesPage;
