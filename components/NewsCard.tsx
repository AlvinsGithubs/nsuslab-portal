
import React from 'react';
import type { NewsArticle } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    window.location.hash = path;
  };
  
  const path = `#/news/${article.slug}`;
  
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <a 
      href={path} 
      onClick={(e) => handleNavigate(e, path)}
      className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="relative">
        <img 
          src={article.featuredImageUrl || 'https://picsum.photos/seed/news/400/250'} 
          alt={article.title} 
          className="w-full h-56 object-cover" 
        />
        <div className="absolute top-4 left-4 bg-nsus-blue text-white text-xs font-bold uppercase px-2 py-1 rounded">
          {article.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-nsus-gray-900 group-hover:text-nsus-blue transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-nsus-gray-500">{formattedDate}</p>
        <p className="mt-3 text-nsus-gray-700 flex-grow">{article.summary}</p>
        <div className="mt-4 text-right">
          <span className="inline-flex items-center font-bold text-nsus-blue">
            Read more <ArrowRightIcon className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
