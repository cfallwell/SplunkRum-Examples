# SPA Integration Examples

## Install and initialize in a SPA and capture route changes as events

Recommend hosting the NPM package example in this repo in your company's package repository and calling it (for SPA apps that require route change awareness). See github workflow for example.

```bash
npm install @{yourcompany}/rumbootstrap
```

```tsx
import { SplunkRumProvider, RumRouterTracker } from "@{yourcompany}/rumbootstrap";

function App() {
  return (
    <SplunkRumProvider configOverride={rumConfig}>
      <RumRouterTracker />
      {/* your routes/components */}
    </SplunkRumProvider>
  );
}
```

## React Router: auto-enable when `?Replay=on`

```tsx
// ReplayParamWatcher.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ReplayParamWatcher() {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const value = params.get("Replay") ?? params.get("replay");
    if (!value) return;

    const v = value.toLowerCase();
    if (v === "on" || v === "true") {
      // Persist for the rest of the session and enable now
      window.enableReplayPersist?.();
    }
  }, [search]);

  return null;
}
```

In your app root:

```tsx
function App() {
  return (
    <>
      <ReplayParamWatcher />
      {/* your routes/components */}
    </>
  );
}
```

## Vue Router: `afterEach` hook

```js
// router.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [/* ... */];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  const replay = (to.query.Replay || to.query.replay || "").toString().toLowerCase();
  if (replay === "on" || replay === "true") {
    window.enableReplayPersist && window.enableReplayPersist();
  }
});

export default router;
```
