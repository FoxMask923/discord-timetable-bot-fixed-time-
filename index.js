const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        status: 'online',
        activities: [
            {
                name: 'timetable robot(时间表机器人)',
                type: ActivityType.Watching
            }
        ]
    }
    
});

// ====== Time Zone Setting (Hong Kong UTC+8) ======
const TIMEZONE_OFFSET = 8;

// ====== Timetable ======
const schedules = [
    {
        time: '',              // 24-hour system HH:mm
        days: [],      // 0 = Sunday, 1 = Monday ... 6 = Saturday
        channelId: '',
        message: ''
    },
    {
        time: '',              // Not writing "days" means every day.
        channelId: '',
        message: ''
    }
];

// Record has been sent; please avoid sending duplicates within the same minute.
const sentLog = new Set();
let sentLogDate = null;

// get Hong Kong time
function getHKTime() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + TIMEZONE_OFFSET * 3600000);
}

// Check schedules and send messages if the time matches
function checkSchedules() {
    const now = getHKTime();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hh}:${mm}`;
    const today = now.getDay();
    const dateKey = now.toDateString();

    // Clear sentLog if the date has changed
    if (dateKey !== sentLogDate) {
        sentLog.clear();
        sentLogDate = dateKey;
    }

    schedules.forEach((s, index) => {
        if (s.time !== currentTime) return;                    // the time doesn't match
        if (s.days && !s.days.includes(today)) return;         // the day doesn't match

        const key = `${dateKey}-${index}`;
        if (sentLog.has(key)) return;                          // already sent today

        const channel = client.channels.cache.get(s.channelId);
        if (channel) {
            sentLog.add(key);
            channel.send(s.message)
                .then(() => console.log(`sent(已发送): ${s.message}`))
                .catch(error => {
                    sentLog.delete(key);
                    console.error(`Send failed(发送失败): ${s.message}`, error);
                });
        } else {
            console.log(`⚠️ Channel not found(找不到频道): ${s.channelId}`);
        }
    });
}

client.once('clientReady', () => {
    console.log(`✅ longged in as (已登入) ${client.user.tag}`);

    //Debugging: List all server and channel IDs
    client.guilds.cache.forEach(guild => {
        console.log(`\n📁 server: ${guild.name} (${guild.id})`);
        guild.channels.cache.forEach(ch => {
            if (ch.isTextBased()) {
                console.log(`   💬 channel: ${ch.name} (${ch.id})`);
            }
        });
    });
    checkSchedules();                        // Check immediately upon startup
    setInterval(checkSchedules, 1000);       // Check every second to avoid missing full minutes
});


client.login(process.env.TOKEN);