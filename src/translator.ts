// call translator api
//input: string[] spanish
//output:string[] eng

import axios from 'axios';
import log from './utils/logger';

export default async function translator(titles: string[]): Promise<string[]> {
  log('translator is called');
  //todo:if need to translate frequenty then add delimit logic
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
