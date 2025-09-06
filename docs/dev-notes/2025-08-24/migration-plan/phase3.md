# ステップ 3: Backend FastAPI と依存関係のアップデート

**優先度**: 高
**予想所要時間**: 2-3時間
**対象**: `backend/` ディレクトリ

## 概要

FastAPI 0.78.0 → 最新版, Pydantic v1 → v2, Python 3.9 → 3.12 のアップグレード
※ ステップ 0.5 で mise + uv による環境構築済みのため、pyproject.toml ベースでの管理

## 対象バージョン

- **FastAPI**: 0.78.0 → 最新版（0.104.x）
- **Pydantic**: 1.9.1 → v2.x（Breaking Changes あり）
- **Python**: 3.9 → 3.12

## タスク

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

## 移行手順

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

## Pydantic v2 の主要な Breaking Changes

- **Config クラス** → **model_config** への変更
- **メソッド名の変更**:
  - `.dict()` → `.model_dump()`
  - `.json()` → `.model_dump_json()`
  - `.parse_obj()` → `.model_validate()`

## **backend GitHub Actions の更新**

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

## 実行結果（ステップ3）と得られた教訓（2025-08-31）

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

## 完了条件

- 全 API エンドポイントが正常動作
- `uv run pytest` が全て PASS
- FastAPI の自動生成ドキュメント（/docs）が正常表示
- GitHub Actions が成功

---

## Vercel デプロイ時のトラブルシューティング（Python3.12 移行での注意点）

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

## 🎓 **ステップ3（Backend Python 3.12移行）の教訓とQ&A**

### 主要な教訓

1. **段階的移行の重要性**
   - Python 3.9→3.12、FastAPI 0.78→0.99、一気に全て更新せずPydantic v1維持で安定性確保
   - 破壊的変更（Pydantic v2）は後回しにして、まずランタイム基盤を安定させる戦略が有効

2. **依存関係の互換性管理**
   - `pydantic>=1.10.13,<2.0.0` で v1系を固定し、v2移行は別イテレーションで計画
   - `fastapi>=0.99.0,<0.100.0` でマイナーバージョン固定により予期しない破壊的変更を回避

3. **開発環境とCI/CDの整合性**
   - `.python-version`、`pyproject.toml`、GitHub Actions の Python バージョンを統一
   - ローカル環境とCI環境の差異がトラブルの温床になるため、バージョン管理の一元化が重要

### Q&A

**Q**: uv と pip、どちらを使うべきか？
**A**: ローカル開発は uv、CI/Vercel は pip の使い分けが現実的。uv の高速性とエコシステムの安定性を両立。

**Q**: Pydantic v2 移行をスキップした理由は？
**A**: Python バージョンアップデートと同時進行するとトラブル原因の特定が困難。段階的移行でリスク分散。

**Q**: FastAPI 0.99系で止めた理由は？
**A**: v0.100.0 の破壊的変更リスクを避け、安定した 0.99.x 系で運用継続。必要に応じて後日最新版への移行を計画。

**Q**: Python 3.12 の union 記法（`X | None`）への対応は？
**A**: ruff の自動修正機能で一括変換可能。手動確認と組み合わせて段階的に適用。

### 未完了タスク・今後の課題

- **Pydantic v2 移行**: `.dict()` → `.model_dump()` 等の Breaking Changes 対応
- **FastAPI v0.1xx 移行**: 安定性確認後の次期メジャーバージョン対応
- **型注釈の完全な Python 3.12 対応**: 残存する `typing.Union` の `|` 記法への統一
- **Vercel Functions の最適化**: コールドスタート短縮とメモリ使用量改善
- **テストカバレッジ向上**: 新しい Python バージョンでの edge case 検証

### パフォーマンス改善結果

- **ruff 統合**: 8ツール → 1ツールで 10-100倍高速化
- **Python 3.12**: パフォーマンス向上（特に辞書操作とエラーハンドリング）
- **uv 依存管理**: pip 比で依存解決・インストール時間大幅短縮

---

### 段階的アップデートの要約と教訓

- **段階的アプローチの重要性**: 一度にすべてを更新するのではなく、各コンポーネントを個別にアップデートすることで、問題の特定と修正が容易になった。
- **テストの役割**: 各段階でのテスト実行により、変更が他の部分に与える影響を最小限に抑えることができた。
- **ドキュメントの更新**: アップデートのたびにドキュメントを更新することで、チーム全体の理解と作業効率が向上した。
- **依存関係の管理**: 依存ライブラリのバージョンを固定し、アップデート前に影響範囲を確認することで、予期せぬ問題を回避できた。
- **教訓**: アップデートは計画的に行い、必要に応じてロールバックの準備をしておくことが重要である。

---

### pytest・pytest-cov・mypy-extensions アップデート (2025年9月4日実施)

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
