// call translator api
//input: string[] spanish
//output:string[] eng

export default function translator(titles: string[]): string[] {
  console.log('translator is called');
  titles = titles.map((t) => t + ' translated');
  return titles;
}
