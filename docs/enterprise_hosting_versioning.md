# Recommendations for Enterprise Hosting and Versioning

## Repo and versioning (platform teams own the repos and code)

- Create a dedicated repo, for example:
  - `platform-rum-bootstrap/`
  - `rumBootstrap.js`
  - `package.json` (optional)
  - `CHANGELOG.md`
  - `README.md`
- Maintain semantic versions; start with `0.1.0-beta`.
- Tag releases in Git:

```bash
git tag -a v0.1.0-beta -m "Initial shared Splunk RUM + Session Recorder bootstrap"
git push origin v0.1.0-beta
```

## Build and publish to Artifactory/CDN

CI pipeline (owned by platform team):

- On tag `vX.Y.Z`:
  - Optionally run lint/tests.
  - Optionally minify → `rumBootstrap.min.js`.
  - Publish artifacts to Artifactory (or internal object store):
    - `/rum-bootstrap/0.1.0-beta/rumBootstrap.js`
    - `/rum-bootstrap/0.1.0-beta/rumBootstrap.min.js`
    - `/rum-bootstrap/latest/rumBootstrap.js` (optional)
- Expose via CDN/edge URL, for example:
  - `https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.min.js`

Platform team controls:

- What version is published.
- When a version is promoted from beta to stable.
- What URL apps load from.
