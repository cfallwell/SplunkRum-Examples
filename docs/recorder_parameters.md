# Recorder Parameters

URL-parameter editable (MPA + SPA):

- `replay=on|true` enables the recorder for the session.
- `canvas=true|false`, `video=true|false`, `iframes=true|false`, `cacheAssets=true|false`
- `assets=true|false` to toggle all `packAssets` entries.
- `assetsStyles=true|false`, `assetsFonts=true|false`, `assetsImages=true|false` for per-asset control.
- `backgroundServiceSrc=<url>` to set the background service worker URL.
  For more information on the background service worker, see:
  https://github.com/signalfx/splunk-otel-js-web/blob/main/packages/session-recorder/README.md#background-service-configuration

Not editable via URL (set in config for security):

- `maskAllInputs` (boolean, default `true`)
- `maskAllText` (boolean, default `true`)
- `maxExportIntervalMs` (number, default `5000`)
- `sensitivityRules` (array of rule objects)

Complete example (comma-separated params are supported):

```
https://app.company.com/?replay=on,canvas=true,video=true,iframes=true,assets=true,assetsStyles=true,assetsFonts=true,assetsImages=true,cacheAssets=true,backgroundServiceSrc=https%3A%2F%2Fexample.xyz%2Fbackground-service.html
```

Turn on full-text and input capture (this configuration should be made in the bootstraps):

```js
maskAllInputs: false,
maskAllText: false,
```

Add fine-grained masking/exclusion:

```js
sensitivityRules: [
  { rule: "unmask", selector: "p" },
  { rule: "exclude", selector: "img" },
  { rule: "mask", selector: ".user-class" }
],
```

For additional configuration options, see the Splunk documentation:
https://github.com/signalfx/splunk-otel-js-web/blob/main/packages/session-recorder/README.md
