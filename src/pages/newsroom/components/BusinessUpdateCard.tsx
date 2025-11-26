import type { NewsArticle } from "@/types";

const BusinessUpdateCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();
    window.location.hash = path;
  };
  const path = `#/news/${article.slug}`;
  // const formattedDate = new Date(article.publicationDate).toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <a
      href={path}
      onClick={(e) => handleNavigate(e, path)}
      className="group block"
    >
      <div className="aspect-square bg-nsus-gray-200 rounded-lg overflow-hidden">
        <img
          src={
            article.featuredImageUrl ||
            `https://picsum.photos/seed/${article.id}/400/400`
          }
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-4 font-bold text-base md:text-lg text-nsus-gray-900 group-hover:text-nsus-blue transition-colors leading-tight">
        {article.title}
      </h3>
      {/* <p className="mt-1 text-sm text-nsus-gray-500">{formattedDate}</p> */}
    </a>
  );
};

export default BusinessUpdateCard