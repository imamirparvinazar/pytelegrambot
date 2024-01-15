const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = '6812587488:AAFQAmQpyE6oI5_RT0KFZKqH0KIAG3CgaYw';

// Replace 'YOUR_CHANNEL_ID' with your actual channel ID
const channel = '-1001573630378';

// Set the welcome message
const welcomeMessage = 'Welcome to the bot! Type any message or send an image/video to forward it to the channel.';

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, welcomeMessage);
});

// Handle incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text || msg.caption;
  const photo = msg.photo;
  const video = msg.video;

  // Process text messages
  if (message) {
    const text = message + '\n\nراه های ارتباطی با ما:\n🌐 @crypto_invest2024\nکانال:\n🌐 @crypto_859099';
    bot.sendMessage(channel, text);
  }

  // Process photo messages
  if (photo) {
    const caption = (msg.caption || '') + ' [YOUR_VARIABLE]';
    const photoId = photo[photo.length - 1].file_id;
    bot.sendPhoto(channel, photoId, { caption: caption });
  }

  // Process video messages
  if (video) {
    const caption = (msg.caption || '') + ' [YOUR_VARIABLE]';
    const videoId = video.file_id;
    bot.sendVideo(channel, videoId, { caption: caption });
  }
});