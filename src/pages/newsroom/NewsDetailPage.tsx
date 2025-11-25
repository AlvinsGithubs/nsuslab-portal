import React, { useState, useEffect, useContext } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { fetchNewsArticleBySlug } from "@/lib/news";
import type { NewsArticle } from "@/types";
import NotFoundPage from "../NotFoundPage";
import Breadcrumb from "@/components/Breadcrumb";
import { NavbarThemeContext } from "@/App";

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
        if (file.contentType.includes("image")) {
          return (
            <img
              src={`https:${file.url}`}
              alt={title || description}
              className="my-8 rounded-lg shadow-md w-full h-auto"
            />
          );
        }
        return null;
      },
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-nsus-gray-900">
          {children}
        </h2>
      ),
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <h6 className="mb-4 text-nsus-gray-700 leading-loose">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
        <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
      ),
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-nsus-blue hover:underline"
        >
          {children}
        </a>
      ),
    },
  };

  if (isLoading) {
    return (
      <div className="text-center py-24 text-xl text-nsus-gray-500">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const formattedDate = new Date(article.publicationDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 pt-16">
        <Breadcrumb
          links={[
            { name: "Newsroom", href: `#/news` },
            { name: `${article.category}`, href: `#/news/${article.slug}` },
          ]}
        />

        <div className="mt-8">
          <h3 className="mt-2 tracking-tight text-nsus-gray-900">
            {article.title}
          </h3>
          <p className="caption mt-4 text-nsus-gray-500">{formattedDate}</p>
        </div>

        {article.featuredImageUrl && (
          <img
            src={article.featuredImageUrl}
            alt={article.title}
            className="mt-12 w-full h-auto rounded-xl shadow-lg"
          />
        )}

        <article className="mt-12 prose prose-lg max-w-screen-lg mx-auto">
          {documentToReactComponents(article.content, renderOptions)}
        </article>

        <div className="mt-20 mb-12">
          <hr className="border-t border-gray-200 mb-12" />
          <div className="flex justify-center">
            <a
              href="#/news"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-nsus-gray-900 rounded-lg hover:bg-nsus-gray-700 transition-colors duration-200"
            >
              목록보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
