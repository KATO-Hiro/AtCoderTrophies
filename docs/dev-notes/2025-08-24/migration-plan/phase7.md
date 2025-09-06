# ステップ 7: Vitest 導入

## セットアップ

```bash
cd frontend
yarn add -D vitest @vitejs/plugin-react jsdom
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## 設定ファイル

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

## package.json スクリプト追加

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
