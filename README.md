# NFT 管理平台

[查看 Demo](https://nftsideproject.vercel.app/)

一個基於 Solana 區塊鏈 的 NFT 管理平台，支援 NFT 的 鑄造、查看、管理與分類，整合 Helius API（主網＋測試網），可即時管理 Solana 上的資產。

主鍊錢包地址 : 86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY

## 主要功能

✅ NFT 鑄造（Mint)
🔍 NFT 詳情頁
🧑‍🎨 創作者資產管理 — 查看與管理由創作者地址生成的 NFT
📋 所有權檢視 — 依錢包地址查詢擁有的 NFT 清單

## 技術架構

### 前端技術

- Vue 3
- TypeScript
- Vuetify
- Tailwind CSS
- Pinia（狀態管理）
- Vue Router

### 區塊鏈技術

- Solana Web3.js
- Metaplex
- SPL Token
- Bundlr Network

## 專案結構

```
src/
├── api/          # API 接口
├── assets/       # 靜態資源
├── components/   # 可复用組件
├── config/       # 配置文件
├── hooks/        # 自定義鉤子
├── layout/       # 布局組件
├── mocks/        # 模擬數據
├── router/       # 路由配置
├── stores/       # 狀態管理
├── style/        # 樣式文件
├── types/        # TypeScript 類型定義
├── utils/        # 工具函數
└── views/        # 頁面組件
```

## 主要頁面

- `/owner` - NFT 列表頁面
- `/creator` - 創作者管理頁面
- `/series` - NFT 系列管理頁面
- `/nft/:id` - NFT 詳情頁面
- `/mint` - NFT 鑄造頁面

## API 功能

- 獲取所有者資產
- 獲取創作者資產
- 搜索資產

## 開發環境設置

### 推薦的 IDE 設置

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（並禁用 Vetur）

### 專案設置

```sh
# 安裝依賴
npm install

# 開發環境運行
npm run dev

# 生產環境構建
npm run build

# 代碼檢查
npm run lint
```

## 環境要求

- Node.js
- npm 或 yarn
- Solana CLI（可選，用於本地開發）

## 配置說明

專案使用 `.env` 文件進行環境配置，請確保設置以下必要的環境變量：

- `VITE_SOLANA_RPC_URL` - Solana RPC 節點 URL
- `VITE_BUNDLR_NETWORK` - Bundlr 網絡配置

## 注意事項

- 請確保在使用前已正確配置 Solana 錢包
- 建議在測試網絡上進行開發和測試
- 請注意保護私鑰和敏感信息

## 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 授權

[MIT License](LICENSE)
