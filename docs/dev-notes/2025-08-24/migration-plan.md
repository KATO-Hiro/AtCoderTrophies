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
uv add --dev "autopep8>=2.0.0"
uv add --dev "black>=23.0.0"
uv add --dev "flake8>=6.0.0"
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
   - `pyproject.toml`: `requires-python = ">=3.12"`

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

### 完了条件

- 全 API エンドポイントが正常動作
- `uv run pytest` が全て PASS
- FastAPI の自動生成ドキュメント（/docs）が正常表示
- GitHub Actions が成功

---

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

## 作成日

2025年8月24日

## 作成者

GitHub Copilot との議論に基づく

## 参考

<https://github.com/azu/postem/blob/master/modernization-plan.md>
