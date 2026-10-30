# Changpeng Troll Officer ($CTO) — Ethereum Meme Site

A complete static, responsive Phase 3 frontend. **Reference design**: https://www.ctorobin.lol/ (adapted hero, narrative, incident-source section, how-to-buy, footer). The reference's X post/signal area has been **replaced** with one approved newspaper and four **independent clipped story-photo assets**. No reference videos/charts have been copied. Black-and-white only.

## Deployment in minutes

1. Unzip the folder. Its entry page is `index.html`.
2. You can preview locally by opening `index.html`, or preferably run `python3 -m http.server 8080` in this directory and open `http://localhost:8080`.
3. Publish the contents of this directory to a static host such as GitHub Pages, Netlify, Cloudflare Pages or Vercel. No build commands, dependencies or API keys are required.
4. When the actual Ethereum contract and official social/trading links are verified, edit **`config.js`**. `ethereumContract` requires a 42-character `0x...` Ethereum address. Keep `buyUrl`, `chartUrl`, `xUrl` empty until official URLs exist. Do not publish a contract for any other chain.

## Included approved assets

The `assets/originals/` directory contains the exact originally approved files (untouched PNGs):

- `cto-logo-approved-v2.png` — approved CTO logo
- `cto-newspaper-approved.png` — **the only newspaper**; approved original
- `cto-clipped-photo-01-hacker-laptop.png`
- `cto-clipped-photo-02-open-vault.png`
- `cto-clipped-photo-03-yi-he-troll.png`
- `cto-clipped-photo-04-changpeng-troll.png`

Web-optimized `.webp` encodings of these approved originals are provided at the root of `assets/`. They retain the full uncropped standalone artwork; the original approved PNG files are kept byte-for-byte unchanged. `favicon.png` is a padded derivative of the approved standalone logo. No rejected imagery appears on the website.

## Site interactions

- Sticky desktop navigation and mobile navigation menu.
- Smooth scroll to About, the incident files, and How To Buy.
- Clicking any of the **five separate** images opens a high-resolution lightbox; Escape/backdrop/Close dismiss it.
- CA copy, Buy, chart and X/Community controls show informative Coming Soon feedback until verified values are supplied in `config.js`.
- Responsive desktop, tablet and phone layouts; accessible alt text, contrast, focus controls and reduced-motion support.

## Truth in advertising

$CTO is an independent, fictional parody, not endorsed or affiliated with CZ, Yi He, Binance, or Ethereum. Humor and purported dialogue in the approved illustrations are **not actual statements** by the people depicted. The site distinguishes the original incident announcement from the comedic story; it does **not** allege those individuals committed or authorized a hack. This token concept carries no promise of returns.

## Files

- `index.html`: entire page structure and copy
- `styles.css`: monochrome design, media queries, animations
- `script.js`: navigation, modal, toast and safe links
- `config.js`: Ethereum contract and links (all intentionally blank)
- `assets/`: approved images and their web encodings

No npm install required.
