import { By, WebDriver, until } from 'selenium-webdriver';
import log from '../utils/logger';
import { KEYWORDS } from '../config/mapper';
import isMobile from './isMobile';

export default async function acceptCookies(
  driver: WebDriver,
  timeout: number = 10000,
): Promise<void> {
  try {
    //page fully loaded
    await driver.wait(async () => {
      const state = await driver.executeScript('return document.readyState');
      return state === 'complete';
    }, timeout);

    await driver.sleep(5000);

    const mobile = await isMobile(driver);

    if (mobile) {
    }
    const cookieEle = await driver.wait(
      until.elementLocated(By.css(KEYWORDS.COOKIE_BTN)),
      10000,
    );

    if (!cookieEle) {
      log('Error finding cookie btn', 'ERROR');
    }

    await cookieEle.click();
    log('cookies accepted');

  } catch (err) {
    log('error while handling cookies', 'DEBUG', err);
  }
}
