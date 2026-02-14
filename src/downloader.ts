import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import type Article from './types';

export default async function downloader(articles: Article[]) {
  //check dir exist& creates
  const imgDir = path.resolve(__dirname, '../images');
  await fs.mkdir(imgDir, { recursive: true });

  await Promise.all(
    articles
      .filter((a) => a.imgUrl)
      .map(async (article) => {
        const filename = `article-${article.id}.jpg`;
        const filepath = path.join(imgDir, filename);

        const resp = await axios.get(article.imgUrl!, {
          responseType: 'arraybuffer',
        });

        await fs.writeFile(filepath, resp.data);
      }),
  );
}
