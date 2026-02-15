import { By, until, type WebDriver } from 'selenium-webdriver';
import type Article from '../types';
import { KEYWORDS } from '../config/mapper';
import log from '../utils/logger';
import acceptCookies from './acceptCookies';

export default async function getArticle(
  driver: WebDriver,
  article: Article,
): Promise<void> {
  if (!article.link) {
    log(`missing link for article id ${article.id}`, 'WARN');
    return;
  }

  try {
    await driver.get(article.link);

    await driver.wait(async () => {
      const readyState = await driver.executeScript(
        'return document.readyState',
      );
      return readyState === 'complete';
    }, 10000);

    // await acceptCookies(driver);

    let titleText = '';

    try {
      const titleEle = await driver.wait(
        until.elementLocated(By.css('h1')),
        15000,
      );

      await driver.wait(until.elementIsVisible(titleEle), 10000);
      titleText = await titleEle.getText();
    } catch {
      log(`fallback title selector used for article ${article.id}`, 'DEBUG');
      const altTitle = await driver.findElement(By.css('title'));
      titleText = await altTitle.getAttribute('textContent');
    }

    article.title = titleText;

    //image
    try {
      const imgEle = await driver.findElement(By.css('figure img'));
      article.imgUrl = await imgEle.getAttribute('src');
    } catch {
      log(`image not found for article ${article.id}`, 'DEBUG');
    }

    // content
    try {
      const contentElements = await driver.findElements(
        By.css(KEYWORDS.ARTICLE_CONTENT),
      );

      if (contentElements.length === 0) {
        const fallback = await driver.findElement(
          By.css(KEYWORDS.FALLBACK_CONTENT_SELECTOR),
        );

        article.content = await fallback.getText();
        log('using fallback content selector', 'DEBUG');
        return;
      }

      let content = '';

      for (const paragraph of contentElements) {
        const text = await paragraph.getText();
        if (text.trim()) {
          content += text + '\n';
        }
      }

      article.content = content;
    } catch (err) {
      log(
        `error extracting content for article id ${article.id}`,
        'ERROR',
        err,
      );
    }
  } catch (err) {
    log(`error processing article id ${article.id}`, 'ERROR', err);
  }
}
