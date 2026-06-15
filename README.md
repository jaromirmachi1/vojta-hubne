# Vojta Hubne

React + TypeScript + styled-components — marketing homepage at `/` and Shopify e-shop integration.

## Shopify Hybrid

Marketing lives on Vercel. Catalog, product detail, cart, and checkout live on Shopify.

Current setup: **[docs/SHOPIFY-INTEGRATION.md](docs/SHOPIFY-INTEGRATION.md)**  
Horizon theme (product page files): **[docs/SHOPIFY-HORIZON-THEME.md](docs/SHOPIFY-HORIZON-THEME.md)**  
Match React navbar on Shopify: **[docs/SHOPIFY-HEADER-MATCH.md](docs/SHOPIFY-HEADER-MATCH.md)**  
Wide product page (image left): **[docs/SHOPIFY-PRODUCT-LAYOUT.md](docs/SHOPIFY-PRODUCT-LAYOUT.md)**  
DNS (vojtahubne.cz + shop): **[docs/DNS-SETUP.md](docs/DNS-SETUP.md)**  
Storefront token for homepage product data: **[docs/SHOPIFY-STEP-1.md](docs/SHOPIFY-STEP-1.md)**  
Env template: **`.env.example`**  
URL helpers: **`src/utils/shopify.ts`**

## Dev

```bash
npm install
npm run dev
```

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
