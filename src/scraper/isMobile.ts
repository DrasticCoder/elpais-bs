import { By, WebDriver } from 'selenium-webdriver';
import log from '../utils/logger';
import { KEYWORDS } from '../config/mapper';

export default async function isMobile(driver: WebDriver): Promise<boolean> {
  let isMobile = false;

  //get device size
  const width = (await driver.executeScript(
    'return window.innerWidth',
  )) as number;

  log(`viewport width: ${width}`);

  const hamburgerEle = await driver.findElement(
    By.css(KEYWORDS.HAMBURGER_MENU_BTN),
  );
  let isHamburgerVisible = await hamburgerEle.isDisplayed();

  //todo:conditions - hamburger exist n visible, viewport/innerhtml
  if (isHamburgerVisible && width < 768) isMobile = true;

  return isMobile;
}
