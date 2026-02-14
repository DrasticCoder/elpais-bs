// call translator api
//input: string[] spanish
//output:string[] eng

import axios from 'axios';

export default async function translator(titles: string[]): Promise<string[]> {
  console.log('translator is called');

  return Promise.all(
    titles.map(async (title) => {
      try {
        const resp = await axios.get(
          'https://ftapi.pythonanywhere.com/translate',
          {
            params: { sl: 'es', dl: 'en', text: title },
          },
        );
        return resp.data['destination-text'];
      } catch {
        return title;
      }
    }),
  );
}
