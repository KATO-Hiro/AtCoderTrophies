---
globs: frontend/**
---

# Frontend Rules

- Biome 2.x (100-char line width, 2-space indent)
- `useImportType` and `noUnusedVariables` are errors; `noExplicitAny` is a warning
- Path alias `~/*` maps to `src/*`
- Use the native `fetch` API for HTTP requests; do not add axios or similar libraries
- Always add `if (!response.ok) throw new Error(...)` after `fetch()`; unlike axios, fetch does not throw on 4xx/5xx
- Use `response.text()` for non-JSON responses (e.g. SVG, HTML); use `response.json()` only when the endpoint returns `application/json`. Unlike axios, fetch does not auto-detect Content-Type
