import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import safari from 'selenium-webdriver/safari';
import { settings } from '../config/general';
import { browserStackCaps } from '../config/browserStackCaps';

export async function createLocalDriver() {
  const options = new chrome.Options();
  // const options = new firefox.Options();
  // const options = new safari.Options();

  options.setMobileEmulation({
    deviceName: 'Galaxy S8',
  });

  if (settings.HEADLESS) {
    options.addArguments(
      // '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    );
  }

  const driver = new Builder()
    .forBrowser('chrome')
    // .setFirefoxOptions(options)
    // .setSafariOptions(options)
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({
    implicit: settings.IMPLICIT_TIMEOUT,
    pageLoad: settings.PAGELOAD_TIMEOUT,
    script: settings.SCRIPT_TIMEOUT,
  });

  return driver;
}
