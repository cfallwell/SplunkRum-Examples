# Edge/Ingress Script Injection (No App Repo Changes)

## NGINX/Envoy/Ingress filter pattern

Inject the script tag before `</head>` or `</body>`:

```html
<script src="https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.min.js"></script>
```

Example (NGINX `sub_filter` style pseudo-config):

```nginx
# Only for HTML responses
sub_filter_types text/html;

# Only for selected host/app
server {
    server_name app1.company.com;

    # ... upstream/proxy_pass config ...

    sub_filter '</head>' '<script src="https://cdn.internal.company.com/rum-bootstrap/0.1.0-beta/rumBootstrap.min.js"></script></head>';
    sub_filter_once on;
}
```

Result: product teams do not touch HTML. Platform flips a config switch to enable RUM + Recorder per app.

## Per-app/per-env mapping without code access

Maintain a simple mapping in infra config that ties hostnames (and optionally environments) to a specific bootstrap version or build. This lets the platform team control exactly what each app loads without touching app repos.

Recommended approach:

- Treat the mapping as the single source of truth.
- Use it to generate edge/CDN injection rules per host.
- Pin versions per app so upgrades are deliberate and reversible.
- Include per-app tokens so each team has isolated data and access control.

```yaml
rum_onboarded_apps:
  - host: app1.company.com
    env: prod
    version: 0.1.0-beta
    rumAccessToken: "app1-token"
  - host: app2.company.com
    env: stg
    version: 0.2.0-beta
    rumAccessToken: "app2-token"
```

Use it to generate injection rules like:

```html
<script src="https://cdn.internal.company.com/rum-bootstrap/0.2.0-beta/rumBootstrap.min.js"></script>
```

Common patterns:

- Split by environment with separate hostnames (dev/stg/prod) mapped to different builds.
- Roll forward by updating the version for one host at a time.
- Roll back by reverting the version in the mapping (no app deploy needed).
- If tokens differ per app, either bake them into per-app builds or have the bootstrap fetch a token from a platform-owned config endpoint before init.

Example CI job that generates per-app scripts from the mapping:

```bash
# pseudo-CI step (bash + jq)
set -euo pipefail

CONFIG=rum_onboarded_apps.yaml
OUT_DIR=dist/rum-bootstrap
VERSION=0.2.0-beta

mkdir -p "$OUT_DIR"

# For each app/env, inject host-specific token into a template and publish.
yq -o=json ".rum_onboarded_apps[]" "$CONFIG" | jq -c '.' | while read -r app; do
  host=$(echo "$app" | jq -r '.host')
  env=$(echo "$app" | jq -r '.env')
  token=$(echo "$app" | jq -r '.rumAccessToken')

  out="$OUT_DIR/${host}/${env}/${VERSION}/rumBootstrap.min.js"
  mkdir -p "$(dirname "$out")"

  # Replace placeholders in a template; minify as needed.
  sed -e "s/__RUM_ACCESS_TOKEN__/${token}/g" \
      -e "s/__RUM_VERSION__/${VERSION}/g" \
      -e "s/__RUM_ENV__/${env}/g" \
      templates/rumBootstrap.template.js > "$out"
done
```

Injection layer then maps each host to its generated script URL:

```html
<script src="https://cdn.internal.company.com/rum-bootstrap/app1.company.com/prod/0.2.0-beta/rumBootstrap.min.js"></script>
```
