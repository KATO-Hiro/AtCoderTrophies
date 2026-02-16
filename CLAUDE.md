# CLAUDE.md

AtCoderTrophies is a full-stack web application that generates SVG trophy badges based on AtCoder competitive programming statistics. Users embed these trophies in GitHub profiles.

- **Frontend**: Next.js (Node 22, pnpm) deployed on Vercel at `https://atcoder-trophies.vercel.app`
- **Backend**: FastAPI (Python 3.12, uv) deployed on Vercel at `https://atcoder-trophies-api.vercel.app`
- **Data source**: AtCoder Problems Statistics API (`https://kenkoooo.com/atcoder/atcoder-api/v3`)

Version management uses mise via `.tool-versions` (Node 22.19.0, pnpm 9.15.9, Python 3.12, uv 0.8.4).

## Commands

### Backend (`cd backend`)

```bash
make install    # Install dependencies via uv
make dev        # Run dev server at localhost:8000
make fmt        # Format with ruff
make lint       # Lint with ruff (auto-fix)
make check      # Type check with mypy
make test       # Run pytest with VCR cassettes
make coverage   # Run tests with coverage report
```

### Frontend (`cd frontend`)

```bash
pnpm install    # Install dependencies
pnpm dev        # Dev server at localhost:3000
pnpm build      # Production build
pnpm lint       # Biome linter check
pnpm lint:fix   # Auto-fix lint issues
pnpm format     # Biome formatter
pnpm check      # CI strict checks (biome check --write)
```

### Running a single backend test

```bash
cd backend
uv run pytest tests/test_main.py::test_function_name -v
```

## Architecture

### Data Flow

1. User requests `/api/v1/atcoder?username=X&...` (Next.js API route at `frontend/src/pages/api/v1/atcoder/index.ts`)
2. The API route calls the FastAPI backend endpoints
3. Backend (`backend/api/crud.py`) fetches from AtCoder Problems API with retry logic
4. Backend returns Pydantic-validated stats
5. Frontend renders stats as SVG via `TrophyFrame` component
6. Response cached: frontend SVG (1-day), backend API (2-hour)

### Backend (`backend/api/`)

- `main.py` — FastAPI app with endpoints: `/v1/ac_count/{user}`, `/v1/ac_count_by_lang/{user}`, `/v1/rated_point_sum/{user}`, `/v1/longest_streak/{user}`, `/v1/problems_stat_api/{user}`
- `schemas.py` — Pydantic v2 models for all API responses
- `crud.py` — Data fetching and transformation from the external API
- `services.py` — HTTP client with 5-retry exponential backoff (10s connect / 30s read timeout)
- `constants.py` — API base URL and endpoint builders
- `tests/` — pytest integration tests using VCR cassettes (cassettes in `tests/cassettes/`)

Backend deploys as a Vercel serverless function; `vercel.json` rewrites all routes to `/api/main`.

### Frontend (`frontend/src/`)

- `pages/api/v1/atcoder/index.ts` — Next.js API route: the SVG generation endpoint
- `pages/index.tsx` — Main UI for the trophy generator
- `components/TrophyFrame/` — SVG rendering orchestrator; instantiated in the API route
- `components/TrophyList/` — Grid layout of trophy badges
- `components/UserInfo/` — Processes raw API stats into trophy data
- `components/Trophy/` — ~69 individual trophy type components (one per language/achievement)
- `styles/background-themes.tsx` — 24+ color themes (monokai, dracula, nord, gruvbox, etc.)
- `constants/` — Product URLs, default values, supported languages, rank descriptions
- `utils/` — API clients, number formatting, string utilities

Path alias `~/*` maps to `frontend/src/*`.

### Code Quality

- **Backend**: ruff (format + lint), mypy with `disallow_untyped_defs`
- **Frontend**: Biome 2.x (100-char line width, 2-space indent); `useImportType` and `noUnusedVariables` are errors; `noExplicitAny` is a warning

### Testing

Backend tests use `pytest-recording` (VCR) to record/replay HTTP interactions. Cassettes record once and replay in CI. No frontend unit tests currently exist.
