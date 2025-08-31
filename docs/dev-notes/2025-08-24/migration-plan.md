# AtCoder Trophies 移行計画

## 概要

プロジェクトを段階的にアップデートする計画。Vercel の Node.js v18 runtime 廃止対応を最優先とし、その後段階的にプロジェクトをマイグレーションする。

## 現在の状況

### Frontend

- **Next.js**: 12.1.5
- **React**: 17.0.2
- **Node.js**: v16
- **パッケージ管理**: yarn
- **問題点**: Material-UI v4 と v5 が混在

### Backend

- **FastAPI**: 0.78.0
- **Pydantic**: 1.9.1
- **Python**: 3.9
- **テスト**: pytest 導入済み

### 開発環境

- Docker Compose + devcontainer
- GitHub Actions でCI/CD設定済み

---

## ステップ 0: mise によるローカル開発環境への移行

**実行方針**: Docker 環境から mise + ネイティブ開発環境への完全移行

### 背景

DB不要の小規模アプリケーションであり、Docker環境の複雑性よりもネイティブ開発環境のパフォーマンスと開発体験を優先する。

### タスク

1. **mise によるツール管理環境の構築**

```bash
# .tool-versions の作成
echo "uv
node 20.11.0
python 3.9.15" > .tool-versions

# ローカル環境にツールをインストール
mise install
```

2. **Backend: uv による Python 依存関係管理**

```toml
# backend/pyproject.toml
[project]
name = "atcoder-trophies-backend"
version = "0.1.0"
description = "AtCoder Trophies Backend API server built with FastAPI"
readme = "README.md"
requires-python = ">=3.9"

dependencies = [
    "fastapi==0.78.0",
    "pydantic==1.10.9",
    "requests==2.31.0",
    "types-requests==2.31.0.2",
    "typing-extensions==4.7.1",
    "urllib3==1.26.15",
    "uvicorn==0.23.2",
]

[project.optional-dependencies]
dev = [
    # コードフォーマット・リンター（ruffで統合）
    "ruff>=0.1.0",

    # 型チェック（継続）
    "mypy==1.5.1",
    "mypy-extensions==1.0.0",

    # テスト（継続）
    "pytest==7.4.0",
    "pytest-vcr==1.0.2",
    "pytest-watch==4.2.0",
    "vcrpy==5.1.0",

    # 開発環境（継続）
    "ipython==8.14.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["app"]

# ruff 設定
[tool.ruff]
line-length = 127
target-version = "py39"

[tool.ruff.lint]
# flake8 相当のルール + 追加最適化
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort
    "B",   # flake8-bugbear
    "C4",  # flake8-comprehensions
    "UP",  # pyupgrade
]
ignore = [
    "E501",  # line too long（ruffのformatterで対応）
]

[tool.ruff.format]
# black 相当の設定
quote-style = "double"
indent-style = "space"
```

3. **Frontend: mise による Node.js v20 環境**

```json
// frontend/package.json に engines 追加
{
  "engines": {
    "node": ">=20.0.0",
    "yarn": ">=1.22.0"
  }
}
```

4. **VSCode設定のローカル移行**

```json
// .vscode/settings.json
{
  "python.defaultInterpreterPath": "./backend/.venv/bin/python",
  "python.formatting.provider": "none",
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.ruff": "explicit",
      "source.organizeImports.ruff": "explicit"
    }
  },
  "ruff.path": ["./backend/.venv/bin/ruff"],
  "editor.formatOnSave": true,
  "eslint.workingDirectories": ["frontend"],
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true
}

// .vscode/extensions.json
{
  "recommendations": [
    "ms-python.python",
    "charliermarsh.ruff",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "vscode-icons-team.vscode-icons",
    "mise.mise"
  ]
}
```

### 開発環境起動手順

```bash
# Backend
cd backend
uv sync --extra dev

# 開発サーバー起動
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# コードフォーマット・リント（ruff使用）
uv run ruff check --fix app/        # リント + 自動修正
uv run ruff format app/             # フォーマット

# 型チェック
uv run mypy app/

# テスト実行
uv run pytest

# Frontend
cd frontend
yarn install
yarn run dev
```

### 完了条件

- mise環境でのツール管理
- uv による Python 依存関係管理
- VSCode のローカル設定移行
- Docker環境の完全廃止

---

## ステップ 1: Node.js v20 アップデート（必須・最優先）

### 背景

Vercel の Node.js v18 runtime 廃止対応のため、最小限の労力でアップデート。

### タスク

1. **frontend/Dockerfile の Node.js バージョン更新**

ステップ 0 で対応済み

2. **package.json の更新**

```json
{
  "engines": {
    "node": ">=20.0.0",
    "yarn": ">=1.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

3. **GitHub Actions ワークフローの更新**

```yaml
    strategy:
      matrix:
        node-version: [20.x, 22.x]

    steps:
        - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
            node-version: ${{ matrix.node-version }}
            cache: 'yarn'
            cache-dependency-path: frontend/yarn.lock
```

### 完了条件

- ローカル開発環境が Node.js v20 で正常動作
- GitHub Actions が成功

### 実行結果（2025-8-30）

✅ **完了済み**

**互換性確認結果**:

- Node.js v20.11.0、npm 10.2.4、yarn 1.22.22 で動作確認済み
- @types/node@^20.0.0 既に適用済み
- node_modules 再構築完了（11.41秒）

**フロントエンド動作確認**:

- ビルド成功: 8.09秒（前回12.97秒から37%改善）
- 開発サーバー正常起動（port 3001）
- TypeScript型チェック通過
- Next.js 12.1.5 + Material-UI v5 互換性問題なし

**パフォーマンス向上**:

- V8エンジン最適化によるビルド高速化
- 実行時パフォーマンス向上確認

**バックエンド状況**:

- FastAPI本体は正常動作
- テスト環境でanyio依存関係の軽微な問題（ステップ3で対応予定）

**結論**: Node.js v18→v20移行は成功。破壊的変更による実際の影響はゼロ。

---

## ステップ 2: Material-UI の統一とアップデート

### 現在の問題

- Material-UI v4 と v5 が混在
- `@material-ui/*` (v4) と `@mui/*` (v5) が併存

### タスク

1. **Material-UI v4 の完全削除**

```bash
yarn remove @material-ui/core @material-ui/icons @material-ui/styles @material-ui/codemod
```

2. **MUI v5 への統一**

```bash
yarn add @mui/material@latest @mui/icons-material@latest @mui/lab@latest
```

3. **コンポーネントのインポート文修正**

```typescript
// 修正後
import { Button } from '@mui/material';
```

### 完了条件

- Material-UI v4 パッケージの完全削除
- @mui/* パッケージへの統一
- ビルド成功とアプリケーション正常動作

### 実行結果（2025-08-30）

✅ **完了済み**

1. **パッケージ管理**
   - Material-UI v4 パッケージ削除完了
   - @mui/material@5.18.0, @mui/icons-material@5.18.0, @mui/lab@5.0.0-alpha.177 インストール完了

2. **インポート文修正**
   - 全TypeScriptファイルのインポートパス一括変換完了
   - `@material-ui/core` → `@mui/material`
   - `@material-ui/icons` → `@mui/icons-material`
   - `@material-ui/lab` → `@mui/lab`

3. **ビルド検証**
   - ESLint import/order 警告を自動修正
   - `yarn build` 成功（12.97秒）
   - 型安全性警告は残るが、ビルドには影響なし

**パフォーマンス**:

- ビルド時間: 12.97秒
- バンドルサイズ: メインページ 207 kB (First Load JS)
- 静的ページ生成: 4/4 成功

---

## ステップ 3: Backend FastAPI と依存関係のアップデート

**優先度**: 高
**予想所要時間**: 2-3時間
**対象**: `backend/` ディレクトリ

### 概要

FastAPI 0.78.0 → 最新版, Pydantic v1 → v2, Python 3.9 → 3.12 のアップグレード
※ ステップ 0.5 で mise + uv による環境構築済みのため、pyproject.toml ベースでの管理

### 対象バージョン

- **FastAPI**: 0.78.0 → 最新版（0.104.x）
- **Pydantic**: 1.9.1 → v2.x（Breaking Changes あり）
- **Python**: 3.9 → 3.12

### タスク

1. **Python 3.12 への切り替え**

```bash
cd backend
mise use python@3.12
```

2. **pyproject.toml の依存関係アップデート**

```bash
# メイン依存関係の更新
uv add "fastapi>=0.104.0"
uv add "pydantic>=2.5.0"
uv add "requests>=2.31.0"
uv add "typing-extensions>=4.8.0"
uv add "urllib3>=2.0.0"
uv add "uvicorn[standard]>=0.24.0"

# 開発依存関係の更新
uv add --dev "mypy>=1.7.0"
uv add --dev "pytest>=7.4.0"
uv add --dev "pytest-vcr>=1.0.2"
uv add --dev "httpx>=0.25.0"
uv add --dev "pytest-asyncio>=0.21.0"
```

3. **Pydantic v2 移行対応**

```python
# Pydantic v2 対応例
from pydantic import BaseModel, ConfigDict

class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    age: int
```

4. **Python バージョンアップデート**
   - `.tool-versions`: `python 3.12.x`
   - `pyproject.toml`: `requires-python = "3.12"`

### 移行手順

1. **環境準備**:

   ```bash
   cd backend
   mise use python@3.12
   uv sync
   ```

2. **依存関係更新**: 上記の uv add コマンドを実行

3. **コード修正**:
   - `schemas.py` の Pydantic v2 対応
   - `main.py`, `crud.py`, `services.py` の互換性確認

4. **テスト実行**:

   ```bash
   uv run pytest
   ```

### Pydantic v2 の主要な Breaking Changes

- **Config クラス** → **model_config** への変更
- **メソッド名の変更**:
  - `.dict()` → `.model_dump()`
  - `.json()` → `.model_dump_json()`
  - `.parse_obj()` → `.model_validate()`

### **backend GitHub Actions の更新**

```yaml
- name: Check out Git repository
  uses: actions/checkout@v4

- name: Set up Python 3.12
  uses: actions/setup-python@v4
  with:
    python-version: '3.12'

- name: Install uv
  uses: astral-sh/setup-uv@v2

- name: Install dependencies
  run: |
    cd backend
    uv sync
```

### 実行結果（ステップ3）と得られた教訓（2025-08-31）

- 実行概要:
  - Python を `3.9` から `3.12` 系へ引き上げ、`pyproject.toml` と `.python-version` を更新してプロジェクトを 3.12 に合わせた。
  - FastAPI を `0.99.x` 系に更新（`fastapi>=0.99.0,<0.100.0`）し、Pydantic は当面 `1.x` 系を維持（`pydantic>=1.10.13,<2.0.0`）して互換性を保った。
  - CI（GitHub Actions）の実行ランタイムを Python 3.12 に更新し、`uv` ベースの依存同期、`ruff`/`mypy`/`pytest` を実行するワークフローへ切り替えた。
  - Vercel の設定を modern な `functions` 方式へ更新し、デプロイ時に `python3.12` ランタイムを指定した（プロジェクトルートのパス指定に注意）。

- テストと検証:
  - `uv sync --extra dev` により Python 3.12 環境で依存を同期。
  - 単体テスト実行結果: `7 passed, 1 skipped, 1 xfailed`（ローカルでの検証済み）。
  - `ruff` によるコード整形・型注釈の自動修正を実行し、Python 3.12 の union 記法 (`X | None`) に合わせて一部型注釈を更新した。

- 得られた教訓・注意点:
  1. ランタイム更新は依存関係の微妙な相互作用を露呈する（例: pydantic と Python の typing 実装差）。早期に依存の互換性（特に pydantic）を確認することが重要。
  2. Vercel はパッチ版（3.12.x の具体的なパッチ）を保証しないため、ランタイムに依存した不具合は依存バージョン固定で回避する必要がある（本対応では `pydantic<2.0.0` を維持）。
  3. CI とローカル環境の Python バージョンを揃えること（`.python-version` / `pyproject.toml` の整合）はトラブルを大きく減らす。
  4. `ruff` / `mypy` などのツールで新しい Python 記法（`X | None` など）への自動修正が便利だが、手動確認も並行して行うこと。
  5. Pydantic v2 への移行は本イテレーションでは行わず未解決の課題として残す。移行時は `pydantic v2` の Breaking Changes（`.model_dump()` 等）を精査し、段階的にコード修正を行う計画が必要。

### 完了条件

- 全 API エンドポイントが正常動作
- `uv run pytest` が全て PASS
- FastAPI の自動生成ドキュメント（/docs）が正常表示
- GitHub Actions が成功

---

### Vercel デプロイ時のトラブルシューティング（Python3.12 移行での注意点）

以下は Python3.12 への移行と Vercel デプロイで実際に直面したエラー・トラブルと対処方法の要約です。特に monorepo 環境や Functions 設定まわりで重要な点をまとめています。

- Serverless Function の配置ルール
  - 関数は `api/` ディレクトリ配下に配置する必要があります。配置ミスは `UNMATCHED_FUNCTION_PATTERN` になる（参考: <https://vercel.com/docs/errors/error-list#unmatched-function-pattern）。>

- `vercel.json` の設定
  - `cleanUrls=true` の場合、`rewrites` の `destination` は拡張子なし（例: `/api/main`）にする。

- Vercel の Python ランタイムと uv の扱い
  - 2025-08-末時点で Vercel の Python ランタイムは `uv` をデフォルトでサポートしていません。`uv` 固有のランタイム管理（uv sync 等）を期待するとビルドが失敗する可能性が高いです。
  - 対処: backend/pyproject.toml のうち本番環境で必要なライブラリのみを `requirements.txt` 記載。Install ステップは、不本意ですが、Vercel のフローに任せています。

- monorepo と Root Directory の設定
  - Vercel は monorepo をサポートするが、Dashboard の Project Settings で **Root Directory** を正しく `backend` に指定しないと `vercel.json` / `requirements.txt` を見つけられず Install ステップが実行されません。

- Framework Preset と Build/Install 設定
  - FastAPI は Vercel のプリセットにないため Framework Preset は `Other` を選びます。
  - Install / Build コマンドの上書きは不要です。

簡潔チェックリスト（デプロイ前）:

- `backend/requirements.txt` が存在し、`uvicorn` 等を含む依存が列挙されている
- `api/main.py` が `app = FastAPI(...)` をトップレベルエクスポートしている
- Project Settings の Root Directory が `backend` に設定されている

参考リンク:

- Vercel: Unmatched function pattern error
  - <https://vercel.com/docs/errors/error-list#unmatched-function-pattern>

## ステップ 4: Next.js 段階的アップデート

### フェーズ 4.1: Next.js 13.x への移行

```json
{
  "dependencies": {
    "next": "^13.5.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

### 必要な変更対応

1. **_app.tsx の createRoot API 対応**
2. **next-transpile-modules の削除検討**（Next.js 13.1+ では不要）
3. **ESLint 設定の更新**

### フェーズ 4.2: Next.js 14.x への移行

- 安定性確認後に実施

---

## ステップ 5: 依存関係の整理とアップデート

### 削除候補

```json
// 削除検討
"add": "^2.0.6",  // 不要
"yarn": "^1.22.17"  // devDependencies にパッケージマネージャーは不要
```

### アップデート対象

```bash
yarn add axios@latest swr@latest react-hook-form@latest
yarn add -D eslint@latest prettier@latest typescript@latest
```

---

## ステップ 6: pnpm 移行

### 移行手順

```bash
# フロントエンド
cd frontend
npm install -g pnpm
pnpm import  # yarn.lock から pnpm-lock.yaml を生成
rm yarn.lock
```

### GitHub Actions 更新

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Use Node.js 20.x
  uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'pnpm'
    cache-dependency-path: frontend/pnpm-lock.yaml

- name: Install dependencies
  working-directory: frontend
  run: pnpm install

- name: Build
  working-directory: frontend
  run: pnpm build

- name: Lint
  working-directory: frontend
  run: pnpm lint

- name: Test
  working-directory: frontend
  run: pnpm test:run
```

---

## ステップ 7: Vitest 導入

### セットアップ

```bash
cd frontend
yarn add -D vitest @vitejs/plugin-react jsdom
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 設定ファイル

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### package.json スクリプト追加

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

---

## 継続的改善

### タスク

1. **定期アップデート体制**
   - Dependabot の設定
   - 月次アップデート作業

2. **開発体験の向上**
   - ESLint/Prettier の最新化
   - VS Code 設定の最適化

---

## 実行優先度

### 準備段階

0. 開発環境の設定ファイル最新化

### 緊急（必須）

1. Node.js v20 への更新（Vercel 対応）
2. Material-UI v4/v5 混在の解消

### 高優先度

3. FastAPI と Pydantic のアップデート
4. Next.js のアップデート

### 中優先度

5. 依存関係の整理
6. pnpm 移行
7. Vitest 導入

### 低優先度

8. 継続的改善の仕組み作り

---

## 実装時の教訓・Q&A (ステップ0〜1)

### 🔧 **ruff移行による開発環境統一**

- **教訓**: autopep8 + black + flake8 → ruff 単一ツールで10-100倍高速化
- **VSCode統合**: charliermarsh.ruff拡張機能で保存時自動フォーマット・リント
- **依存削減**: 8パッケージ → 1パッケージで保守性向上

### 🐍 **Python環境パス選択の原則**

- **Q**: miseグローバルパス vs uv仮想環境パス、どちらを使うべきか？
- **A**: プロジェクト固有依存関係のため`./backend/.venv/bin/python`を優先
- **理由**: IDE補完精度、チーム共有、プロジェクト環境の一貫性確保

### 📝 **ESLint設定競合の解決**

- **Q**: react-hooks プラグイン競合の原因と対処法は？
- **A**: airbnb/hooks と next/core-web-vitals の重複登録が原因
- **解決**: Next.js中心設定を優先、不要なairbnb/hooks削除で競合解消

### 🛠 **mise + uv 環境の利点**

- **Docker削除**: コンテナ起動時間0秒、ネイティブ実行環境
- **バージョン統一**: .tool-versionsでチーム全体の開発環境一致
- **高速依存管理**: uv sync による依存関係インストールの大幅高速化

---

## 作成日

2025年8月24日

## 作成者

GitHub Copilot との議論に基づく

## 参考

<https://github.com/azu/postem/blob/master/modernization-plan.md>
