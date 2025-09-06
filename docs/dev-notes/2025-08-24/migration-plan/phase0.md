# ステップ 0: mise によるローカル開発環境への移行

**実行方針**: Docker 環境から mise + ネイティブ開発環境への完全移行

## 背景

DB不要の小規模アプリケーションであり、Docker環境の複雑性よりもネイティブ開発環境のパフォーマンスと開発体験を優先する。

## タスク

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

## 開発環境起動手順

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

## 完了条件

- mise環境でのツール管理
- uv による Python 依存関係管理
- VSCode のローカル設定移行
- Docker環境の完全廃止

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
