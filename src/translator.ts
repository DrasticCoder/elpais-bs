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

        if (resp.status != 200) {
          //use fallback transl api
          log('using fallback for translation');
          let resp = await axios.get(`https://lingva.ml/api/v1/es/en/${title}`);

          return resp.data['translation'];
        }

        return resp.data['destination-text'];
      } catch {
        return title;
      }
    }),
  );
}
