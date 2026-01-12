# MPA Bootstrap: Overview

## Behavior

- Included from HTML (for example `index.html`).
- Always loads and initializes Splunk RUM.
- Conditionally loads and initializes Session Recorder when requested.

## Responsibilities

- RUM initialization:
  - Dynamically loads the RUM bundle.
  - Calls `SplunkRum.init` with app options (realm, access token, app name, environment).
- Configuration management:
  - Exposes a configuration object with required fields and common options.
  - Loads the Session Recorder script and calls `SplunkSessionRecorder.init` when enabled.
- Replay enablement:
  - Reads `Replay`/`replay` query params.
  - Persists enablement using `sessionStorage` key `splunk-session-replay-enabled`.
- Optional SPA hooks:
  - `window.enableReplayPersist()` to set the session flag and enable recorder.
  - `window.enableReplayNow()` to enable recorder immediately without a session flag.
