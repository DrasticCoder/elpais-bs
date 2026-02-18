export const KEYWORDS = {
  BASE_WEBSITE: 'https://elpais.com/',
  ARTICLE: 'article',
  ARTICLE_TITLE: 'h1',
  ARTICLE_TITLE_FALLBACK: 'article header h1',
  ARTICLE_IMG: 'header div figure img',
  ARTICLE_LINK: 'header h2 a',
  COOKIE_BTN: '#didomi-notice-agree-button',
  // COOKIE_BTN:  `button[id*="agree"],button[class*="agree"],button:contains("Aceptar")`
  OPINION_BTN_TXT: 'OPINIÓN',
  HAMBURGER_MENU_BTN: '#btn_open_hamburger',
  HOMEPAGE_TITTLE: 'EL PAÍS',
  OPINION_LINK: 'a[href*="opinion"]',
  ARTICLE_CONTENT: '[data-dtm-region="articulo_cuerpo"] p', //articulo_cuerpo means article body
  FALLBACK_CONTENT_SELECTOR: 'header h2:not(header > h2)', //get descendant h2 and not directchild
};
