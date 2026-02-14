// TODO: cleaning & tokeniization
//input: string trasnlated titles
//return : word freq mapping

export default function analyser(title: string[]): Record<string, number> {
  console.log('analyser is called');

  const joinedTitles = title.join(' ').toLowerCase();
  const words = joinedTitles.replace(/[^\w\s]/g, '').split(/\s+/);

  const freq: Record<string, number> = {};

  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  const repeatWords: Record<string, number> = {};

  for (const [word, count] of Object.entries(freq)) {
    if (count > 2) {
      repeatWords[word] = count;
    }
  }

  return repeatWords;
}
