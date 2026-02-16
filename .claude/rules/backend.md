---
globs: backend/**
---

# Backend Rules

- Format and lint with ruff; type check with mypy (`disallow_untyped_defs` enabled)
- Tests use pytest with VCR cassettes (`tests/cassettes/`) to record and replay HTTP interactions
- Cassettes are recorded once and replayed in CI
