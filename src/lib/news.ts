
import * as contentful from 'contentful';
import type { Entry } from 'contentful';
import type { NewsArticle } from '../types';
import { contentfulClient } from './contentful';

const parseContentfulNewsArticle = (entry: Entry<any>): NewsArticle => {
  const fields = entry.fields;
  const imageUrlAsset = fields.featuredImage as contentful.Asset;
  return {
    id: entry.sys.id,
    slug: fields.slug as string,
    title: fields.title as string,
    category: fields.category as 'Press Release' | 'Business Highlight',
    publicationDate: fields.publicationDate as string,
    summary: fields.summary as string,
    featuredImageUrl: imageUrlAsset?.fields?.file?.url ? `https:${imageUrlAsset.fields.file.url}` : '',
    content: fields.content,
  };
};

export const fetchAllNewsArticles = async (): Promise<NewsArticle[]> => {
  const response = await contentfulClient.getEntries({
    content_type: 'newsArticle',
    order: ['-fields.publicationDate'],
  });
  return response.items.map(parseContentfulNewsArticle);
};

export const fetchNewsArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
  const response = await contentfulClient.getEntries({
    content_type: 'newsArticle',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items.length > 0 ? parseContentfulNewsArticle(response.items[0]) : null;
};
