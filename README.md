# B'ris Royale

A luxury fragrance brand website — pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies beyond a Google Fonts import.

## Project Structure

```
bris-royale/
├── index.html        # Main entry point — all pages live here (SPA routing)
├── logo.png          # Brand logo (PNG)
├── css/
│   └── styles.css    # All styles
└── js/
    └── main.js       # All JavaScript
```

## Features

- **Single-page application** with animated page transitions (clip-path veil)
- **Custom cursor** with magnetic hover effects
- **Animated smoke canvas** on the hero (WebGL-free, uses Canvas 2D API)
- **Scroll-triggered reveal animations** via IntersectionObserver
- **Infinite marquee** text strip
- **Fragrance notes bar chart** (JS-generated)
- **Accordion** note descriptions
- **Size selector** & collection filters
- **Cart** with quantity controls
- **Parallax** hero on scroll
- Fully **responsive** down to mobile

## Running Locally

No build step needed. Just open `index.html` in a browser, or serve with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

## Pages

| Route (JS) | Description |
|---|---|
| `home` | Hero + featured grid + marquee + story |
| `product` | Full product detail — Nocturne d'Or |
| `collection` | Editorial grid of all six fragrances |
| `about` | Brand story (The Maison) |
| `cart` | Cart with order summary |

## Customisation

All design tokens live in `:root` inside `css/styles.css`. Key variables:

```css
--gold: #C6A15B;          /* Primary accent */
--brand: 'Barlow Condensed', sans-serif;
--body:  'Barlow', sans-serif;
--ease:  cubic-bezier(.25,.46,.45,.94);
--spring: cubic-bezier(.34,1.56,.64,1);
```

Fragrance colour palettes (`.v-amber`, `.v-noir`, `.v-rose`, etc.) are also in `styles.css` and easy to adjust.

## Licence

Design and code by B'ris Royale. All rights reserved.
