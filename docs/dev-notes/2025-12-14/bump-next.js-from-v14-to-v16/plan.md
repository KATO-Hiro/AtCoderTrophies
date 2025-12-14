# Next.js を v14 → v16 へ段階アップグレード（Pages Router 継続）

## 背景 / 目的

- `frontend` の Next.js を `14.2.32` → `16.0.10` に段階更新し、セキュリティ修正ラインへ追従する
- Next の要件に合わせて React も更新し、MUI/Emotion/SWR 等の互換を維持する
- デプロイは **Vercel** 前提
- **Pages Router 継続**（`frontend/src/pages` を維持）

## 対象外のタスク

- App Router への全面移行（`src/app` への移行）
- 機能追加 / UI 改修
- Next 16 の App Router 向け新機能（Cache Components / PPR / Server Actions 等）の導入

---

## 現状（リポジトリ実態）

- Router: Pages Router（`frontend/src/app/**` は存在しない）
- `next/head` 使用: `frontend/src/pages/_app.tsx`
- Emotion SSR: `frontend/src/pages/_document.tsx`（`@emotion/server/create-instance`）
- GA: `frontend/src/components/GoogleAnalytics/GoogleAnalytics.tsx`（`next/script`）
- Link ラッパー: `frontend/src/components/MuiNextLink/MuiNextLink.tsx`
- `next.config.js`: `webpack`（alias `~`）＋ `experimental.turbo`（= turbopack設定）＋ `transpilePackages`
- TS path alias: `frontend/tsconfig.json` に `~/* -> src/*`
  - ただし現状コード検索では `~/*` import は見つからない（=削除影響は小さい可能性）

---

## Next.js / React の要約 + 本プロジェクトでの方向性

### Next.js（v14→v16）

- 方向性（公式）: App Router を中心に最新機能が拡張される一方、Pages Router も引き続きサポート（ただし推奨は App Router）
- 本PJの方向性: 今回は「セキュリティ追従・基盤更新（Next/React/ビルド設定）」を最優先し、App Router 移行は別課題として切り出す

### React（v18→v19系）

- 方向性（周辺状況）: Next 15/16 の要求に合わせて React 19 系へ追従する必要が出る
- 本PJの方向性: React の破壊的変更を Next 16 と同時に抱えない（Next 15 フェーズで段階的に吸収する）

---

## 破壊的変更（関連ライブラリ含む）と本PJへの影響
>
> “影響あり/なし” は **現状コード実態**（検索・読み取り）に基づく暫定。

### Next.js 15 で当たりそうなもの

- `next/head` の挙動厳格化（Pages Router でも影響し得る）
  - 影響箇所: `frontend/src/pages/_app.tsx` の `<Head>`
  - 想定症状: hydration warning / head 要素の重複や順序差分が顕在化
  - 対応方針: warning を観測し、必要最小限で Head 構造を整理（ページ側へ寄せる等）

### Next.js 16 で当たりそうなもの（最重要）

- **Turbopack が `next dev` / `next build` の既定**（ガイド明記）
  - 重要ポイント: custom `webpack` config がある状態で `next build`（既定Turbopack）を実行すると、ビルド失敗になり得る（誤設定防止）
  - 本PJは `next.config.js` に `webpack:` があるため、このまま Next16 へ上げるのは危険
- `experimental.turbopack`（= `experimental` 配下）からの移行
  - 本PJは `experimental.turbo` を持っているため、Next16 のガイドに従い整理が必要
- `next lint` コマンド削除（Next16）
  - 本PJは Biome を利用しているため影響は小（`next lint` に依存していない前提）

### React 19 / 型 / MUI・Emotion（互換リスク）

- 影響が出やすい箇所:
  - Emotion SSR（`_document.tsx`）＋ MUI/Emotion の組み合わせ
  - `@types/react` / `@types/react-dom` 更新に伴う型エラー
- 方針:
  - React は **Next 15 フェーズで React 19 へ**上げ、そこで破壊的変更を収束させる
  - Next 16 フェーズは “Turbopack既定化対応” を主目的として、React 変更は原則据え置く

---

## Pages Router を選択した根拠と App Router との比較

### 根拠（結論）

- Pages Router は新しい Next.js でも “still supported”（公式 docs）
- 今回の目的（セキュリティ追従・基盤更新）に対し、App Router への移行はコスト/リスクが相対的に大きい
- よって今回は **Pages Router 継続が合理的**（App Router は別課題化）

### 比較（今回のPJ視点）

- Pages Router の利点
  - 変更を局所化でき、段階アップグレードがやりやすい（差分の切り分けが容易）
  - 既存の `_document.tsx` ベースの Emotion SSR を維持しやすい
- App Router の利点（一般論）
  - RSC / Server Actions / Cache Components / PPR など Next の最新機能を活用できる
- App Router のコスト/リスク（本PJへの影響）
  - データ取得（`getStaticProps` など）やページ構造の置換が必要
  - Head/Meta/Document 周りの設計変更が発生しやすい
  - ルーティング/レイアウト再設計が必要になりやすい

---

## 作業計画（段階移行）

### Step 0: ベースライン確立

- 代表的な確認観点を固定（差分検出のため）
  - `pnpm dev` 起動
  - `pnpm build` 成功
  - 代表ページ目視（トップ、一覧系、`/about` 等）
  - Console warning（特に hydration / head）
  - GA の読み込み（Network/Console）

### Step 1: Next 14 のパッチ更新（安全な土台づくり）

- 目的: major 前にセキュリティ修正ラインへ追従し、影響を小さく分離
- 作業:
  - `next@14.2.35` へ更新
  - `dev/build` 確認

教訓:

- patch 更新でも lockfile が動き得るため、差分確認と `dev/build` を必ずセットにする

### Step 2: Next 15 へ更新（+ React 19 を段階的に吸収）

- 目的: Next 15 の breaking と React 19 の破壊的変更を **ここで** 収束（Next16と分離）
- 作業:
  - Next を `15.x (実装時点の latest)` へ更新
  - React を **React 19 系へ更新**（`react`, `react-dom`, `@types/react`, `@types/react-dom`）
  - 重点確認:
    - `next/head` に起因する warning/hydration
    - Emotion SSR（`_document.tsx`）の崩れ（style 注入順/HTML差分）
    - GA / Link ラッパーの挙動
- 備考:
  - ここで問題が出るなら、まず依存（MUI/Emotion）側の追従可否を確認し、必要なら“Reactの更新を止めて Next 15 側のみ先行”なども検討する

教訓:

- Next 15 では `experimental.turbo` の非推奨 warning と、`webpack` 設定が残っていることによる Turbopack との不整合 warning が出るため、Step 3 で `next.config.js` の整理が必須
- `dev` と `build` の両方で最低限のページ/API を確認してから次ステップへ進む

### Step 3: Next 16.0.10 へ更新（Turbopack既定化対応がメイン）

- 目的: `16.0.10` へ到達し、既定挙動変更に適応する
- 作業（必須）:
  - Next を `16.0.10` に更新
  - `package.json` の `next dev --turbo` を `next dev` に戻す（Turbopack既定のため）
  - `next.config.js` の `experimental.turbo` を整理（ガイドに沿ってトップレベル `turbopack` へ移す or 不要なら削除）
- ユーザー決定（Turbopackへ寄せる / 1:C）に基づく作業:
  - `next.config.js` の `webpack:` を撤去し、Turbopack既定の `next build` を通す
  - alias `~` は以下の順で最小対応:
    - まず `tsconfig paths (~/*)` の標準サポートで解決できるか確認（=最小）
    - もし不足があれば `turbopack.resolveAlias` を追加して補完（ガイドの “Resolve alias” 方式）

---

## ロールバック方針

- Step 1/2/3 を PR 分割し、問題が出たら「直前の安定ステップ」へ戻せるようにする

---

## 今後の課題として App Router への移行

- 目的（別イシュー）:
  - RSC / Server Actions / Cache Components 等の価値が本PJに合うか評価
- 進め方（別イシューで検討）:
  - 1ページ（例: `/about`）で PoC
  - MUI/Emotion の App Router 前提の SSR 方針を調査
  - 移行コスト（ルーティング/レイアウト/SEO/計測）の見積もり

---

## 出典

- Next.js 16 blog: <https://nextjs.org/blog/next-16>
- Next.js v16 upgrade guide: <https://nextjs.org/docs/app/guides/upgrading/version-16>
- Pages Router docs: <https://nextjs.org/docs/pages>
- Next.js Security Update (2025-12-11): <https://nextjs.org/blog/security-update-2025-12-11>
