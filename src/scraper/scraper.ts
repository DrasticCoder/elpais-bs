import { By, until, WebDriver } from 'selenium-webdriver';
import Article from '../types';
import { KEYWORDS } from '../config/mapper';
import log from '../utils/logger';
import getArticle from './getArticle';
import { createLocalDriver } from '../driver/local.driver';
import { createBsDriver } from '../driver/bs.driver';
import { browserStackCaps } from '../config/browserStackCaps';
import { settings } from '../config/general';
import acceptCookies from './acceptCookies';

export default async function scraper(
  driver: WebDriver,
  url: string,
): Promise<Article[]> {
  log(`scraper is called: ${url}`);
  const articles: Article[] = [];

  await driver.get(url);

  await driver.wait(async () => {
    const readyState = await driver.executeScript('return document.readyState');
    return readyState === 'complete';
  }, 10000);

  await driver.wait(until.titleContains(KEYWORDS.HOMEPAGE_TITTLE), 10000);
  log(`website loaded ${await driver.getTitle()}`);

  // //Handle cookies
  // try {
  // const buttons = await driver.findElements(By.linkText(KEYWORDS.COOKIE_BTN));//fallback
  // const buttons = await driver.findElements(By.css(KEYWORDS.COOKIE_BTN));
  //   if (buttons.length > 0) {
  //     await buttons[0].click();
  //     log('cookies accepted');
  //   } else {
  //     log('no cookie popup', 'DEBUG');
  //   }
  // } catch {
  //   log('error while handling cookies', 'DEBUG');
  // }

  await acceptCookies(driver);

  // // Navigate to opinion
  // const opinionLink = await driver.findElement(By.css(KEYWORDS.OPINION_LINK)); //fallback
  // await opinionLink.click();
  const opinionLink = await driver.wait(
    until.elementLocated(By.css(KEYWORDS.OPINION_LINK)),
    10000,
  );

  await driver.executeScript('arguments[0].scrollIntoView(true);', opinionLink);
  await driver.wait(until.elementIsVisible(opinionLink), 5000);
  await driver.executeScript('arguments[0].click();', opinionLink);
  await driver.wait(until.urlContains('opinion'), 10000);
  log('on opinion page');

  // Fetch article links
  let articleEles = await driver.findElements(By.css(KEYWORDS.ARTICLE));
  articleEles = articleEles.slice(0, 5);

  for (let i = 0; i < articleEles.length; i++) {
    const linkEle = await articleEles[i].findElement(
      By.css(KEYWORDS.ARTICLE_LINK),
    );

    const link = await linkEle.getAttribute('href');

    articles.push({
      id: i + 1,
      title: '',
      content: '',
      link,
    });
  }

  // //todo:make fetching paralleel
  for (const article of articles) {
    await getArticle(driver, article);
  }

  ////parallel
  // await Promise.all(
  //   articles.map(async (article) => {
  //     let articleDriver;
  //     if (settings.MODE == 'bs') {
  //       articleDriver = await createBsDriver(browserStackCaps);
  //     } else {
  //       articleDriver = await createLocalDriver();
  //     }

  //     try {
  //       await getArticle(articleDriver, article);
  //     } finally {
  //       await articleDriver.quit();
  //     }
  //   }),
  // );

  return articles;
}
