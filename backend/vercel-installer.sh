#!/usr/bin/env bash
set -eux

# Install uv
pip install uv

# Install dependencies
uv sync
