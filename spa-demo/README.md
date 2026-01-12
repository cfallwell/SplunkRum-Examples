# RumBootstrap Shopping SPA TS Demo

## Run

Place this repo next to the library:

```text
/workspace
  /rumbootstrap-lib
  /rumbootstrap-shopping-spa-ts-demo
```

Then:

```bash
cd rumbootstrap-lib
npm install
npm run build

cd ../rumbootstrap-shopping-spa-ts-demo
npm install
npm run dev
```

## Configuration

Edit `src/rum.config.ts` for realm/token/app/environment.


## Additional routes for RUM testing
This demo includes extra lorem pages (About/Support/Terms) and a product detail route `/product/:id` so you can validate client-side route-change tracking.
