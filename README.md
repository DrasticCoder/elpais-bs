# El País Scraper – Selenium <> BrowserStack

Uses Selenium (Node.js + TypeScript) to scrape articles from the Opinion section of El País, translate the titles to English, analyze repeated words, and run the solution across multiple browsers using BrowserStack.

---

## What This Script Does

1. Opens https://elpais.com (Spanish version)
2. Navigates to the **Opinion** section
3. Fetches the first 5 articles
4. Extracts:
   - Title (Spanish)
   - Article content
   - Cover image (if available)
5. Translates titles from Spanish → English using a public translation API [link](https://ftapi.pythonanywhere.com/)
6. Analyzes repeated words (more than 2 occurrences across titles)
7. Downloads article images locally (in local mode)
8. Runs across 5 parallel browser sessions on BrowserStack

---

## Tech Stack

- Node.js
- TypeScript
- Selenium WebDriver
- BrowserStack Automate
- Axios (API calls)
- dotenv

---

## Project Structure

- `scraper/` → scraping logic
- `driver/` → local & BrowserStack driver setup
- `runner/` → execution mode (local / bs)
- `utils/` → logger, analyser, downloader
- `translator.ts` → translation integration

---

## Setup

Clone the repository:

```

git clone https://github.com/DrasticCoder/elpais-bs
cd elpais-bs
npm install

```

Create a `.env` file:

```

BS_USERNAME=your_browserstack_username
BS_ACCESS_KEY=your_browserstack_access_key

```

---

## Run Locally

```

npm run local

```

This will:
- Run in headless Chrome
- Download article images
- Print Spanish titles
- Print translated titles
- Print repeated word frequency

---

## Run on BrowserStack (Parallel Execution)

```

npm run bs

```

This will:
- Start 5 parallel sessions
- Run across desktop & mobile browsers
- Mark session as passed/failed using BrowserStack executor API

Current configured browsers:
- Windows Chrome
- macOS Safari
- Windows Firefox
- iPhone 14
- Samsung Galaxy S23

Note: Some mobile/Firefox sessions may require additional stabilization due to cookie banner DOM differences.

---

## Cookie Handling

The script dynamically detects and accepts cookie banners by:
- Scanning visible buttons
- Matching keywords like "accept", "agree", "aceptar"
- Handling iframes (Didomi case)

---

## Notes

- Translation API used: https://ftapi.pythonanywhere.com/translate
- Headless mode enabled by default (configurable in `general.ts`)
- BrowserStack credentials are managed via environment variables

---

## Author

Deep Bansode [DrasticCoder]
