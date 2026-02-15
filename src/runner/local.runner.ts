import { createLocalDriver } from '../driver/local.driver';
import scraper from '../scraper/scraper';
import Article from '../types';
import translator from '../translator';
import analyser from '../utils/analyser';
import downloader from '../utils/downloader';
import getArticle from '../scraper/getArticle';
export async function runLocal() {
  const homepageDriver = await createLocalDriver();

  let articles: Article[];

  try {
    articles = await scraper(homepageDriver, 'https://elpais.com/');
  } finally {
    await homepageDriver.quit();
  }
  //parallel fetching articals
  // await Promise.all(
  //   articles.map(async (article) => {
  //     const driver = await createLocalDriver();
  //     try {
  //       await getArticle(driver, article);
  //     } finally {
  //       await driver.quit();
  //     }
  //   }),
  // );

  const spanishTitles = articles.map((a) => a.title);
  const engTitles = await translator(spanishTitles);
  const wordFreq = analyser(engTitles);
  await downloader(articles);

  console.log(spanishTitles);
  console.log(engTitles);
  console.log(wordFreq);
  console.log(articles);
}
