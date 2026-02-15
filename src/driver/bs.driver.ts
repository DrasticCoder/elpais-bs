import { Builder } from 'selenium-webdriver';
import { settings } from '../config/general';

const USERNAME = process.env.BS_USERNAME!;
const ACCESS_KEY =process.env.BS_ACCESS_KEY;

export async function createBsDriver(capabilities: any) {
  const driver = new Builder()
    .usingServer(
      `https://${USERNAME}:${ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`,
    )
    .withCapabilities(capabilities)
    .build();

  await driver.manage().setTimeouts({
    implicit: settings.IMPLICIT_TIMEOUT,
    pageLoad: settings.PAGELOAD_TIMEOUT,
  });
  return driver;
}
