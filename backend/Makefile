.PHONY: help check lint
.DEFAULT_GOAL := help

install: ## Install dependencies
	@uv sync --extra dev

freeze: ## Export dependencies to requirements.txt
	@uv pip freeze > requirements.txt

dev: ## Run server in local
	@uv run python api/main.py

fmt: ## Format Python code
	@uv run ruff format api/ tests/

check: ## Validate type hints
	@uv run mypy api/ tests/

lint: ## Lint Python code
	@uv run ruff check --fix api/ tests/
	@${MAKE} check

test: ## Run test
	@uv run pytest tests/

coverage: ## Run test with coverage
	@uv run pytest --cov=api/ --cov=tests/
