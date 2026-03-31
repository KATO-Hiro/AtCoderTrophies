# axios → 標準 Fetch API 置き換え計画

**作成日**: 2026-03-31

---

## 📌 概要

フロントエンドで HTTP リクエストに使用している `axios` を、Next.js / ブラウザにネイティブ実装されている `fetch` API に置き換える。

**対象ファイル**:

- `frontend/src/utils/APIClient/apiClient.ts`
- `frontend/src/utils/AtCoderProblemsAPIClient/statisticsAPIFetcher.ts`
- `frontend/package.json`
- `frontend/pnpm-lock.yaml`（`pnpm remove axios` で自動更新）

**目的**:

- 外部依存を削減してバンドルサイズを削減
- Next.js 16 + Node.js 22 環境では `fetch` がグローバルに存在するため axios は不要

---

## 🔴 axios と fetch の互換性

| 項目                   | axios                                                       | fetch                                              |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| レスポンス本体         | `response.data`（Content-Type に応じて自動デシリアライズ）  | `response.json()` / `response.text()` を手動で選択 |
| HTTP エラー（4xx/5xx） | **例外を投げる**                                            | **投げない**（`response.ok === false` になるだけ） |
| ネットワークエラー     | 例外を投げる                                                | 例外を投げる                                       |
| import                 | `import axios from 'axios'`                                 | 不要（グローバル）                                 |

**重要な差異**: `statisticsAPIFetcher.ts` の `try/catch` は axios が 4xx/5xx で例外を投げることを前提にしている。`fetch` では HTTP エラーが例外にならないため、`if (!response.ok) throw` を追加しないと catch ブロックが動作しなくなる。

---

## 🐛 不具合と修正計画（2026-03-31 発覚）

### 原因

`apiClient.ts` の `fetcher` で `response.json()` を使ったが、`/api/v1/atcoder` エンドポイントは **SVG を `image/svg+xml` で返す**（`res.send(trophyFrame.render(...))`）。

`response.json()` は SVG テキストを JSON としてパースしようとするため `SyntaxError` が発生する。

### 根本原因

axios の `response.data` は Content-Type に応じて自動的にデシリアライズされる（`text/...` → 文字列、`application/json` → オブジェクト）。  
一方 `fetch` は `response.json()` / `response.text()` を **明示的に使い分けが必要**で、この確認を怠った。

### 修正内容

**`frontend/src/utils/APIClient/apiClient.ts`**

```typescript
// 修正前（誤り）
return (await response.json()) as string;

// 修正後（正しい）
return await response.text();
```

`statisticsAPIFetcher.ts` は JSON API（`application/json`）を返す `ATCODER_PROBLEMS_STAT_API_URL` を呼んでいるため、`response.json()` のままで問題なし。

---

## ✅ 実装チェックリスト

### Step 1: `apiClient.ts` の修正

**ファイル**: `frontend/src/utils/APIClient/apiClient.ts`

- [x] `import axios from 'axios'` を削除
- [x] `axios.get(url)` → `fetch(url)` に変更
- [x] `response.data` → `(await response.json())` に変更
- [x] `if (!response.ok)` ガードを追加（SWR が HTTP エラーを `error` として受け取れるよう）

**変更後の fetcher 関数**:

```typescript
async function fetcher(url: string): Promise<string | null> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return (await response.json()) as string;
}
```

---

### Step 2: `statisticsAPIFetcher.ts` の修正

**ファイル**: `frontend/src/utils/AtCoderProblemsAPIClient/statisticsAPIFetcher.ts`

- [x] `import axios from 'axios'` を削除
- [x] `axios.get(url)` → `fetch(url)` に変更
- [x] `response.data` → `(await response.json())` に変更
- [x] `if (!response.ok) throw` を `try` ブロック内に追加（既存の catch が HTTP エラーを捕捉できるよう）

**変更後の try ブロック**:

```typescript
try {
  const response = await fetch(ATCODER_PROBLEMS_STAT_API_URL(userName));

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  results = (await response.json()) as AtCoderProblemsStatAPI;
} catch (error) {
  // TODO: Enable to output log.
  console.log(error);
  return null;
}
```

---

### Step 3: `package.json` から axios を削除

**ファイル**: `frontend/package.json`

- [x] `"axios": "^1.11.0"` の行を削除

---

### Step 4: pnpm でロックファイルを更新

```bash
cd frontend && pnpm remove axios
```

- [x] `pnpm-lock.yaml` から axios エントリが削除されることを確認
- [x] `node_modules` から axios が削除されることを確認

---

## 🔍 検証

```bash
cd frontend

# axios の残留参照がないか確認
grep -r "axios" src/   # 結果が空であること

# Biome チェック
pnpm check

# ビルド
pnpm build
```

---

## 📝 教訓

- **fetch は HTTP エラーを例外にしない**: axios と異なり、4xx/5xx でも `response.ok === false` になるだけで例外は投げられない。`try/catch` で HTTP エラーを捕捉したい箇所では `if (!response.ok) throw` を必ず追加する。
- **pnpm remove で package.json とロックファイルを同時更新**: package.json の手動編集は不要。`pnpm remove axios` 一コマンドで完結する。
- **ネイティブ API への移行は段階的に確認**: axios 残留参照を `grep -r "axios" src/` で確認してからビルドチェックに進むことで、見落としを防げる。

---

## 📊 影響範囲

| ファイル                      | 変更                       | 呼び出し元への影響                                                |
| ----------------------------- | -------------------------- | ----------------------------------------------------------------- |
| `apiClient.ts`                | fetcher 内部の実装のみ変更 | `useTrophySVGIcons` の戻り値型変わらず → 影響なし                 |
| `statisticsAPIFetcher.ts`     | 内部実装のみ変更           | `Promise<AtCoderProblemsStatAPI \| null>` の型変わらず → 影響なし |
| `atCoderProblemsAPIClient.ts` | 変更なし                   | —                                                                 |
