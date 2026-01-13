# RumBootstrap Shopping SPA TS Demo

Example React SPA using the `/spa-npm` package.

## Run locally (Webpack)

From the repo root:

```bash
cd spa-npm
npm install
npm run build

cd ../spa-demo
npm install
npm install --save-dev @splunk/rum-build-plugins
npm run dev
```

Production build:

```bash
npm run build
```

## Source map uploads

When building with Webpack for production, set the org access token in CI so source maps can upload:

- `SPLUNK_ORG_ACCESS_TOKEN` (preferred) or `SPLUNK_ACCESS_TOKEN`

The webpack plugin uses `rum.config.ts` for `applicationName`/`realm` and `package.json` for the app version.

## Configuration

Edit `spa-demo/src/rum.config.ts` for realm/token/app/environment.

## Routes for testing

Includes extra routes (About/Support/Terms) and `/product/:id` to validate client-side route-change tracking.
