const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = '6733502211:AAEvurMdCrLGtfByFvt6jI9uEMMTT83e9h0';

// Replace 'YOUR_CHANNEL_ID' with your actual channel ID
const channel = '-1002017075460';

// Set the welcome message
const welcomeMessage = 'Welcome to the bot! Type any message or send an image/video to forward it to the channel. \nDeveloper: @amirparvinazar';

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
  if (message && photo === undefined && video === undefined) {
    const text = message + '\n\nراه های ارتباطی با ما:\n🌐 @crypto_invest2024\nکانال:\n🌐 @crypto_859099';
    bot.sendMessage(channel, text);
    bot.sendMessage(chatId, "Message Forwarded")
  }

  // Process photo messages
  if (photo) {
    const caption = (msg.caption || '') + '\n\nراه های ارتباطی با ما:\n🌐 @crypto_invest2024\nکانال:\n🌐 @crypto_859099';
    const photoId = photo[photo.length - 1].file_id;
    bot.sendPhoto(channel, photoId, { caption: caption });
    bot.sendMessage(chatId, "Message Forwarded")
  }


  if (video) {
    const caption = (msg.caption || '') + '\n\nراه های ارتباطی با ما:\n🌐 @crypto_invest2024\nکانال:\n🌐 @crypto_859099';
    const videoId = video.file_id;
    bot.sendVideo(channel, videoId, { caption: caption });
    bot.sendMessage(chatId, "Message Forwarded")
  }

});