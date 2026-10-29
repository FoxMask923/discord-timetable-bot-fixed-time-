# Discord Timetable Bot

一個輕量級的 Discord 定時提醒機器人。時間表寫在程式碼裡，到點自動在指定頻道發送訊息（可 @ 指定使用者）。

---

## 功能

- 按 `HH:mm` 定時發送訊息
- 可設定只在星期幾發送
- 可 @ 指定使用者
- 香港時區（UTC+8）固定，本機和雲端行為一致

---

## 前置要求

- 一台電腦（Windows / macOS / Linux 均可）
- 安裝 [Node.js](https://nodejs.org)（選 **LTS 版本**，安裝時一路「下一步」即可）
- 一個 Discord 帳號

安裝完成後開啟終端機（macOS/Linux）或命令提示字元（Windows），輸入以下指令確認安裝成功：

```bash
node -v
npm -v
```

兩個都顯示版本號（例如 `v20.x.x`、`10.x.x`）即可。

---

## 第一步：下載程式碼

**方式 A：直接下載 ZIP（推薦新手）**

1. 開啟本專案頁面
2. 點擊綠色 **Code** 按鈕 → **Download ZIP**
3. 解壓縮到一個你找得到的資料夾，例如 `Downloads/discord-timetable-bot`

**方式 B：用 Git 複製**

```bash
git clone https://github.com/你的使用者名稱/discord-timetable-bot.git
cd discord-timetable-bot
```

---

## 第二步：建立你自己的 Discord 機器人

1. 開啟 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 **New Application**，輸入名稱（例如 `My Timetable Bot`），點 **Create**
3. 左側選單點 **Bot**
4. 點擊 **Reset Token** → **Copy**，把 Token **先貼在記事本裡備用**（這串是密碼，不要發給任何人）
5. 在同一個頁面往下滑，找到 **Privileged Gateway Intents**，把下面三個開關**全部打開**：
   - ✅ Message Content Intent
   - ✅ Server Members Intent
   - ✅ Presence Intent
6. 點擊頁面底部 **Save Changes**

---

## 第三步：邀請機器人進你的伺服器

1. 左側選單點 **OAuth2** → **URL Generator**
2. 在 **Scopes** 勾選：
   - ✅ `bot`
   - ✅ `applications.commands`
3. 下方 **Bot Permissions** 勾選：
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Mention Everyone（要 @ 使用者時需要）
4. 滑到頁面底部，複製生成的 URL
5. 用瀏覽器開啟這個 URL，選擇你的伺服器 → **Authorize** → 完成驗證

> ⚠️ 你必須是該伺服器的管理員，或擁有「管理伺服器」權限。

---

## 第四步：安裝依賴套件

在專案資料夾裡開啟終端機：

- **macOS**：在 VS Code 裡開啟資料夾後，頂部選單 **Terminal → New Terminal**
- **Windows**：在資料夾網址列輸入 `cmd` 按 Enter

輸入：

```bash
npm install
```

看到 `added XX packages` 就代表完成。

---

## 第五步：建立 `.env` 檔案

在專案根目錄新建一個檔案，檔名就叫 `.env`（**前面有一個點，沒有副檔名**）。

> 💡 專案裡已附上 `.env.example` 範本，你也可以直接複製一份並改名：
> ```bash
> cp .env.example .env
> ```

內容只有一行：
```
TOKEN=你第二步複製的那串Token
```

⚠️ 注意事項：
- 等號兩邊**不要有空格**
- Token **不要加引號**
- 這個檔案**絕對不要上傳到 GitHub**

---

## 第六步：修改時間表和頻道 ID

開啟 `index.js`，找到 `schedules` 這一段：

```javascript
const schedules = [
    {
        time: '08:00',              // 24 小時制 HH:mm
        days: [1, 2, 3, 4, 5],      // 0=週日, 1=週一 ... 6=週六；不寫則每天
        channelId: '你的頻道ID',
        message: '🌞 早安！該起床啦'
    }
];
```

### 如何取得頻道 ID

1. Discord 使用者設定 → **進階** → 開啟 **開發者模式**
2. 在你想發訊息的**文字頻道**上按右鍵 → **複製頻道 ID**
3. 會得到一串**純數字**（例如 `1234567890123456789`），填進 `channelId`

### 如何 @ 某個人

1. 在該使用者的頭像或名稱上按右鍵 → **複製使用者 ID**
2. 在 message 裡用 `<@使用者ID>` 格式：

```javascript
message: '<@123456789012345678> 🌙 該睡覺了，晚安'
```

> 直接寫 `@使用者名稱` 是沒用的，Discord 不會解析，必須用 `<@數字ID>`。

---

## 第七步：啟動機器人

在終端機輸入：

```bash
node index.js
```

看到以下輸出代表成功：

```
injected env (1) from .env
✅ 已登入為 你的機器人名#1234

📁 server: 你的伺服器名 (xxxxx)
   💬 channel: 一般 (1234567890123456789)
```

> 如果顯示 `injected env (0)`，表示 `.env` 沒讀到，請檢查檔名和內容格式。
> 如果顯示 `⚠️ Channel not found`，表示 `channelId` 填錯了，從終端機印出的頻道列表裡重新複製。

---

## 常見問題

**Q：機器人顯示離線？**
A：確認終端機裡 `node index.js` 正在執行且沒有錯誤。關掉終端機機器人就會離線。

**Q：時間到了但沒發訊息？**
A：檢查三個地方：`time` 是否用 24 小時制、`days` 是否包含今天、`channelId` 是否是純數字。

**Q：改了程式碼怎麼生效？**
A：終端機按 `Ctrl + C` 停止，再重新執行 `node index.js`。

**Q：想 24 小時在線？**
A：本機關機就停了，需要部署到雲端平台（例如 Kerit Cloud、Wispbyte）。部署時把 `TOKEN` 填到平台的「環境變數」設定裡，不要上傳 `.env`。

---

## 專案結構

## 專案結構

```
discord-timetable-bot/
├── index.js          # 主程式（時間表、發送邏輯）
├── package.json      # 專案依賴
├── .env              # 你的 Token（不要上傳）
├── .gitignore        # 忽略 node_modules 和 .env
├── README.md         # 語言選擇入口
├── README.en.md      # 英文版說明
└── README.zh-TW.md   # 繁體中文版說明
```

---

## 授權

MIT License，可自由使用和修改。