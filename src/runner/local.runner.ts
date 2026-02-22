import { createLocalDriver } from '../driver/local.driver';
import scraper from '../scraper/scraper';
import Article from '../types';
import translator from '../translator';
import analyser from '../utils/analyser';
import downloader from '../utils/downloader';
import getArticle from '../scraper/getArticle';
import { KEYWORDS } from '../config/mapper';
export async function runLocal() {
  const homepageDriver = await createLocalDriver();

  let articles: Article[];

  try {
    articles = await scraper(homepageDriver, KEYWORDS.BASE_WEBSITE);
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

  // await report(articles,spanishTitles,engTitles,wordFreq)

  console.log(
    '=========================[ REPORT starts ]=========================',
  );
  console.log(articles);
  console.log(
    '-------------------------[ Articles Titles ]-------------------------',
  );
  console.log(spanishTitles);
  console.log(
    '-------------------------[ Articles Titles:Translated ]-------------------------',
  );
  console.log(engTitles);
  console.log(
    '-------------------------[ Word Freq analysis ]-------------------------',
  );
  console.log(wordFreq);
  console.log(
    '=========================[ REPORT ends ]=========================',
  );
}
