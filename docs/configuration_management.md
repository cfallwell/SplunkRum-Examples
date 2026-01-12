# Configuration Management Without App Changes

## Environment-specific builds

Build one artifact per environment with baked-in config:

- `rumBootstrap.dev.js` (dev realm + dev token)
- `rumBootstrap.stg.js` (staging realm + token)
- `rumBootstrap.prod.js` (prod realm + token)

Publish to CDN:

- `https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.dev.min.js`
- `https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.stg.min.js`
- `https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.prod.min.js`

Example mapping:

- `app1-dev.company.com` → `rumBootstrap.dev.min.js`
- `app1.company.com` → `rumBootstrap.prod.min.js`

## Per-app sensitivity rules without repo access

Option 1: generate different `rumBootstrap.js` per app.

Option 2: build a central config endpoint and fetch overrides at runtime:

```js
const host = window.location.host;

fetch(`https://config.internal.company.com/rum/recorder-config?host=${encodeURIComponent(host)}`)
  .then((res) => res.json())
  .then((cfg) => {
    Object.assign(SESSION_RECORDER_OPTIONS, cfg);
    // then init as normal
  });
```
