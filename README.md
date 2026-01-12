# splunk-rum-examples

This repo contains an NPM package for SPA apps, and Splunk RUM examples for both multi-page apps (MPA) and single-page apps (SPA) that enable on-demand session recording and control via url parameters.

## Goals

- Provide a single shared JS entry point for RUM + Session Recorder.
- Enable Session Recorder on demand per session and expose Session Recorder parameters as top-level config so teams can tune masking, rules, and features using url parameters
  - `?Replay=on` or `?Replay=true` enables recorder and persists for the current browser session.
- Avoid requiring application teams for deployment changes.
- Work for both SPAs and MPAs (React-specific hooks are optional).

## Documentation

| Document | Summary |
| --- | --- |
| [docs/deployment_overview.md](docs/deployment_overview.md) | High-level steps to choose integration type, configure RUM, and deploy. |
| [docs/recorder_parameters.md](docs/recorder_parameters.md) | URL-editable vs config-only recorder settings, plus examples. |
| [docs/common_url_controls.md](docs/common_url_controls.md) | Summary of shared URL toggles for MPA and SPA. |
| [docs/recommendations.md](docs/recommendations.md) | Best practices for loading, rollout, and validation. |
| [docs/mpa_bootstrap_overview.md](docs/mpa_bootstrap_overview.md) | Behavior and responsibilities of the MPA bootstrap script. |
| [docs/spa_mpa_no_code.md](docs/spa_mpa_no_code.md) | How to enable replay without app code changes for SPAs/MPAs. |
| [docs/spa_integration_examples.md](docs/spa_integration_examples.md) | SPA install and router integration examples. |
| [docs/enterprise_hosting_versioning.md](docs/enterprise_hosting_versioning.md) | Enterprise repo/versioning guidance and CDN publishing. |
| [docs/edge_ingress_script_injection.md](docs/edge_ingress_script_injection.md) | Edge/ingress injection patterns and per-app mapping. |
| [docs/configuration_management.md](docs/configuration_management.md) | Environment-specific builds and per-app config overrides. |
| [docs/alternate_no_code_options.md](docs/alternate_no_code_options.md) | Tag manager, shared layout, and extension alternatives. |
| [docs/where_you_need_code_access.md](docs/where_you_need_code_access.md) | Cases that still require app code changes. |
| [docs/repo_contents.md](docs/repo_contents.md) | What’s in the repo and where to look. |

## License

MIT
