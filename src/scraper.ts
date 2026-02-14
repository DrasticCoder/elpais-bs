// selenium logic
//input :string website url
//return: Article[]

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import type Article from './types';
import { KEYWORDS } from './mapper';

export default async function scraper(url: string): Promise<Article[]> {
  console.log('scraperr is called', url);
  let articles: Article[] = [];

  //init sel driver
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get(url);

    //page load
    await driver.wait(until.titleContains(KEYWORDS.HOMEPAGE_TITTLE), 10000);
    const title = await driver.getTitle();
    console.log('website loaded', title);

    //accept cookies
    try {
      const accptBtn = await driver.wait(
        until.elementLocated(By.css(KEYWORDS.COOKIE_BTN)), //not interactable
        10000,
      );

      await driver.wait(until.elementIsVisible(accptBtn), 5000);
      await accptBtn.click();

      console.log('cookies accepted');
    } catch (err) {
      console.log('no cookie popup');
      if (err) console.error(err);
    }

    //search for optionn
    try {
      const optionLnk = await driver.findElement(By.css(KEYWORDS.OPINION_LINK));
      await driver.wait(until.elementIsVisible(optionLnk), 5000);
      optionLnk.click();
      await driver.wait(until.urlContains('opinion'), 10000);
      console.log('on opinion page');
    } catch (err) {
      console.error('error navigating to options page', err);
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
        console.warn('missing link for id', article.id);
        continue;
      }

      await driver.get(article.link);

      //title
      const titleEle = await driver.wait(
        until.elementLocated(By.css('h1')),
        10000,
      );
      article.title = await titleEle.getText();

      //img
      try {
        const imgEle = await driver.findElement(By.css('figure img'));
        article.imgUrl = await imgEle.getAttribute('src');
      } catch {
        console.log(`image not found  for article ${article.id}`);
      }

      // content
      try {
        const contentEle = await driver.findElements(
          By.css(KEYWORDS.ARTICLE_CONTENT),
        );

        if (contentEle.length == 0) {
          let contentEle = await driver.findElement(
            By.css(KEYWORDS.ARTICLE_CONTENT_2),
          );
          let content = await contentEle.getText();
          article.content = content;
          console.log('using pattrn 2 for content extraction');
          continue;
        }

        for (const paragraph of contentEle) {
          const text = await paragraph.getText();
          if (text.trim()) {
            article.content += text + '\n';
          }
        }
      } catch (err) {
        console.error(
          `Error fetching article content for id ${article.id}`,
          err,
        );
      }
    }
  } finally {
    await driver.quit();
  }

  return articles;
}
