// selenium logic
//input :string website url
//return: Article[]

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import type Article from './types';
import { KEYWORDS } from './mapper';
import log from './utils/logger';

export default async function scraper(url: string): Promise<Article[]> {
  log(`scraperr is called: ${url}`);
  let articles: Article[] = [];

  //init sel driver
  const options = new chrome.Options();

  options.addArguments(
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1920,1080',
  );

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(url);

    //page load
    await driver.wait(until.titleContains(KEYWORDS.HOMEPAGE_TITTLE), 10000);
    const title = await driver.getTitle();
    log(`website loaded ${title}`);

    //accept cookies
    try {
      const accptBtn = await driver.findElements(By.css(KEYWORDS.COOKIE_BTN)); //not interactable

      if (accptBtn.length > 0) {
        await accptBtn[0].click();
        log('cookies accepted');
      } else {
        log('no cookie popup', 'DEBUG');
      }
    } catch (err) {
      log('error while handling cookies', 'DEBUG');
    }

    //search for optionn
    try {
      const optionLnk = await driver.findElement(By.css(KEYWORDS.OPINION_LINK));
      await optionLnk.click();

      await driver.wait(until.urlContains('opinion'), 10000);
      log('on opinion page');
    } catch (err) {
      log('error navigating to options page', 'ERROR', err);
    }

    //fetch articals
    let articleEles = await driver.findElements(By.css(KEYWORDS.ARTICLE));
    articleEles = articleEles.slice(0, 5);

    //fetch article links
    for (let i = 0; i < articleEles.length; i++) {
      const article = articleEles[i];

      const linkEle = await article.findElement(By.css(KEYWORDS.ARTICLE_LINK));
      const link = await linkEle.getAttribute('href');

      let articleObj: Article = {
        id: i + 1,
        title: '',
        content: '',
        link: link,
      };

      articles.push(articleObj);
    }

    //goto each link and extract img & content
    for (const article of articles) {
      if (!article.link) {
        //todo: scrap link again or throq error
        log(`missing link for id: ${article.id}`, 'WARN');
        continue;
      }

      await driver.get(article.link);

      //title
      const titleEle = await driver.wait(
        until.elementLocated(By.css('h1')),
        10000,
      );
      article.title = await titleEle.getText();
      log(`on article page - ${article.link!}`);

      //img
      try {
        const imgEle = await driver.findElement(By.css('figure img'));
        article.imgUrl = await imgEle.getAttribute('src');
      } catch {
        log(`image not found  for article ${article.id}`, 'ERROR');
      }

      // content
      try {
        const contentEle = await driver.findElements(
          By.css(KEYWORDS.ARTICLE_CONTENT),
        );

        if (contentEle.length == 0) {
          let contentEle = await driver.findElement(
            By.css(KEYWORDS.FALLBACK_CONTENT_SELECTOR),
          );
          let content = await contentEle.getText();
          article.content = content;
          log('using pattrn 2 for content extraction', 'DEBUG');
          continue;
        }

        for (const paragraph of contentEle) {
          const text = await paragraph.getText();
          if (text.trim()) {
            article.content += text + '\n';
          }
        }
      } catch (err) {
        log(
          `Error fetching article content for id ${article.id}`,
          'ERROR',
          err,
        );
      }
    }
  } finally {
    await driver.quit();
  }

  return articles;
}
