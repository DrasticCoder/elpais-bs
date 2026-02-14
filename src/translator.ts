// call translator api
//input: string[] spanish
//output:string[] eng

import axios from 'axios';

export default async function translator(titles: string[]): Promise<string[]> {
  console.log('translator is called');

  let translatedTitles: string[] = [];

  for (const title of titles) {
    try {
      // const encodedTxt = encodeURIComponent(title);

      const resp = await axios.get(
        'https://ftapi.pythonanywhere.com/translate',
        {
          params: {
            sl: 'es', //source
            dl: 'en', //destination
            text: title,
          },
        },
      );
      const translated = resp.data['destination-text'];
      translatedTitles.push(translated);
    } catch (err) {
      console.error('error translating title:', title, err);
      translatedTitles.push(title); //falllback
    }
  }

  return translatedTitles;
}
