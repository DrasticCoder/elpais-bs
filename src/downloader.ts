import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function downloader(url: string, filename: string) {
  const imgDir = path.resolve(__dirname, '../images');

  //check dir exist& creates
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
  }

  const filepath = path.join(imgDir, filename);

  const resp = await axios.get(url, { responseType: 'arraybuffer' });

  fs.writeFileSync(filepath, resp.data);
  console.log('imgs saved');
}
