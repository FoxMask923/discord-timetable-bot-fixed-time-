# Discord Timetable Bot

A lightweight Discord bot that sends scheduled reminder messages at fixed times. Schedules are hard-coded — no user input required. Built with `discord.js`.

---

## Features

- Send messages at fixed `HH:mm` times
- Optionally restrict to specific weekdays
- Mention specific users
- Fixed to Hong Kong time (UTC+8) — identical behaviour locally and in the cloud

---

## Prerequisites

- A computer (Windows / macOS / Linux)
- [Node.js](https://nodejs.org) installed (**LTS version** — just click "Next" through the installer)
- A Discord account

After installing, open a terminal (macOS/Linux) or Command Prompt (Windows) and run:

```bash
node -v
npm -v
```

Both should print a version number (e.g. `v20.x.x`, `10.x.x`).

---

## Step 1: Download the code

**Option A: Download ZIP (recommended for beginners)**

1. Open this repository page
2. Click the green **Code** button → **Download ZIP**
3. Extract it to a folder you can find easily, e.g. `Downloads/discord-timetable-bot`

**Option B: Clone with Git**

```bash
git clone https://github.com/your-username/discord-timetable-bot.git
cd discord-timetable-bot
```

---

## Step 2: Create your own Discord bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**, enter a name (e.g. `My Timetable Bot`), then **Create**
3. In the left sidebar, click **Bot**
4. Click **Reset Token** → **Copy**, and **paste it into a notepad for now** (this is a password — never share it)
5. Scroll down on the same page to **Privileged Gateway Intents** and turn on all three:
   - ✅ Message Content Intent
   - ✅ Server Members Intent
   - ✅ Presence Intent
6. Click **Save Changes** at the bottom of the page

---

## Step 3: Invite the bot to your server

1. In the left sidebar, click **OAuth2** → **URL Generator**
2. Under **Scopes**, tick:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Under **Bot Permissions**, tick:
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Mention Everyone (needed if you want to @ users)
4. Scroll to the bottom and copy the generated URL
5. Open the URL in your browser, select your server → **Authorize** → complete the captcha

> ⚠️ You must be an administrator of that server, or have the "Manage Server" permission.

---

## Step 4: Install dependencies

Open a terminal inside the project folder:

- **macOS**: open the folder in VS Code, then **Terminal → New Terminal**
- **Windows**: type `cmd` in the folder's address bar and press Enter

Run:

```bash
npm install
```

Seeing `added XX packages` means it worked.

---

## Step 5: Create the `.env` file

In the project root, create a file named exactly `.env` (note the leading dot, no extension).

> 💡 A template named `.env.example` is included. You can copy it directly:
> ```bash
> cp .env.example .env
> ```

It should contain a single line:

⚠️ Important:
- No spaces around the `=`
- Do not wrap the token in quotes
- **Never upload this file to GitHub**

---

## Step 6: Edit the schedule and channel ID

Open `index.js` and find the `schedules` section:

```javascript
const schedules = [
    {
        time: '08:00',              // 24-hour format HH:mm
        days: [1, 2, 3, 4, 5],      // 0=Sunday, 1=Monday ... 6=Saturday; omit to run every day
        channelId: 'YOUR_CHANNEL_ID',
        message: '🌞 Good morning! Time to wake up'
    }
];
```

### How to get a channel ID

1. Discord User Settings → **Advanced** → enable **Developer Mode**
2. **Right-click** the text channel you want messages in → **Copy Channel ID**
3. You'll get a plain number (e.g. `1234567890123456789`) — paste it into `channelId`

### How to mention a user

1. Right-click the person's avatar or name → **Copy User ID**
2. Use the `<@USER_ID>` format in your message:

```javascript
message: '<@123456789012345678> 🌙 Time for bed, good night'
```

> Typing `@username` as plain text does **not** work — Discord will not resolve it. You must use `<@number_id>`.

---

## Step 7: Start the bot

In the terminal, run:

```bash
node index.js
```

Success looks like this:

```
injected env (1) from .env
✅ Logged in as YourBotName#1234

📁 server: Your Server Name (xxxxx)
   💬 channel: general (1234567890123456789)
```

> If you see `injected env (0)`, the `.env` file wasn't read — check its filename and format.
> If you see `⚠️ Channel not found`, the `channelId` is wrong — copy it again from the channel list printed above.

---

## FAQ

**Q: The bot shows as offline?**
A: Make sure `node index.js` is still running in your terminal without errors. Closing the terminal takes the bot offline.

**Q: The time passed but no message was sent?**
A: Check three things: `time` uses 24-hour format, `days` includes today, and `channelId` is a plain number.

**Q: How do I apply code changes?**
A: Press `Ctrl + C` in the terminal to stop, then run `node index.js` again.

**Q: How do I keep it online 24/7?**
A: Your computer must stay on for it to run. To run it around the clock, deploy to a cloud host (e.g. Kerit Cloud, Wispbyte). When deploying, put `TOKEN` in the platform's "Environment Variables" settings — do not upload `.env`.

---

## Project structure

```
discord-timetable-bot/

├── index.js # Main program (timetable, sending logic)
├── package.json # Project dependencies
├── .env # Your Token (Do not upload)
├── .gitignore # Ignore node_modules and .env
├── README.md # Language selection entry
├── README.en.md # English version instructions
└── README.zh-TW.md # Traditional Chinese version instructions

```

---

## License

MIT License — free to use and modify.
