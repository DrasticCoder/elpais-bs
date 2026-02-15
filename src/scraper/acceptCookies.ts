import { By, WebDriver, until } from 'selenium-webdriver';
import log from '../utils/logger';

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

    await driver.sleep(2000);

    //main dom
    const clickedMain = await tryClickCookie(driver);
    if (clickedMain) {
      log('cookies accepted (main DOM)');
      return;
    }

    // fallback iframes for-didomi
    const iframes = await driver.findElements(By.css('iframe'));
    for (const frame of iframes) {
      try {
        await driver.switchTo().frame(frame);

        const clickedFrame = await tryClickCookie(driver);
        if (clickedFrame) {
          log('cookies accepted (iframe)');
          await driver.switchTo().defaultContent();
          return;
        }

        await driver.switchTo().defaultContent();
      } catch {
        await driver.switchTo().defaultContent();
      }
    }

    log('cookie popup not found', 'DEBUG');
  } catch (err) {
    log('error while handling cookies', 'DEBUG', err);
  }
}

 // click cookie button js
async function tryClickCookie(driver: WebDriver): Promise<boolean> {
  return (await driver.executeScript(() => {
    const normalize = (str: string | null) => str?.toLowerCase().trim() ?? '';

    const elements = Array.from(
      document.querySelectorAll('button, a, div'),
    ) as HTMLElement[];

    const agreeBtn = elements.find((el) => {
      const id = normalize(el.id);
      const className = normalize(el.className);
      const text = normalize(el.textContent);

      return (
        id.includes('agree') ||
        id.includes('accept') ||
        id.includes('didomi') ||
        className.includes('agree') ||
        className.includes('accept') ||
        text.includes('aceptar') ||
        text.includes('accept') ||
        text.includes('agree')
      );
    });

    if (agreeBtn) {
      agreeBtn.click();
      return true;
    }

    return false;
  })) as boolean;
}
