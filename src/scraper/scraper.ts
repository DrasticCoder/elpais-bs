import { By, Key, until, WebDriver } from 'selenium-webdriver';
import Article from '../types';
import { KEYWORDS } from '../config/mapper';
import log from '../utils/logger';
import getArticle from './getArticle';
import { createLocalDriver } from '../driver/local.driver';
import { createBsDriver } from '../driver/bs.driver';
import { browserStackCaps } from '../config/browserStackCaps';
import { settings } from '../config/general';
import acceptCookies from './acceptCookies';
import isMobile from './isMobile';

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

  await acceptCookies(driver);

  const isSmallScreen: boolean = await isMobile(driver);

  if (isSmallScreen) {
    try {
      const hamburgerMenuEle = await driver.findElement(
        By.css(KEYWORDS.HAMBURGER_MENU_BTN),
      );
      await hamburgerMenuEle.click();
      log('hamburger menu clicked');

      const opinionEle = await driver.findElement(
        By.linkText(KEYWORDS.OPINION_BTN_TXT),
      );

      await driver.wait(until.elementIsVisible(opinionEle), 10000);
      await opinionEle.click();
      log('navigating to opinion page');
    } catch (error) {
      log('error finding opinion link for SMALL screen', 'DEBUG');
    }
  } else {
    //large screen

    // // Navigate to opinion
    // const opinionLink = await driver.findElement(By.css(KEYWORDS.OPINION_LINK)); //fallback
    // await opinionLink.click();
    const opinionLink = await driver.wait(
      until.elementLocated(By.css(KEYWORDS.OPINION_LINK)),
      10000,
    );

    await driver.wait(until.elementIsVisible(opinionLink));
    await opinionLink.click();
  }

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
