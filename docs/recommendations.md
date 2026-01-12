# Recommendations

- Load the bootstrapper early so it can capture the full session once recording is enabled.
- Use feature flags or runtime config to control when recording starts.
- In SPAs, hook routing events so navigation changes are reflected in session recordings.
- Validate in staging to confirm ingestion and playback quality.
