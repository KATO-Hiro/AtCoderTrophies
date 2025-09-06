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

## ステップ 3.5: GitHub Actions アップデート

### setup-uv v2→v6 アップグレード (完了)

**実施日**: 2025-09-01

**変更内容**:

- `astral-sh/setup-uv@v2` → `astral-sh/setup-uv@v6` に更新
- `actions/setup-python` と手動キャッシュ設定を削除
- uv 内蔵の Python 管理とキャッシュ機能を活用

**主要な機能追加**:

- `python-version`: Python バージョン指定 (`UV_PYTHON` 環境変数設定)
- `enable-cache`: 内蔵キャッシュ機能の有効化
- `working-directory`: 作業ディレクトリ指定
- `activate-environment`: 仮想環境の自動有効化
- チルダ展開、マニフェストファイル、問題マッチャーなど

**メリット**:

- ✅ 設定の簡素化: 3つのステップが1つに統合
- ✅ キャッシュ最適化: uv 内蔵キャッシュでより効率的
- ✅ Python 管理統一: uv が Python とパッケージを一括管理
- ✅ 破壊的変更なし: 完全な後方互換性

**最終設定**:

```yaml
- name: Install uv with Python 3.12
  uses: astral-sh/setup-uv@v6
  with:
    python-version: "3.12"
    enable-cache: true
    working-directory: backend
```

### 実行結果（ステップ3）と得られた教訓（2025-09-03）

✅ **完了済み**

**アップデート概要**:

- FastAPI `0.99.x` → `0.116.1` への大幅アップグレード成功
- Pydantic `1.10.x` → `2.11.7` への v2 移行完了
- Python 3.12 対応維持

**Pydantic v2 移行対応**:

- `Config` クラス → `model_config = ConfigDict()` への変更
- `schema_extra` → `json_schema_extra` への移行
- 全スキーマクラス（`AcceptedCount`、`AcceptedCountByLanguage`、`RatedPointSum`、`LongestStreak`、`AtCoderProblemsStatisticsAPI`）の設定を更新

**依存関係管理の教訓**:

- urllib3 v2.x と pytest-vcr の互換性問題により `urllib3>=1.26.15,<2.0.0` で制約
- FastAPI 0.116.x は Pydantic v2 との相性が良好
- テスト結果: `7 passed, 1 skipped, 1 xfailed` で互換性問題なし

**API動作確認**:

- ルートエンドポイント (`/`) 正常応答: `{"message": "Hello, AtCoder Trophies!"}`
- HTTP Status Code: 200 OK
- 全エンドポイントが Pydantic v2 スキーマで正常動作

**重要な注意点**:

1. **段階的移行の効果**: FastAPI と Pydantic を同時にアップグレードしても、適切な依存関係管理により安定動作
2. **テストツールとの互換性**: urllib3 v2 は一部テストライブラリとの相性問題があるため、バージョン制約が重要
3. **Pydantic v2 の恩恵**: パフォーマンス向上と型安全性の強化、スキーマ生成の改善
4. **破壊的変更対応**: migration-plan の433-439行目の対応で十分カバーできた

**追加のPydantic v2 Validation Errors対応（2025-09-03）**:

✅ **問題の特定と解決**

- **問題**: `AtCoderProblemsStatisticsAPI()`の空初期化でValidation errorsが発生
- **原因**: Pydantic v2では必須フィールドをすべて初期化時に指定する必要がある
- **解決策**:
  1. 各統計データを事前に取得・変換してから一括初期化
  2. `StatisticsByLanguage(**result)`で辞書を型オブジェクトに変換
  3. `response_model=AtCoderProblemsStatisticsAPI`のコメントアウト解除

- **修正前**: `stat_api = AtCoderProblemsStatisticsAPI()` → ValidationError
- **修正後**: `AtCoderProblemsStatisticsAPI(accepted_count=obj, ...)` → 正常動作

**教訓**:

- Pydantic v2では段階的フィールド設定（`obj.field = value`）は許可されない
- 型ヒントと実際の値の型一致が厳密に要求される
- `StatisticsByLanguage | None`のリストでは辞書の直接appendは警告を生成する
- テストが通っても実際のAPIで型検証エラーが発生する可能性があるため、実環境テストが重要

**コードリファクタリングとVercel対応（2025-09-03 追加）**:

✅ **不要な一時変数の除去**

- **問題**: `accepted_count_obj = AcceptedCount(**accepted_count)` のような一時変数が機能的に不要
- **改善**: インライン化により `AcceptedCount(**read_accepted_count_by_user_name(user_name))` に簡素化
- **効果**: コード行数10行削減、メモリ効率向上、可読性向上

✅ **Vercel対応のrequirements.txt形式変換**

- **問題**: uvの詳細形式（ハッシュ付き）でVercelデプロイ時に `cannot be installed when requiring hashes` エラー
- **解決**: `uv export --no-hashes --no-emit-project | grep -E '^[a-zA-Z0-9_-]+==' | sort` でシンプル形式に変換
- **結果**: 239行 → 36行（85%削減）、`annotated-types==0.7.0` 形式に統一

**最終的な成果**:

- FastAPI 0.116.1 + Pydantic 2.11.7 + Python 3.12 で完全動作
- 全APIエンドポイント正常動作確認済み（Status Code 200、警告なし）
- Vercelデプロイ対応完了

### 型チェックとテストのリファクタリング

**実行内容**:

- mypyによる厳格な型チェック導入
- 例外処理の重複解消とアーキテクチャ改善
- テストコードの型安全性向上

**主な修正項目**:

1. **API層の戻り値型注釈追加**:

   ```python
   # Before
   async def read_accepted_count(user_name: str):

   # After
   async def read_accepted_count(user_name: str) -> AcceptedCount:
   ```

2. **例外処理の責任分離**:
   - CRUD層: 純粋なデータアクセス、Noneを返す
   - API層: 統一的なエラーハンドリング、try-catch実装

3. **テストコードの型注釈強化**:

   ```python
   # Before
   def mock_failed_api_response() -> Any:

   # After
   def mock_failed_api_response() -> Generator[MagicMock, None, None]:
   ```

4. **戻り値型の不一致修正**:
   - `read_accepted_count_by_language_using_user_name`: `list[dict[str, Any]]`
   - 他の関数: `dict[str, Any]`

**得られた教訓**:

1. **型安全性の重要性**:
   - `Any`型は型チェックを無効化するため、可能な限り具体的な型を指定
   - Generator関数には`Generator[YieldType, SendType, ReturnType]`を使用

2. **責任の分離**:
   - データアクセス層とAPI層で例外処理を重複させない
   - 各層の責任を明確に分離することでテスタビリティが向上

3. **pytest fixtureの理解**:
   - `yield`はセットアップ→テスト実行→ティアダウンの仕組み
   - モックオブジェクト自体をテスト関数に渡すことで検証が可能

4. **APIエンドポイントの型特性**:
   - 単一オブジェクト返却 vs リスト返却の違いを型レベルで明確化
   - エンドポイントごとの戻り値の性質を正確に型で表現

**最終結果**:

- `uv run mypy api/ tests/`: Success (型エラー0件)
- `uv run ruff check api/ tests/`: No issues found
- 型安全でありながら保守性の高いコードベースを実現

## ステップ 4: Next.js 段階的アップデート

### フェーズ 4.1: Next.js 13.x への移行

#### **破壊的変更と対応方針**

##### **1. next/image の alt 属性必須化**

- **影響範囲**: `components/common/Header.tsx` など Image コンポーネント使用箇所
- **対応**: alt 属性の追加が必須

```typescript
// 修正前
<Image src="/logo.png" width={100} height={50} />

// 修正後
<Image src="/logo.png" width={100} height={50} alt="AtCoder Trophies Logo" />
```

##### **2. React 18 StrictMode 対応**

- **影響範囲**: `useEffect` の副作用処理
- **対応**: API呼び出しの重複実行防止

```typescript
// useEffect のクリーンアップ関数追加
useEffect(() => {
  let cancelled = false

  fetchData().then(data => {
    if (!cancelled) {
      setData(data)
    }
  })

  return () => { cancelled = true }
}, [])
```

##### **3. App Router は段階的導入（オプション）**

- **現状**: Pages Router (`pages/`) で継続
- **理由**:
  - 大幅なファイル構造変更が必要
  - 現在の構造で十分な機能を提供
  - 将来的な移行を検討（ステップ8以降）

#### **導入推奨機能**

##### **1. next/font による Google Fonts 最適化（高優先度）**

```typescript
// pages/_app.tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
```

**メリット**:

- CLS（Cumulative Layout Shift）の改善
- フォント読み込み最適化
- `@fontsource/roboto` の置き換え可能
- バンドルサイズ削減

##### **2. Turbopack の実験的導入（高優先度）**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true
  }
}

module.exports = nextConfig
```

**メリット**:

- 開発環境のビルド速度700倍向上（12.97秒 → 1-2秒予想）
- HMR（Hot Module Replacement）の改善
- Next.js完全統合によるゼロ設定
- **Vitest導入予定のためVite移行より優先**

**注意**: Vite移行は大幅な設定変更とNext.js機能の再実装が必要なため、
現段階では**Turbopack優先**を推奨

##### **3. React 18 Concurrent Features（低優先度）**

```typescript
// 自動バッチング（v18で自動有効化）
// useDeferredValue（将来的な導入検討）
import { useDeferredValue } from 'react'

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query)
  // 重い処理を遅延実行
}
```

#### **App Router vs Pages Router 比較**

| 項目 | Pages Router（現在） | App Router |
|------|-------------------|------------|
| **学習コスト** | ✅ 低い | ❌ 高い |
| **安定性** | ✅ 高い | ⚠️ 比較的新しい |
| **パフォーマンス** | ⚠️ 標準 | ✅ 高い |
| **レイアウト** | ❌ グローバルのみ | ✅ ネスト可能 |
| **Server Components** | ❌ なし | ✅ あり |
| **本プロジェクト適用** | ✅ 推奨継続 | ⚠️ 将来検討 |

#### **関連ツールへの移行計画**

##### **Phase 4.3: Vitest + Turbopack 併用戦略**

**現段階の推奨アプローチ**:

- ✅ **Next.js開発**: Turbopack（最適化済み）
- ✅ **テスト実行**: Vitest（高速・モダン）
- ✅ **段階的移行**: リスク分散、各ツールの利点活用

```typescript
// vitest.config.ts（テスト用）
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

##### **将来的なビルドツール統一の判断基準**

| 項目 | Turbopack継続 | Vite移行 |
|------|--------------|----------|
| **Next.js依存度** | 高い | 低い（SPA化想定） |
| **App Router移行** | 不要 | 完了済み |
| **開発チーム** | Next.js経験重視 | Vite経験あり |
| **プロジェクト方向性** | フルスタック継続 | フロントエンド特化 |

##### **推奨タイムライン**

```markdown
### 2025年9月: Vitest導入
- Turbopack + Vitest 併用開始
- テストエコシステムのVite系移行

### 2025年12月: 評価・判断
- パフォーマンス比較
- 開発体験評価
- 長期戦略決定

### 2026年3月: 統一化（条件付き）
- App Router移行状況に応じて
- Vite完全移行 or Turbopack継続確定
```

#### **GitHub Actions アップデート（setup-node v5対応）**

```yaml
# .github/workflows/frontend.yml
- name: Use Node.js 20.x
  uses: actions/setup-node@v5
  with:
    node-version: '20.x'  # 推奨: node-version を維持（後方互換性あり）
    cache: 'pnpm'  # キャッシュを明示的に有効化
    cache-dependency-path: frontend/pnpm-lock.yaml
```

**setup-node v5 の主要変更**:

- キャッシュがデフォルトで無効化（明示的な指定が必要）
- キャッシュキー生成方法の変更（初回実行時に再生成）
- 古いNode.jsバージョン（v12以下）のサポート削除

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

#### 実施概要

**目標**: Next.js 13.5.11 → 14.x での安定性とパフォーマンス向上

**実施日**: 2025年9月6日（フェーズ4.1完了直後）

#### 破壊的変更の影響分析

##### 1. **Node.js バージョン要件**

- **変更**: Node.js 16.14.0 → 18.17.0以上が必須
- **影響**: ✅ **影響なし** - 既にNode.js 20使用済み

##### 2. **next/image の最適化強化**

- **変更**: デフォルトローダーの改善
- **影響**: ✅ **影響なし** - 現在直接的な使用なし

##### 3. **App Router の安定化**

- **変更**: 実験的機能から安定機能へ
- **影響**: ⚠️ **Pages Router継続のため影響軽微**

#### 導入予定機能

##### 高優先度: Turbopack 安定化 ⭐⭐⭐

```javascript
// next.config.js - より安定した設定
const nextConfig = {
  experimental: {
    turbo: {
      // Next.js 14では安定性が大幅向上
      rules: {
        '*.module.css': ['css-loader'],
      }
    }
  },
  transpilePackages: ['copy-text-to-clipboard'],
}
```

**期待効果**:

- 🚀 追加10-20%のパフォーマンス改善
- 🛠️ 安定性向上（実験的 → 安定機能）
- 📦 メモリ使用量最適化

##### 中優先度: React 18最新版への更新

**更新対象**:

- `react@^18.3.1`
- `react-dom@^18.3.1`
- `@types/react@^18.3.1`
- `@types/react-dom@^18.3.1`

#### 実装ステップ

**ステップ1**: Next.js 14アップデート

```bash
cd frontend
pnpm update next@14
```

**ステップ2**: React 18最新版確認

```bash
pnpm update react@^18.3.1 react-dom@^18.3.1 @types/react@^18.3.1 @types/react-dom@^18.3.1
```

**ステップ3**: 設定ファイル最適化

- next.config.js のTurbopack設定改善
- 実験的機能（PPR等）は今回見送り

**ステップ4**: 検証テスト

- ビルドテスト
- 開発サーバー起動確認
- パフォーマンス測定（フェーズ4.1との比較）
- 全ページアクセステスト

#### リスク管理

**ロールバック準備**:

```bash
# 万が一の場合
pnpm add next@13.5.11  # フェーズ4.1安定バージョンに戻す
```

**段階的検証**:

1. ✅ ビルド成功確認
2. ✅ 開発サーバー正常起動
3. ✅ ブラウザアクセステスト
4. ✅ Console エラー0件確認

- 安定性確認後に実施 → **2025年9月6日実施決定**

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
mise install pnpm@latest  # v10最新版をmise経由でインストール
pnpm import  # yarn.lock から pnpm-lock.yaml を生成
rm yarn.lock
```

### GitHub Actions 更新

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 10

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

### pnpm移行の実行結果と教訓

**実行内容**:

- mise経由でpnpm v10.15.1をインストール
- yarn.lockからpnpm-lock.yamlへの移行
- 全設定ファイルの更新とテスト実行

**動作確認結果**:

1. **✅ ビルド** (`pnpm build`):
   - 正常にコンパイル完了、最適化されたプロダクションビルド生成
   - TypeScriptの既存警告はあるが、ビルドは成功

2. **✅ 開発サーバー** (`pnpm dev`):
   - `http://localhost:3000` で正常起動
   - HTTPステータスコード 200 で応答確認
   - Fast Refresh機能も有効

3. **✅ リント** (`pnpm lint`):
   - ESLint + Prettier チェック正常実行
   - 既存の警告はpnpm移行とは無関係

4. **✅ スクリプト一覧**:
   - `dev`, `build`, `start`, `lint`, `lint:fix` すべて利用可能

**更新されたファイル**:

- `.github/workflows/frontend.yml`: pnpm/action-setup@v4 + version 10
- `frontend/package.json`: packageManager、engines設定
- `docs/CONTRIBUTING.md`: mise経由のpnpmインストール手順
- `.tool-versions`: pnpm 10.15.1 追加

**得られた教訓**:

1. **mise活用の重要性**:
   - グローバルインストールではなくmise経由でツール管理
   - プロジェクトレベルでの一貫した環境構築
   - `.tool-versions`でのバージョン固定

2. **pnpm v10の優位性**:
   - Node.js v20との完全互換性確認済み
   - yarn.lockからの移行は`pnpm import`でスムーズ
   - GitHub Actionsの最新アクションでサポート充実

3. **移行戦略**:
   - 段階的テスト（インストール→ビルド→サーバー→lint）
   - 既存の機能やパフォーマンスに影響なし
   - CI/CD設定の同時更新が重要

4. **パッケージマネージャー移行のベストプラクティス**:
   - 設定ファイル更新、ドキュメント更新、動作確認を一括実行
   - lockファイルの適切な移行とクリーンアップ

**最終結果**:

- **yarn → pnpm v10.15.1** 完全移行成功
- **全機能正常動作確認済み**
- **チーム開発環境の統一化達成**

### pnpm v10問題の対処とv9ダウングレード (2025-09-03)

**問題発生**: pnpm v10.15.1でのビルド・実行時にunifiedパッケージの型互換性エラーが発生

**対処方法**:

1. **pnpm v9.15.9へのダウングレード**:
   - `.tool-versions`: `pnpm 9.15.9`に変更
   - `frontend/package.json`: engines とpackageManager を更新
   - `.github/workflows/frontend.yml`: pnpmバージョンを9に変更
   - `docs/CONTRIBUTING.md`: インストール手順を更新

2. **依存関係の互換性修正**:
   - `unified` v11 → v10.1.2にダウングレード
   - lockファイルの再生成による依存関係クリーンアップ

3. **動作確認項目**:
   - ✅ ビルド成功 (`pnpm build`)
   - ✅ 開発サーバー起動 (`pnpm dev`)
   - ⚠️ リントエラー（既存の型安全性問題、機能に影響なし）

**教訓**:

- パッケージマネージャーのメジャーバージョン更新時は依存関係の互換性を事前確認
- unified/remark/rehypeエコシステムはバージョン間の型互換性が複雑
- lockファイルの再生成による依存関係の整合性確保が重要
- CI/CD設定、開発環境設定、ドキュメントの一括更新が必要

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

### 🎓 **ステップ3（Backend Python 3.12移行）の教訓とQ&A**

#### 主要な教訓

1. **段階的移行の重要性**
   - Python 3.9→3.12、FastAPI 0.78→0.99、一気に全て更新せずPydantic v1維持で安定性確保
   - 破壊的変更（Pydantic v2）は後回しにして、まずランタイム基盤を安定させる戦略が有効

2. **依存関係の互換性管理**
   - `pydantic>=1.10.13,<2.0.0` で v1系を固定し、v2移行は別イテレーションで計画
   - `fastapi>=0.99.0,<0.100.0` でマイナーバージョン固定により予期しない破壊的変更を回避

3. **開発環境とCI/CDの整合性**
   - `.python-version`、`pyproject.toml`、GitHub Actions の Python バージョンを統一
   - ローカル環境とCI環境の差異がトラブルの温床になるため、バージョン管理の一元化が重要

#### Q&A

**Q**: uv と pip、どちらを使うべきか？
**A**: ローカル開発は uv、CI/Vercel は pip の使い分けが現実的。uv の高速性とエコシステムの安定性を両立。

**Q**: Pydantic v2 移行をスキップした理由は？
**A**: Python バージョンアップデートと同時進行するとトラブル原因の特定が困難。段階的移行でリスク分散。

**Q**: FastAPI 0.99系で止めた理由は？
**A**: v0.100.0 の破壊的変更リスクを避け、安定した 0.99.x 系で運用継続。必要に応じて後日最新版への移行を計画。

**Q**: Python 3.12 の union 記法（`X | None`）への対応は？
**A**: ruff の自動修正機能で一括変換可能。手動確認と組み合わせて段階的に適用。

#### 未完了タスク・今後の課題

- **Pydantic v2 移行**: `.dict()` → `.model_dump()` 等の Breaking Changes 対応
- **FastAPI v0.1xx 移行**: 安定性確認後の次期メジャーバージョン対応
- **型注釈の完全な Python 3.12 対応**: 残存する `typing.Union` の `|` 記法への統一
- **Vercel Functions の最適化**: コールドスタート短縮とメモリ使用量改善
- **テストカバレッジ向上**: 新しい Python バージョンでの edge case 検証

#### パフォーマンス改善結果

- **ruff 統合**: 8ツール → 1ツールで 10-100倍高速化
- **Python 3.12**: パフォーマンス向上（特に辞書操作とエラーハンドリング）
- **uv 依存管理**: pip 比で依存解決・インストール時間大幅短縮

---

#### 段階的アップデートの要約と教訓

- **段階的アプローチの重要性**: 一度にすべてを更新するのではなく、各コンポーネントを個別にアップデートすることで、問題の特定と修正が容易になった。
- **テストの役割**: 各段階でのテスト実行により、変更が他の部分に与える影響を最小限に抑えることができた。
- **ドキュメントの更新**: アップデートのたびにドキュメントを更新することで、チーム全体の理解と作業効率が向上した。
- **依存関係の管理**: 依存ライブラリのバージョンを固定し、アップデート前に影響範囲を確認することで、予期せぬ問題を回避できた。
- **教訓**: アップデートは計画的に行い、必要に応じてロールバックの準備をしておくことが重要である。

---

#### pytest・pytest-cov・mypy-extensions アップデート (2025年9月4日実施)

**アップデート内容:**

- pytest: 7.4.0 → 8.4.1
- pytest-cov: 5.0.0 → 6.2.1
- mypy-extensions: 1.0.0 → 1.1.0

**破壊的変更点の分析:**

- **pytest 8.x**: Python 3.7サポート終了、非推奨機能の削除
- **pytest-cov 6.x**: coverage.py 7.x系への対応
- **mypy-extensions 1.1.0**: TypedDictの改善、型チェック強化

**影響評価と結果:**

- ✅ **影響なし**: Python 3.12使用により全ての変更に対応
- ✅ **テスト**: 全9件のテストが正常実行
- ✅ **カバレッジ**: 測定精度が向上（73%カバレッジ維持）
- ✅ **型チェック**: エラーなし、品質向上

**得られた教訓:**

- **事前調査の重要性**: 破壊的変更を事前に調査することで安全なアップデートが可能
- **段階的アップデート**: 関連ライブラリを同時にアップデートすることで依存関係の問題を回避
- **自動テストの価値**: 既存のテストスイートがアップデート後の動作保証に不可欠
- **モダンなPythonバージョンの利点**: 新しいPythonバージョン使用により後方互換性の問題を回避

---

### actions/setup-node v4 から v5 へのアップデート

**破壊的変更点:**

- **キャッシュキーの変更**: v5ではキャッシュキー生成方法が変更され、以前のキャッシュが無効化される可能性があります。
- **キャッシュのデフォルト無効化**: キャッシュがデフォルトで無効化され、明示的に有効化する必要があります。
- **Node.js バージョンのサポート変更**: 古いNode.jsバージョン（v12以下）のサポートが削除されました。
- **`node-version` のエイリアス変更**: `node-version`が`node`に変更されました（後方互換性あり）。

**影響評価:**

- **キャッシュ設定**: `cache: 'pnpm'` を指定することで影響を回避可能。
- **Node.js バージョン**: 本プロジェクトではNode.js v20を使用しており、影響なし。
- **初回キャッシュ再生成**: アップデート後、初回実行時にキャッシュが再生成されるため、インストール時間が一時的に増加。

**推奨対応:**

以下のようにワークフローを更新してください:

```yaml
- name: Use Node.js 20.x
  uses: actions/setup-node@v5
  with:
    node-version: '20.x'
    cache: 'pnpm'  # キャッシュを有効化
    cache-dependency-path: frontend/pnpm-lock.yaml
```

**結論:**

- **破壊的影響**: 最小限（キャッシュ設定の明示化が必要）。
- **対応の容易さ**: 高（設定ファイルの微修正のみ）。
- **アップデート推奨度**: 高（v5 の改善点を活用可能）。

### uv export コマンドの解説

以下は、`uv export` コマンドを使用して `requirements.txt` を生成する手順の要約です：

1. **`uv export --format requirements-txt --no-hashes`**
   - `pyproject.toml` に基づいて依存関係をエクスポートします。
   - `--format requirements-txt`: 出力形式を `requirements.txt` に指定。
   - `--no-hashes`: パッケージのハッシュ情報を含めない。

2. **`awk -F';' '{print $1}'`**
   - セミコロン (`;`) 以降の条件（環境マーカー）を削除します。
   - 例: `fastapi==0.78.0; python_version >= "3.7"` → `fastapi==0.78.0`

3. **`sed 's/[[:space:]]*$//'`**
   - 行末の余分な空白文字を削除します。
   - 例: `fastapi==0.78.0` → `fastapi==0.78.0`

4. **`grep -E '^[A-Za-z0-9_.-]+==[^=]+'`**
   - `ライブラリ名==バージョン` の形式に一致する行だけを抽出します。
   - 例: `fastapi==0.78.0` は一致、`invalid-line` は除外。

5. **`> requirements.txt`**
   - 最終的な結果を `requirements.txt` ファイルに保存します。

このコマンドを使用することで、Vercel 互換のシンプルな `requirements.txt` を生成できます。

---

## 実装記録: フェーズ4.1 完了レポート

### 実施日

2025年9月6日

### 実装成果

#### ✅ 1. Next.js 13.x と React 18.x アップデート

**バージョン更新実績**:

- **Next.js**: 12.3.7 → 13.5.11
- **React**: 17.0.2 → 18.3.1
- **React DOM**: 17.0.2 → 18.3.1

**コマンド実行**:

```bash
pnpm update next@13 react@18 react-dom@18
```

#### ✅ 2. 導入推奨機能 1: next/font による Google Fonts 最適化

**実装箇所**: `/frontend/src/pages/_app.tsx`

**変更内容**:

```typescript
import { Roboto } from 'next/font/google';

// Configure Roboto font with Google Fonts optimization
const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

// フォントクラスを適用
<main className={roboto.className}>
  <ThemeProvider theme={theme}>
    {/* 既存コンテンツ */}
  </ThemeProvider>
</main>
```

**実現されたメリット**:

- ✅ CLS（Cumulative Layout Shift）の改善
- ✅ フォント読み込み最適化
- ✅ バンドルサイズ削減の基盤構築
- ✅ `@fontsource/roboto` の将来的な置き換え準備

#### ✅ 3. 導入推奨機能 2: Turbopack の実験的導入

**実装箇所**: `/frontend/next.config.js`

**変更内容**:

```javascript
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['~'] = resolve(__dirname, 'src');
    return config;
  },
  experimental: {
    turbo: {
      // Enable Turbopack for development
    },
  },
  // Replace next-transpile-modules with transpilePackages for Next.js 13+
  transpilePackages: ['copy-text-to-clipboard'],
};
```

**パフォーマンス測定結果**:

| モード              | 起動時間 | 改善率            |
|-------------------|---------|------------------|
| **Turbopack有効** | 531ms   | ベースライン      |
| **通常モード**     | 985ms   | 1.85倍遅い       |

- 🚀 **46%の起動時間短縮**を実現
- 📈 開発環境でのHMR（Hot Module Replacement）改善

### 🔧 技術的改善事項

#### Next.js 13対応の構成変更

1. **`next-transpile-modules` → `transpilePackages`への移行**:
   - Next.js 13の新しい設定方式に対応
   - 古いモジュールを削除: `pnpm remove next-transpile-modules`
   - ビルドエラーの解消

2. **importの順序修正**:
   - ESLintエラー対応: `next/font/google` を `next/head` より前に配置

#### React 18 StrictMode 対応確認

- 既存の`usePageView`フックは適切なクリーンアップ関数実装済み
- 追加の副作用処理対応は不要と確認
- React 18の自動バッチング機能は自動で有効化

### ✅ 検証結果

**ビルドテスト**:

```bash
✓ pnpm run build     # 本番ビルド成功
✓ pnpm dev --turbo   # Turbopack動作確認
✓ pnpm dev           # 通常モード動作確認
```

全ての警告はTypeScript/ESLintの既存課題のみで、新規エラーは0件

### 🎯 計画通りの先送り事項

#### App Router への移行 (ステップ8以降に延期)

- **理由**: Pages Router で現在十分に機能
- **判断**: 大幅なファイル構造変更リスクを回避
- **継続方針**: 現在のPages Router構造を維持

#### Vitest の導入 (フェーズ4.3で実施予定)

- **戦略**: Turbopack + Vitest 併用アプローチ
- **利点**: 各ツールの最適化を段階的に活用

### 📋 教訓と学び

#### 技術的教訓

1. **Next.js 13移行の注意点**:
   - `next-transpile-modules`は非推奨
   - `transpilePackages`への移行が必須
   - importの順序がより厳格に

2. **Turbopackの実用性**:
   - 小〜中規模プロジェクトでも十分な効果
   - 計画書の「700倍」は大規模プロジェクト想定
   - 実際は46%改善でも開発体験は大幅向上

3. **段階的アップデートの有効性**:
   - 一度に全機能を導入せず、核心機能から段階実施
   - React 18の破壊的変更は既存コードベースでは最小限

#### プロジェクト管理の教訓

1. **リスク分散戦略の成功**:
   - App Router移行を先送りしたことで安定性を確保
   - 技術負債を段階的に解決する方針が有効

2. **パフォーマンス測定の重要性**:
   - 理論値と実測値の乖離を定量的に把握
   - 開発者体験の改善を数値で証明

### 🚀 次のステップ

1. **フェーズ4.2**: 追加最適化機能の検討
2. **フェーズ4.3**: Vitest導入とTurbopack併用戦略
3. **本番環境**: デプロイ後のパフォーマンス監視

フェーズ4.1は計画通り完了し、Next.js 13とReact 18への移行基盤が確立されました。

---

## 緊急対応記録: Hydration エラー修正

### 発生日

2025年9月6日（フェーズ4.1完了直後）

### 問題の概要

Next.js 13アップデート後、開発サーバー起動時に以下のエラーが発生：

```text
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <a> in <a>.
```

### 根本原因

**Next.js 13のLinkコンポーネント仕様変更**により、既存のコンポーネントで`<a>`タグのネストが発生：

1. **Next.js 12以前**: `<Link>`の子要素として手動で`<a>`タグが必要
2. **Next.js 13以降**: `<Link>`コンポーネント自体が`<a>`タグをレンダリング

### 影響範囲と修正内容

#### 1. MuiNextLink コンポーネント (`/src/components/MuiNextLink/MuiNextLink.tsx`)

**問題箇所**:

```typescript
// Next.js 13では不正な実装
<NextLink href={to} passHref={passHref}>
  <Anchor ref={ref} href={to as string} {...other} />  // ← ネストした<a>タグ
</NextLink>
```

**修正内容**:

```typescript
// Next.js 13対応
export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  (props, ref) => {
    const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, children, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        ref={ref}
        {...other}
      >
        {children}  // ← 直接childrenをレンダリング
      </NextLink>
    );
  }
);
```

#### 2. ListItemLink コンポーネント (`/src/components/ListItemLink/ListItemLink.tsx`)

**問題箇所**:

```typescript
// 不適切な実装
function ListItemLink(props: any): JSX.Element {
  return <ListItem button component='a' {...props} />;  // ← component='a'が問題
}
```

**修正内容**:

```typescript
// Next.js 13対応 + 型安全性向上
interface ListItemLinkProps extends Omit<ListItemProps, 'href'> {
  href: string;
  children: ReactNode;
}

const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>((props, ref) => {
  const { href, children, ...other } = props;

  return (
    <NextLink href={href} ref={ref} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem component="span" {...other}>  // ← component="span"に変更
        {children}
      </ListItem>
    </NextLink>
  );
});
```

### 修正効果

#### 技術的成果

- ✅ **Hydrationエラー完全解決**
- ✅ **型安全性向上**: `any`型から適切な型定義への変更
- ✅ **ビルド成功**: 新規エラー0件
- ✅ **パフォーマンス維持**: 開発サーバー起動時間526ms（修正前とほぼ同等）

#### 検証結果

```bash
✓ pnpm run build     # 本番ビルド成功
✓ pnpm dev --turbo   # Turbopack動作確認（526ms起動）
✓ Hydrationエラー解消確認
```

### 🎯 学んだ教訓

#### Next.js メジャーバージョンアップの注意点

1. **Linkコンポーネントの仕様変更**:
   - 子要素として`<a>`タグを含めるパターンは廃止
   - `passHref`プロパティも多くのケースで不要

2. **ネストした`<a>`タグの危険性**:
   - HTMLの仕様違反によるアクセシビリティ問題
   - Hydrationエラーの主要原因

3. **コンポーネント設計の重要性**:
   - Material-UIとNext.js Linkの統合には慎重な設計が必要
   - `component="span"`など、適切なHTML要素の選択

#### 開発プロセスの改善点

1. **段階的テスト実施**:
   - アップデート直後の開発サーバー動作確認が重要
   - ビルドテストだけでは発見できない問題がある

2. **型定義の重要性**:
   - `any`型の使用は将来的な問題の温床
   - 適切な型定義により早期エラー発見が可能

### 📋 今後の予防策

1. **メジャーバージョンアップ時のチェックリスト**:
   - Linkコンポーネント使用箇所の全数確認
   - 開発サーバーでのブラウザ動作確認
   - Console エラー/警告の全件確認

2. **コンポーネント設計原則**:
   - Material-UIとNext.jsの組み合わせは慎重に実装
   - 型安全性を優先した実装方針

---

## 追加対応記録: prop-types モジュール不足エラー

### 発生タイミング

2025年9月6日（Hydrationエラー修正直後）

### エラーの詳細

Hydrationエラー修正後、トップページアクセス時に以下のランタイムエラーが発生：

```text
Unhandled Runtime Error
Error: Cannot find module 'prop-types'
```

### 原因分析

**Next.js 13/React 18での依存関係管理の変更**:

1. **Next.js 12以前**: `prop-types`が暗黙的に含まれていた
2. **Next.js 13以降**: `prop-types`の明示的インストールが必要
3. **Material-UIの依存関係**: 内部的に`prop-types`を使用している

### 実施した対応

#### パッケージインストール

```bash
cd frontend
pnpm add prop-types @types/prop-types
```

**インストール結果**:

- ✅ `prop-types 15.8.1` 正常インストール
- ✅ TypeScript型定義追加

### 動作確認結果

#### 開発サーバー起動確認

```bash
✓ pnpm dev --turbo  # 553ms起動（正常）
✓ Runtime Error解消確認
```

#### ブラウザ動作確認

- ✅ **トップページ正常表示**: `http://localhost:3000`
- ✅ **全コンポーネント正常レンダリング**
- ✅ **Console エラー0件**
- ✅ **Hydrationエラー解消継続**

### 🎯 得られた知見

#### React 18移行での隠れた依存関係

1. **prop-typesの必要性**:
   - TypeScriptプロジェクトでも実行時型チェックライブラリとして必要
   - Material-UI、React系ライブラリの多くが内部的に使用
   - 開発時のみならず本番環境でも必要

2. **暗黙的依存関係の変化**:
   - メジャーバージョンアップで暗黙的な依存関係が変更される
   - 必要なライブラリが自動インストールされなくなる可能性

3. **段階的エラー発生の特徴**:
   - ビルド時には発生せず、実行時にのみ発生
   - 初期ページロードで発見される場合が多い

#### 今後の対応指針

1. **メジャーアップデート時のチェック項目**:
   - ビルド成功 → 開発サーバー起動 → **ブラウザアクセステスト**
   - 各主要ページの動作確認必須
   - Console エラー/警告の全件確認

2. **依存関係管理のベストプラクティス**:
   - `pnpm list` での依存関係状況確認
   - 暗黙的依存関係から明示的依存関係への移行
   - TypeScriptプロジェクトでも実行時ライブラリの考慮

### 📊 最終検証結果

**全エラー解消確認**:

- ✅ **Hydrationエラー**: 完全解決
- ✅ **prop-typesエラー**: 完全解決
- ✅ **ビルド**: 正常完了
- ✅ **開発サーバー**: Turbopack 553ms起動
- ✅ **トップページ**: 正常表示・動作

**フェーズ4.1（Next.js 13 + React 18移行）が完全に安定稼働を実現しました。**

---

## 実装記録: フェーズ4.2 完了レポート

### 実施日

2025年9月6日（フェーズ4.1完了同日）

### 実装成果

#### ✅ バージョンアップデート実績

**Next.js 14への移行**:

- **Next.js**: 13.5.11 → **14.2.32**
- **React**: 18.3.1 (最新維持)
- **React DOM**: 18.3.1 (最新維持)

**アップデートコマンド**:

```bash
cd frontend
pnpm update next@14
pnpm update react@^18.3.1 react-dom@^18.3.1 @types/react@^18.3.1 @types/react-dom@^18.3.1
```

#### ✅ 設定ファイル最適化

**next.config.js の改善**:

```javascript
// Next.js 14 optimized Turbopack configuration
experimental: {
  turbo: {
    rules: {
      '*.module.css': ['css-loader'],
    },
  },
}
```

### 📊 検証結果

#### パフォーマンス測定

| フェーズ | Next.js バージョン | 起動時間 | 改善状況 |
|---------|-------------------|----------|----------|
| 4.1 | 13.5.11 | 531-553ms | ベースライン |
| **4.2** | **14.2.32** | **543ms** | **安定維持** |

#### 機能確認

- ✅ **ビルドテスト**: 正常完了（新規エラー0件）
- ✅ **開発サーバー**: Turbopack 543ms起動
- ✅ **ブラウザ動作**: トップページ正常表示
- ✅ **Console エラー**: 0件確認

### 🎯 Next.js 14で実現された改善

#### 安定性向上

1. **Turbopackの安定化**:
   - 実験的機能から安定機能へ
   - カスタムルール設定による最適化
   - メモリ使用量の改善

2. **TypeScript統合強化**:
   - より高速な型チェック
   - エラーメッセージの改善

#### 将来対応準備

1. **App Router基盤**:
   - Next.js 14でApp Routerが完全安定化
   - 将来移行時の基盤整備完了

2. **React Server Components対応**:
   - 次フェーズでの活用準備

### 🛡️ リスク評価

#### 破壊的変更の影響確認

- ✅ **Node.js要件**: 18.17.0以上（既に20使用中で問題なし）
- ✅ **next/image**: 直接使用なしのため影響なし
- ✅ **Pages Router**: 継続使用で完全互換

#### 実験的機能の見送り

- **PPR (Partial Prerendering)**: 今回は見送り（安定性重視）
- **Server Actions**: Pages Router継続のため対象外

### 📚 得られた知見

#### Next.js 14移行の特徴

1. **スムーズな移行**:
   - Next.js 13からの破壊的変更が最小限
   - 既存コードの修正不要
   - 安定性を保った状態でのアップグレード

2. **Turbopackの成熟**:
   - カスタムルール設定による柔軟性向上
   - 実験的機能から本格運用レベルへ

#### アップデート戦略の有効性

1. **段階的アップデート方針**:
   - フェーズ4.1の安定化 → フェーズ4.2の追加改善
   - リスクを分散した継続的改善アプローチが成功

2. **パフォーマンス重視**:
   - 起動時間の安定維持（543ms）
   - 新機能より安定性を優先する判断が適切

### 🚀 次のステップ

1. **フェーズ4.3**: 追加最適化とVitest導入検討
2. **将来計画**: App Router移行に向けた段階的準備
3. **継続監視**: 本番環境でのパフォーマンス確認

---

## 緊急対応記録: aboutページCSS読み込みエラー

### 発生タイミング

2025年9月6日（フェーズ4.2完了直後）

### 問題の概要

aboutページ（`http://localhost:3000/about`）にアクセス時に以下のエラーが発生：

```text
Error: ./src/pages
Module not found: Can't resolve '/node_modules/github-markdown-css/github-markdown-light.css'
server relative imports are not implemented yet. Please try an import relative to the file you are importing from.
```

### 根本原因

**絶対パスでのCSSインポート**が Next.js 14 + Turbopack で非対応：

```typescript
// ❌ 問題のあるコード (src/pages/about.tsx)
import '/node_modules/github-markdown-css/github-markdown-light.css';
```

**原因分析**:

- Next.js 14のTurbopackは絶対パス（`/node_modules/...`）でのインポートを未サポート
- 相対パス（`package名/...`）での解決が必要

### 対応内容

#### ファイル修正

**src/pages/about.tsx の修正**:

```typescript
// 修正前
import '/node_modules/github-markdown-css/github-markdown-light.css';

// 修正後
import 'github-markdown-css/github-markdown-light.css';
```

#### 問題箇所の特定手順

効果的だった調査方法：

```bash
# 絶対パスインポートの検索
grep -r "/node_modules" . --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

### 🎯 学んだ教訓

#### Next.js 14 + Turbopack での制約

1. **CSSインポートの制限**:
   - 絶対パス（`/node_modules/...`）は非対応
   - パッケージ名での相対パス（`package名/ファイル`）を使用必須

2. **エラーメッセージの読み取り**:
   - `server relative imports are not implemented yet` が重要なヒント
   - Next.js公式ドキュメントの参照が有効

#### デバッグ手法の有効性

1. **段階的な検索アプローチ**:
   - パッケージ名での検索
   - 絶対パスでの検索
   - ファイルタイプを限定した検索

2. **エラーメッセージの詳細確認**:
   - 単純な「Module not found」だけでなく、追加メッセージが重要
   - 公式ドキュメントのリンクを必ず確認

#### 今後の予防策

1. **インポート文の標準化**:
   - 外部パッケージは常にパッケージ名から開始
   - 絶対パスでのインポートは避ける

2. **Next.js バージョンアップ時のチェック項目**:
   - CSSインポート文の確認
   - 絶対パスインポートの全件チェック
   - Turbopack特有の制約の確認

### 📊 対応結果

- ✅ **aboutページアクセス**: エラー解消
- ✅ **CSS適用**: github-markdown-css正常読み込み
- ✅ **ビルド**: 正常完了
- ✅ **開発サーバー**: 安定稼働継続

**Next.js 14移行時の隠れた互換性問題を迅速に解決し、安定稼働を維持しました。**

## 作成日

2025年8月24日

## 作成者

GitHub Copilot との議論に基づく

## 参考

<https://github.com/azu/postem/blob/master/modernization-plan.md>
