# Plan: AGENTS.md導入 & CLAUDE.md簡素化

## Context

現在のCLAUDE.mdにはプロジェクト概要・コマンド・アーキテクチャ詳細がすべて含まれている。参照リポジトリ(AtCoderNoviSteps #3143)に倣い、AGENTS.md をメインの AI エージェント指示書とし、CLAUDE.md は参照+補足のみにする。ソースコードから自明な情報（Data Flow、ファイル役割）はカットし、ツール固有ルールは `.claude/rules/` に分離する。

## 変更ファイル

### 1. `AGENTS.md`（新規作成）

プロジェクト概要・技術スタック・コマンド一覧のみ。アーキテクチャ詳細は省略。

```markdown
# AGENTS.md

AtCoderTrophies — AtCoderの競技プログラミング統計からSVGトロフィーバッジを生成するWebアプリケーション。

## Tech Stack

- **Frontend**: Next.js (Node 22, pnpm) — Vercel にデプロイ
- **Backend**: FastAPI (Python 3.12, uv) — Vercel Serverless にデプロイ
- **Version management**: mise (`.tool-versions`)

## Commands

### Backend (`cd backend`)

make install / make dev / make fmt / make lint / make check / make test / make coverage

### Frontend (`cd frontend`)

pnpm install / pnpm dev / pnpm build / pnpm lint / pnpm lint:fix / pnpm format / pnpm check

### Single backend test

cd backend && uv run pytest tests/test_main.py::test_function_name -v
```

### 2. `CLAUDE.md`（書き換え）

AGENTS.md への参照 + Claude Code 固有の補足のみ。

```markdown
# CLAUDE.md

See [AGENTS.md](AGENTS.md) for project overview and commands.

Path-specific rules are in `.claude/rules/`.

## Before committing

- Backend: `cd backend && make fmt && make lint && make check`
- Frontend: `cd frontend && pnpm check`
```

### 3. `.claude/rules/backend.md`（新規作成）

Backend固有のコーディング規約・テストルール。

- ruff でフォーマット・リント、mypy で `disallow_untyped_defs`
- pytest + VCR cassettes（`tests/cassettes/`）でHTTPインタラクションを記録・再生
- cassettes は一度記録し、CI では再生のみ

### 4. `.claude/rules/frontend.md`（新規作成）

Frontend固有のコーディング規約。

- Biome 2.x（100文字行幅、2スペースインデント）
- `useImportType` と `noUnusedVariables` はエラー、`noExplicitAny` は警告
- パスエイリアス `~/*` → `src/*`

## 検証方法

1. `AGENTS.md` と `CLAUDE.md` の内容が正しいことを目視確認
2. `.claude/rules/` 以下のファイルが存在することを確認
3. 既存の CI（`.github/workflows/`）に影響がないことを確認（ドキュメントのみの変更のため影響なし）
