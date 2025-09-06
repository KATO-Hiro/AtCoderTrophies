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
