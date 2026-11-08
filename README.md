# Kurzolut

Shows the Czech National Bank's daily exchange rates and converts Czech koruna to any listed currency.

**Live:** https://kurzolut.vercel.app

## Run it

You need Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev
```

## Test it

```sh
npm run test:ci
```

The end-to-end tests use Playwright and need a browser the first time:

```sh
npx playwright install chromium
npm run test:e2e
```

They call the real Czech National Bank, so an outage on its side can make them fail.

## How rates are fetched

The bank doesn't allow requests from other websites, so the app calls its own `/api/cnb`, which forwards to the bank. This is set up in `vite.config.ts` for local development and in `vercel.json` for production.
