# Randall Brezina’s portfolio

React and Vite portfolio with a separate PC service quote page.

Run `npm install` if dependencies are missing, then `npm run dev` for a local preview. `npm run build` creates the production files in `dist`.

With the preview running, `node scripts/check.mjs` checks both pages and mocks all form submissions. `node scripts/shoot.mjs` captures desktop and mobile previews.

Copy lives in `src/data/data.js` and `src/data/quote-data.js`. Shared colours and typography live in `src/styles/tokens.css`. Keep metadata in `index.html`, `quote.html`, and `public/llms.txt` aligned when changing public details.

See [SITE-REVIEW.md](SITE-REVIEW.md) for the redesign audit and the personal details needed to finish the copy.
