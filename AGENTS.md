# AGENTS.md

AtCoderTrophies — A web application that generates SVG trophy badges based on AtCoder competitive programming statistics.

## Tech Stack

- **Frontend**: Next.js (Node 22, pnpm) — deployed on Vercel
- **Backend**: FastAPI (Python 3.12, uv) — deployed on Vercel Serverless
- **Version management**: mise (`.tool-versions`)

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
pnpm check      # CI strict checks
```

### Single backend test

```bash
cd backend && uv run pytest tests/test_main.py::test_function_name -v
```
