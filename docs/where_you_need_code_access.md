# Where You Do Need Code Access

You only need repo access if you want:

- SPA router hooks for enabling replay based on internal route state.
- App code calling `window.enableReplayPersist()` from custom UI.
- Per-component data attributes that control masking/unmasking.

For the core use case, the combination of:

- Shared versioned `rumBootstrap.js`
- Central hosting (Artifactory/CDN)
- Edge/ingress/tag-manager injection

lets a central platform team solve RUM deployments end-to-end without involving app teams.
