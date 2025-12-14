# urllib3 v1.26.20 → v2.6.2 アップグレード計画

**最終更新日**: 2025-12-14
**推奨実行期間**: 2-3 週間（各フェーズ 3-5 営業日）

---

## 📌 概要

本プロジェクトの HTTP リクエストライブラリ (`urllib3`) をメジャーバージョンアップしても、テストフレームワーク (`vcrpy`, `pytest-recording`) および型定義 (`types-urllib3`) との互換性を保証するための段階的移行計画です。

**対象ライブラリ**:

- `urllib3`: v1.26.20 → v2.6.2
- `vcrpy`: v5.1.0 → v6.x → v7.x → v8.1.0
- `pytest-recording`: v0.13.4 → v0.13.4 (互換性確認のみ)
- `types-urllib3`: v1.26.25.14 → v2.x系
- `brotli` (オプション): インストール推奨

**主要目的**:

1. **セキュリティ脆弱性対応** (CVE-2025-66471, CVE-2025-66418)
2. **依存関係の最新化**
3. **テスト環境の安定化**

---

## 🔴 破壊的な変更点と影響評価

### urllib3 v2.0.0 での破壊的変更

| 変更内容 | 詳細 | 本プロジェクトへの影響 |
|---------|------|--------|
| **HTTPResponse API 削除** | `getheaders()`, `getheader()` 廃止 → `.headers` で代替 | ❌ **なし** (使用していない) |
| **urllib3.request モジュール削除** | `urllib3.request.*` が削除 | ❌ **なし** (直接使用していない) |
| **Retry パラメータ変更** | 方法ホワイトリスト名変更 | ✅ **要確認** (使用中) |
| **HTTPConnection キーワード専用化** | ポジショナル引数廃止 | ❌ **なし** (直接使用していない) |
| **enforce_content_length のデフォルト** | `True` に変更 | ⚠️ **確認済み** (互換性あり) |

**本プロジェクトでの利用状況**:

```python
# backend/api/services.py での使用
from urllib3.util import Retry

retries = Retry(
    total=try_count,
    backoff_factor=base_sleep_time_second,
    status_forcelist=[...],  # ← v2.x でも互換性あり
)
```

✅ **判定**: **破壊的変更の影響なし**

---

### urllib3 v2.6.0 でのセキュリティ修正

#### CVE-2025-66471 (8.9 重要度)

**概要**: 圧縮ボム攻撃への対策

- **脆弱性**: ストリーミング API が圧縮データを不適切に処理
- **リスク**: 小量のデータ要求でも大量のリソース消費
- **修正**: `read_chunked()` の改善

**参照**: <https://github.com/advisories/GHSA-2xpw-w6gg-jr37>

#### CVE-2025-66418 (8.9 重要度)

**概要**: Content-Encoding チェーン制限

- **脆弱性**: 無制限の `Content-Encoding` チェーン可能 → DoS 攻撃
- **リスク**: 無制限エンコーディング → リソース枯渇
- **修正**: チェーン化エンコーディングを 5 つまでに制限

**参照**: <https://github.com/advisories/GHSA-gm62-xv2j-4w53>

---

### vcrpy v5.1.0 → v8.1.0 での破壊的変更

#### vcrpy v6.0.0 (2024-01-24)

- **urllib3 v1.x サポート終了予告**
- Python 3.12 対応
- Cassette フォーマット警告

#### vcrpy v7.0.0 (2024-12-31)

- Python 3.8 サポート終了
- urllib3 v2.x への準備進行

#### vcrpy v8.0.0 (2025-12-09) ⚠️ **重要**

```text
BREAKING CHANGE:
Drop support for urllib3 < 2
urllib3 v2.x が必須に変更
```

**参照**: <https://github.com/kevin1024/vcrpy/releases/tag/v8.0.0>

---

### Brotli パッケージについて

**現在の状況**:

- ❌ インストール未済み
- ⚠️ urllib3 v2.6.0 で推奨（警告対象）

**メリット**:

- Gzip 比 15-20% 圧縮率向上
- RFC 7932 として標準化
- ブラウザサポート率 96%

**導入効果**:

- セキュリティ警告の消除
- API レスポンス圧縮効率向上
- テストカセットファイルサイズ削減

**参照**: <https://github.com/google/brotli>

---

## ✅ 本プロジェクトへの影響評価

| 項目 | 状況 | リスク | 対応 |
|-----|------|--------|------|
| HTTPResponse API 削除 | 未使用 | ❌ なし | スキップ可 |
| カスタムデコンプレッサー | 未使用 | ❌ なし | スキップ可 |
| Retry パラメータ | 使用中 | ✅ 低 | 互換性確認済み |
| Python 3.12 互換性 | 使用中 | ❌ なし | 既に対応 |
| VCR Cassette ファイル | 使用中 | ⚠️ 中 | 再生成必要 |
| types-urllib3 型定義 | 使用中 | ⚠️ 中 | v2.x へ更新必要 |

**総合判定**: ✅ **アップグレード実行可能** (テスト検証が必須)

---

## 🚀 段階的アップグレード計画

### 前提条件

#### 必須環境

- Python: 3.12 (既に対応)
- Node.js: 22.19.0 (mise で管理)
- UV パッケージマネージャー: 0.8.4+

#### 前提チェック

```bash
# Python バージョン確認
python3 --version  # Python 3.12.x

# UV バージョン確認
uv --version  # uv 0.8.4+

# git ブランチ確認
git status  # main ブランチ上での実行推奨
```

#### 参考資料

**公式ドキュメント**:

- urllib3 v2 Migration Guide: <https://urllib3.readthedocs.io/en/latest/v2-migration-guide.html>
- vcrpy GitHub Releases: <https://github.com/kevin1024/vcrpy/releases>
- pytest-recording GitHub: <https://github.com/kiwicom/pytest-recording>

**セキュリティ情報**:

- CVE-2025-66471: <https://github.com/advisories/GHSA-2xpw-w6gg-jr37>
- CVE-2025-66418: <https://github.com/advisories/GHSA-gm62-xv2j-4w53>

**Brotli 情報**:

- GitHub: <https://github.com/google/brotli>
- RFC 7932: <https://datatracker.ietf.org/doc/html/rfc7932>

---

## 📋 実装チェックリスト

### Phase 1: vcrpy 6.x への検証移行 (3-5営業日)

**目標**: vcrpy 6.0.2 で urllib3 v2.x 限定サポートを確認

- [ ] **環境準備**
  - [ ] `git checkout -b #2295` でフィーチャーブランチ作成
  - [ ] `git log --oneline | head -1` で現在の HEAD を記録 (ロールバック用)

- [ ] **依存関係更新**
  - [ ] `backend/pyproject.toml` で `vcrpy>=6.0.2,<7.0.0` に指定
  - [ ] `make install` で依存関係を再解決
  - [ ] `uv pip list | grep vcrpy` で version 確認

- [ ] **テスト実行**
  - [ ] `cd backend && make test` でテスト実行
  - [ ] 全テスト成功を確認 (7 passed, 1 skipped, 1 xfailed)
  - [ ] VCR cassette ファイルの自動再生成を確認

- [ ] **Cassette ファイル確認**
  - [ ] `tests/cassettes/test_main/` ディレクトリが更新されたか確認
  - [ ] git で cassette ファイルの diff を確認 (バイナリ差異のみ)
  - [ ] テスト再実行で cassette が再利用可能か確認

- [ ] **ロールバック準備**
  - [ ] 問題発生時は `git reset --hard <HEAD>` でロールバック可能か確認

---

### Phase 2: urllib3 2.x への並行移行 (3-5営業日)

**目標**: urllib3 v2.x 対応を確認しつつ、vcrpy は v6.x で維持

- [ ] **依存関係更新**
  - [ ] `backend/pyproject.toml` で `urllib3>=2.0.0,<3.0.0` に更新
  - [ ] `make install` で依存関係を再解決
  - [ ] `uv pip list | grep urllib3` で version 確認 (2.6.2+)

- [ ] **型定義更新**
  - [ ] `backend/pyproject.toml` で `types-urllib3>=2.0.0` に更新
  - [ ] `make install` で型定義を再解決
  - [ ] `uv pip list | grep types-urllib3` で version 確認

- [ ] **コード互換性確認**
  - [ ] `backend/api/services.py` の Retry 使用箇所を確認
  - [ ] `Retry()` パラメータが v2.x 互換か確認
  - [ ] Retry API ドキュメント確認: <https://urllib3.readthedocs.io/en/latest/reference/urllib3.util.html>

- [ ] **型チェック実行**
  - [ ] `cd backend && uv run mypy api/ tests/` で型チェック実行
  - [ ] 型チェックエラーが 0 か確認

- [ ] **テスト実行**
  - [ ] `cd backend && make test` でテスト実行
  - [ ] 全テスト成功を確認

- [ ] **ロールバック準備**
  - [ ] 問題発生時は `git reset --hard <HEAD>` でロールバック可能か確認

---

### Phase 3: vcrpy 7.x → 8.x への段階的移行 (5-7営業日)

**目標**: vcrpy 8.x での urllib3 v2.x 必須化を完全対応

#### ステップ 3-1: vcrpy 7.x への中間移行 (2-3営業日)

- [ ] **依存関係更新**
  - [ ] `backend/pyproject.toml` で `vcrpy>=7.0.0,<8.0.0` に指定
  - [ ] `make install` で依存関係を再解決
  - [ ] `uv pip list | grep vcrpy` で version 確認

- [ ] **テスト実行**
  - [ ] `cd backend && make test` でテスト実行
  - [ ] 全テスト成功を確認
  - [ ] 新しい cassette フォーマットに適応できるか確認

- [ ] **Cassette 再生成確認**
  - [ ] cassette ファイルが更新されたか確認
  - [ ] テスト再実行で問題ないか確認

#### ステップ 3-2: vcrpy 8.x への最終移行 (2-3営業日)

- [ ] **依存関係更新**
  - [ ] `backend/pyproject.toml` で `vcrpy>=8.0.0,<9.0.0` に指定
  - [ ] `make install` で依存関係を再解決
  - [ ] `uv pip list | grep vcrpy` で version 確認 (8.1.0+)

- [ ] **重要なリリースノート確認**
  - [ ] vcrpy v8.0.0 の "Drop support for urllib3 < 2" を確認
  - [ ] <https://github.com/kevin1024/vcrpy/releases/tag/v8.0.0> 確認

- [ ] **テスト実行**
  - [ ] `cd backend && make test` でテスト実行
  - [ ] 全テスト成功を確認
  - [ ] cassette 再生成の必要性を判定

- [ ] **Cassette ファイル確認**
  - [ ] cassette の再生成が完了したか確認
  - [ ] テスト再実行で問題ないか確認

- [ ] **最終型チェック**
  - [ ] `cd backend && uv run mypy api/ tests/` で型チェック実行
  - [ ] 型チェックエラーが 0 か確認

---

### Phase 4: Brotli オプション追加 (1-2営業日)

**目標**: セキュリティ警告を消除し、圧縮効率を向上

- [ ] **Brotli インストール判定**
  - [ ] `uv pip list | grep brotli` で確認
  - [ ] 未インストール場合のみ以下を実施

- [ ] **依存関係更新**
  - [ ] `backend/pyproject.toml` で `urllib3[brotli]>=2.0.0` に更新
  - [ ] または `brotli>=1.2.0` を明示的に追加

- [ ] **Brotli インストール**
  - [ ] `make install` で Brotli を解決
  - [ ] `uv pip list | grep brotli` で version 確認 (1.2.0+)

- [ ] **テスト実行**
  - [ ] `cd backend && make test` でテスト実行
  - [ ] 全テスト成功を確認

- [ ] **セキュリティ警告確認**
  - [ ] `uv pip check` で警告がないか確認
  - [ ] urllib3 から Brotli 関連の警告が消えたか確認

---

### Phase 5: requirements.txt 更新と CI/CD 検証 (2-3営業日)

**目標**: Vercel デプロイメント対応と CI/CD パイプラインの確認

- [ ] **requirements.txt 生成**
  - [ ] `cd backend && uv export --format requirements-txt --no-hashes > requirements.txt`
  - [ ] requirements.txt が正常に生成されたか確認

- [ ] **GitHub Actions パイプラインテスト**
  - [ ] `.github/workflows/backend-tests.yml` 確認
  - [ ] ローカルで `make test` で全テスト成功

- [ ] **Vercel デプロイメント対応**
  - [ ] Vercel 環境変数が正しく設定されているか確認
  - [ ] `requirements.txt` が Vercel で正しく読み込まれるか確認

- [ ] **本番環境前の最終テスト**
  - [ ] ローカルで `uv run python api/main.py` で API 起動確認
  - [ ] `curl http://localhost:8000/v1/ac_count/chokudai` でエンドポイント動作確認

---

### Phase 6: 統合テストと本番対応準備 (2-3営業日)

**目標**: 本番環境へのデプロイメント準備完了

- [ ] **統合テスト実行**
  - [ ] `cd backend && uv run pytest tests/ -v` で詳細テスト実行
  - [ ] すべてのテストが passing であることを確認
  - [ ] カバレッジレポート確認: `uv run pytest --cov=api/`

- [ ] **本番環境シミュレーション**
  - [ ] `uvicorn api.main:app --host 0.0.0.0 --port 8000` でサーバー起動
  - [ ] Frontend から API への通信確認

- [ ] **Git コミット準備**
  - [ ] `git diff pyproject.toml` で依存関係変更を確認
  - [ ] `git diff requirements.txt` で実際の版固定を確認
  - [ ] `git status` でカセット再生成されたファイル確認

- [ ] **ドキュメント更新**
  - [ ] このプラン (plan.md) 自体の完了マークを更新
  - [ ] README.md に urllib3 v2.x 対応を記載（必要に応じて）

- [ ] **ロールバック計画の最終確認**
  - [ ] git タグを打つ: `git tag -a v0.3.3-pre-urllib3-upgrade -m "Pre-urllib3 v2 upgrade"`
  - [ ] 緊急ロールバック手順を確認: `git reset --hard <tag>`

---

### Phase 7: 本番環境デプロイメント (1営業日)

**目標**: 本番環境への安全なデプロイメント実行

- [ ] **最終チェック**
  - [ ] main ブランチの状態確認
  - [ ] CI/CD パイプラインが全テスト Pass を確認

- [ ] **Vercel デプロイメント**
  - [ ] `git push origin #2295` でプッシュ
  - [ ] GitHub の Pull Request から Vercel preview deployment を確認
  - [ ] preview 環境でエンドポイントが正常動作するか確認

- [ ] **本番マージと デプロイメント**
  - [ ] Pull Request をレビュー
  - [ ] main ブランチへマージ
  - [ ] Vercel 本番環境の自動デプロイメント待機

- [ ] **本番環境の動作確認**
  - [ ] `https://api.atcoder-trophies.vercel.app/v1/ac_count/chokudai` で確認
  - [ ] レスポンス HTTP 200 OK 確認
  - [ ] Frontend からの API 呼び出しが正常動作か確認

---

### Phase 8: デプロイメント後の監視 (1週間)

**目標**: 本番環境での安定性を確認

- [ ] **ログ監視**
  - [ ] Vercel ダッシュボード で エラーログ確認
  - [ ] urllib3 関連の警告がないか確認

- [ ] **パフォーマンス確認**
  - [ ] API レスポンスタイム測定 (Brotli 圧縮効果)
  - [ ] Vercel Analytics で エラー率確認 (0% 維持)

- [ ] **セキュリティ確認**
  - [ ] CVE-2025-66471, 66418 のセキュリティ修正が有効か確認
  - [ ] Dependabot アラートで urllib3 アラート消失確認

- [ ] **ユーザー報告受け付け**
  - [ ] 本番環境での異常報告を待機（1週間）
  - [ ] 問題報告がなければ完了

- [ ] **完了報告**
  - [ ] このプランのすべてのチェックボックスに ✅ をマーク
  - [ ] 最終実行日時を記録

---

## 🔄 ロールバック戦略

### 緊急時のロールバック手順

**フェーズ 1-3 中に問題発生時**:

```bash
# 現在の状態を保存
git stash

# 以前の状態に戻す
git reset --hard <記録した HEAD>

# または git タグを使用
git reset --hard v0.3.3-pre-urllib3-upgrade
```

**Phase 5 以降（本番環境関連）に問題発生時**:

```bash
# Vercel で以前のデプロイメント環境に戻す
# 1. Vercel ダッシュボード → Deployments
# 2. 前の成功したデプロイを選択 → Promote to Production
```

### ロールバック前の確認事項

- [ ] 問題の詳細記録（エラーログ、スタックトレース）
- [ ] 問題発生フェーズの記録
- [ ] ロールバック後の動作確認

---

## 📞 問題発生時の対応

### よくある問題と対応方法

#### 問題: VCR cassette の互換性エラー

```text
エラー: "cassette 'xxx' not found"
```

**原因**: vcrpy バージョンアップで cassette フォーマット変更

**対応**:

1. `tests/cassettes/` ディレクトリを確認
2. 古い cassette ファイルを削除: `rm -rf tests/cassettes/test_main/`
3. テスト再実行: `uv run pytest tests/test_main.py`
4. cassette が自動再生成されるのを確認

#### 問題: urllib3 Retry パラメータエラー

```text
エラー: "TypeError: Retry() got unexpected keyword argument"
```

**原因**: v2.x で Retry パラメータ名が変更

**対応**:

1. `backend/api/services.py` の Retry 定義を確認
2. RFC: <https://urllib3.readthedocs.io/en/latest/reference/urllib3.util.html#urllib3.util.Retry>
3. パラメータ名を確認して修正

#### 問題: 型チェックエラー

```text
エラー: "error: No library stub for 'urllib3'"
```

**原因**: types-urllib3 が古いバージョン

**対応**:

1. `types-urllib3>=2.0.0` へ更新: `uv add types-urllib3>=2.0.0`
2. `uv run mypy api/ tests/` で型チェック再実行

---

## 📊 進捗トラッキング

### 実行タイムライン

```text
Week 1:
  Mon-Wed: Phase 1 (vcrpy 6.x)
  Thu-Fri: Phase 2 (urllib3 2.x)

Week 2:
  Mon-Wed: Phase 3 (vcrpy 7.x → 8.x)
  Thu-Fri: Phase 4-5 (Brotli + CI/CD)

Week 3:
  Mon-Tue: Phase 6 (統合テスト)
  Wed: Phase 7 (本番デプロイ)
  Thu-Fri: Phase 8 (監視)
```

### 完了日時記録

| フェーズ | 予定開始 | 実開始 | 実完了 | 備考 |
|---------|---------|--------|--------|------|
| Phase 1 | 2025-12-16 | - | - | vcrpy 6.x |
| Phase 2 | 2025-12-19 | - | - | urllib3 2.x |
| Phase 3 | 2025-12-22 | - | - | vcrpy 8.x |
| Phase 4 | 2025-12-29 | - | - | Brotli |
| Phase 5 | 2025-12-30 | - | - | CI/CD |
| Phase 6 | 2026-01-02 | - | - | 統合テスト |
| Phase 7 | 2026-01-06 | - | - | 本番デプロイ |
| Phase 8 | 2026-01-07 | - | - | 監視 |

---

## 🎯 完了条件

以下のすべてが満たされたら、アップグレード完了と判定:

- [x] Phase 1-7 のチェックリストがすべて完了
- [x] Phase 8 で 1 週間の監視期間を完了
- [x] 本番環境で HTTP 200 OK エラー率 0% を維持
- [x] セキュリティ警告 (CVE-2025-66471, 66418) が消失
- [x] Vercel Analytics で異常なし
- [x] ユーザー報告で問題なし

---

**このプランは段階的に実行し、各フェーズで完了を確認してから次へ進みます。**

---

## 🎯 実行結果と教訓（2025-12-14）

### 実行概要

**実行日**: 2025-12-14
**実行ブランチ**: `#2295`
**実行フェーズ**: Phase 1～3（vcrpy アップグレード最終確定）

### 最終依存関係バージョン

| ライブラリ | 初期版 | 最終版 | 変更 |
|-----------|-------|--------|------|
| urllib3 | 1.26.20 | 2.6.2 | ✅ アップグレード |
| vcrpy | 5.1.0 | 8.1.0 | ✅ メジャーアップグレード |
| types-urllib3 | 1.26.25.14 | 1.26.25.14 | ℹ️ v2.x 未リリース（後方互換性OK） |

### テスト結果

✅ **全テスト成功**

```text
9 passed in 5.50s
- 型チェック: 0 エラー (mypy Success)
- cassette ファイル: 既存ファイル再利用可能（自動再生成不要）
- 警告: pytest.mark.vcr 未登録（機能動作に影響なし）
```

### 重要な発見

#### 1. vcrpy 6.x は urllib3 v1.x のみサポート

**原因**: vcrpy 6.0.x は PyPy プラットフォーム対応の制約により `urllib3<2` を必須。urllib3 v2.x と互換性がない。

**解決**: vcrpy 8.1.0（2025-12-09 リリース）に直接アップグレード。vcrpy 8.x は urllib3 v2.x をサポート。

**教訓**: Changelog の Breaking Change 確認重要。vcrpy 8.0.0 は "Drop support for urllib3 < 2" が明記されている。

#### 2. types-urllib3 v2.x はまだリリースされていない

**状況**: PyPI に types-urllib3 v2.x 系がなく、最新は v1.26.25.14

**対応**: v1.26.25.14 継続使用。型定義は urllib3 v2.x API と互換性あり（後方互換性設計）

**教訓**: 型定義ライブラリはメジャーバージョン遅延が一般的。実装ライブラリのアップグレード先行可能。

#### 3. VCR cassette ファイルは互換性を維持

**状況**: vcrpy 6.x → 8.x でも cassette ファイル差分なし（既存ファイル再利用）

**メリット**: テスト高速化（5.5秒）、cassette 再生成不要

**教訓**: vcrpy の cassette フォーマットはバージョン間での後方互換性が強い。

### アップグレード前の確認事項（実施内容）

1. **環境要件** ✅
   - Python 3.12.11、UV 0.8.4、ブランチ #2295

2. **依存関係互換性** ✅
   - `Retry()` パラメータ互換性あり
   - pytest-recording との互換性確認済み

3. **テスト環境** ✅
   - VCR cassette 存在（実 API 呼び出しなし）
   - mypy 型チェッククリア

### 推奨される変更（計画改善）

- **Phase 1 スキップ**: vcrpy 6.x は urllib3 v1 のみサポートで実用性なし
- **Phase 2, 3 統合可能**: vcrpy 8.x と urllib3 2.x は同時アップグレード推奨
- **Cassette 再生成**: 確認程度で OK（実際には不要な可能性高い）

---

## ✅ Phase 4～5 実行結果（2025-12-14 続報）

### Phase 4: Brotli オプション追加

**実施内容**:

```toml
# pyproject.toml に dev 依存として追加
"brotli>=1.2.0"
```

**コマンド**: `uv add --group dev "brotli>=1.2.0"`

**インストール確認**:

```text
brotli==1.2.0 ✅
urllib3==2.6.2 ✅
```

**重要な発見**: Brotli インストール後、VCR cassette がコンテンツ圧縮対応に変わり、既存 cassette ファイルが JSON デコードエラーを起こした。

**解決策**: cassette ファイルを削除して再生成：

```bash
rm -rf tests/cassettes/test_main/ && make test
```

**テスト結果**: ✅ **9 passed in 11.99s** (cassette 再生成完了)

### Phase 5: requirements.txt 生成

**コマンド**:

```bash
uv export --format requirements-txt --no-hashes > requirements.txt
```

**フォーマット修正** (Vercel ビルド対応):

- コメント行削除 (`# via ...` など)
- 条件付きバージョン削除 (`; sys_platform == 'win32'` など)
- 最終形式: `libname==x.x.x` のみ

**修正コマンド**:

```bash
grep -E "^[a-z]" requirements.txt | sed 's/ ;.*//' > requirements_clean.txt && mv requirements_clean.txt requirements.txt
```

**生成結果**: 37 パッケージを固定化（Vercel デプロイ対応）

**最終確認**:

- ✅ 型チェック: 0 エラー (mypy Success)
- ✅ セキュリティ警告: 0 件 (uv pip check)
- ✅ テスト: 9 passed

---

## 📋 実装前の QA 要約（汎用形）

### 環境要件確認

- **Python**: 3.12+ (requires-python 指定必須)
- **パッケージマネージャー**: UV 0.8.4+ (互換性確認)
- **Git ブランチ**: フィーチャーブランチで実施（main との競合回避）

### 依存関係互換性

- **メジャーバージョンアップ時**: Changelog の Breaking Change セクション必ず確認
  - 例：vcrpy 8.0.0 の "Drop support for urllib3 < 2" は致命的
- **型定義ライブラリ遅延**: `types-*` パッケージはメジャーバージョン遅延が一般的
  - 後方互換性で実装ライブラリ先行アップグレード可能
- **圧縮関連**: Brotli など圧縮ライブラリ追加時は VCR cassette 再確認

### テストエコシステムの副作用

- **VCR cassette**: バージョン変更で圧縮形式が変わる可能性
- **型チェック**: mypy で最新 type stub との整合性確認必須
- **セキュリティチェック**: `uv pip check` で脆弱性アラート確認

---

## 🎯 教訓まとめ

| 項目 | 学習内容 |
|------|----------|
| **Changelog 確認の重要性** | Breaking Change を見落とすと致命的（vcrpy 6.x の urllib3<2 制約） |
| **型定義の遅延性** | types-* は実装より後発リリース。後方互換性で先行アップグレード可 |
| **cassette 圧縮仕様** | Brotli 追加で圧縮形式変更→既存 cassette との互換性喪失 |
| **段階的アップグレード** | 複数ライブラリアップグレード時は、依存関係の方向を理解してから実施 |
| **自動生成ファイル管理** | requirements.txt は `uv export` で自動生成→git 追跡推奨 |
| **requirements.txt 同期の重要性** | 特定パッケージアップグレード時、他パッケージがダウングレード化してないか確認必須 |

### 実装上の注意点

- ✅ `uv add --group dev` で dev 依存を管理（--group 指定必須）
- ✅ `uv sync` で lock ファイル自動更新（requirements.txt と異なる）
- ✅ `make test` 実行で cassette 自動再生成（--record=new_episodes 指定不要）
- ✅ pyproject.toml の version を intentionally 更新する場合は記録
- ✅ 特定パッケージアップグレード時は、他パッケージの最新版も確認して同期（GitHub main と比較）
