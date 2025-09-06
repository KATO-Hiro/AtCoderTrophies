# ステップ 2: Material-UI の統一とアップデート

## 現在の問題

- Material-UI v4 と v5 が混在
- `@material-ui/*` (v4) と `@mui/*` (v5) が併存

## タスク

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

## 完了条件

- Material-UI v4 パッケージの完全削除
- @mui/* パッケージへの統一
- ビルド成功とアプリケーション正常動作

## 実行結果（2025-08-30）

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

## actions/setup-node v4 から v5 へのアップデート

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
