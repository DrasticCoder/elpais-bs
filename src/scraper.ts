// selenium logic
//input :string website url
//return: Article[]
import type { Article } from './types';

const demoArticle = [{
    title: 'test title',
    content: 'temp',
  },
  {
    title: 'test',
    content: 'temp',
  },
  {
    title: 'test',
    content: 'temp',
  },
];

export default async function scraper(url: string): Promise<Article[]> {
  console.log('scraperr is called',url);
  
  return demoArticle;
}
