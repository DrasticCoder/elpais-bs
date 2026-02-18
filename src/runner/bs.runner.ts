import scraper from '../scraper/scraper';
import { createBsDriver } from '../driver/bs.driver';
import { browserStackCaps } from '../config/browserStackCaps';
import Article from '../types';
import translator from '../translator';
import analyser from '../utils/analyser';
import { KEYWORDS } from '../config/mapper';
export async function runBs() {
  await Promise.all(
    browserStackCaps.map(async (cap) => {
      const driver = await createBsDriver(cap);

      try {
        const articles: Article[] = await scraper(
          driver,
          KEYWORDS.BASE_WEBSITE,
        );

        const spanishTitles = articles.map((a) => a.title);
        const engTitles = await translator(spanishTitles);
        const wordFreq = analyser(engTitles);

        console.log(articles);
        console.log("----------------------_RESULTS")
        console.log(spanishTitles);
        console.log(engTitles);
        console.log(wordFreq);

        //mark passed
        await driver.executeScript(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Scraping completed successfully"}}',
        );
      } catch (err) {
        // mark failed
        await driver.executeScript(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Error during execution"}}',
        );

        throw err;
      } finally {
        await driver.quit();
      }
    }),
  );
}
