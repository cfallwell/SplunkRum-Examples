# SPA and MPA Usage Without App Code Changes

## SPAs (Single Page Apps)

- Base `rumBootstrap.js` behavior works even without touching the SPA repo.
- On initial load:
  - Script is injected at the edge.
  - RUM is initialized.
  - `?Replay=on` sets `sessionStorage['splunk-session-replay-enabled'] = 'on'`.
  - Session Recorder is enabled for that browser session.
- SPA route changes do not require repo code changes as long as you can start with `?Replay=on`.
- You can use the MPA script in SPAs, but it is a baseline bootstrap only:
  - No router-aware tracking or SPA-specific helpers from the NPM package.
  - Replay enablement is limited to the URL/session logic and the optional global hooks.
  - No typed config override or React context helpers.

Example flow:

- `https://app.company.com/?Replay=on` → user navigates around → sessions are recorded.

## MPAs (Multi-Page Apps)

Every HTML page served by that host includes:

```html
<script src="https://cdn.company.com/rum-bootstrap/0.1.0/rumBootstrap.min.js"></script>
```

If the user starts with `?Replay=on`:

- `sessionStorage` flag is set for that tab.
- Every subsequent page load in the same tab will re-enable Session Recorder.
- No app code involved, just platform-side injection.

Caveats:

- New tab/window is a new session (no `sessionStorage`).
