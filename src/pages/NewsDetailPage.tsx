
import React, { useState, useEffect, useContext } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { fetchNewsArticleBySlug } from '@/lib/news';
import type { NewsArticle } from '@/types';
import NotFoundPage from './NotFoundPage';
import Breadcrumb from '@/components/Breadcrumb';
import { NavbarThemeContext } from '@/App';

interface NewsDetailPageProps {
  slug: string;
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ slug }) => {
  const navbarContext = useContext(NavbarThemeContext);
  useEffect(() => {
    if (navbarContext) {
      navbarContext.setNavbarTheme("light");
    }
  }, [navbarContext]);
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      setIsLoading(true);
      const fetchedArticle = await fetchNewsArticleBySlug(slug);
      setArticle(fetchedArticle);
      setIsLoading(false);
    };
    getArticle();
  }, [slug]);

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, description, file } = node.data.target.fields;
        if (file.contentType.includes('image')) {
          return <img src={`https:${file.url}`} alt={title || description} className="my-8 rounded-lg shadow-md w-full h-auto" />;
        }
        return null;
      },
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="text-2xl font-bold mt-8 mb-4 text-nsus-gray-900">{children}</h2>,
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4 text-nsus-gray-700 leading-relaxed">{children}</p>,
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-nsus-blue hover:underline">{children}</a>,
    },
  };

  if (isLoading) {
    return <div className="text-center py-24 text-xl text-nsus-gray-500">Loading article...</div>;
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb links={[
          { name: 'Home', href: '#/' },
          { name: 'Newsroom', href: '#/news' },
          { name: article.title, href: `#/news/${article.slug}` }
        ]} />

        <div className="mt-8">
          <div className="text-base text-nsus-blue font-bold uppercase">{article.category}</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-nsus-gray-900 sm:text-5xl">{article.title}</h1>
          <p className="mt-4 text-lg text-nsus-gray-500">{formattedDate}</p>
        </div>

        {article.featuredImageUrl && (
          <img src={article.featuredImageUrl} alt={article.title} className="mt-12 w-full h-auto rounded-xl shadow-lg" />
        )}
        
        <article className="mt-12 prose prose-lg max-w-none">
          {documentToReactComponents(article.content, renderOptions)}
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
