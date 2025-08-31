#!/usr/bin/env bash
set -euo pipefail

# Update pip
python -m pip install --upgrade pip setuptools wheel

# Install uv
python -m pip install uv

# Install dependencies
uv sync
