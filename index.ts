//start selenium
//TODO: 1.call scrapper
//2. translator
//3. analyser
//end selenium

import scraper from './src/scraper';
import analyser from './src/analyser';
import translator from './src/translator';
import type Article from './src/types';

async function main() {
  const articles: Article[] = await scraper('https://elpais.com/');
  // console.log(articles);

  const spanishTitles = articles.map((a) => a.title);
  console.log(spanishTitles);
  console.log();
  const engTitles = await translator(spanishTitles);
  console.log(engTitles);

  //   const wordFreq = analyser(engTitles);
  //   console.log(wordFreq);
}

main().catch(console.error);
