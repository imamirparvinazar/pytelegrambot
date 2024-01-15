import logging
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

# Set up logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

# Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
TOKEN = '6812587488:AAFQAmQpyE6oI5_RT0KFZKqH0KIAG3CgaYw'

# Replace 'YOUR_CHANNEL_ID' with your actual channel ID
CHANNEL_ID = '-1001573630378'

# Set the welcome message
WELCOME_MESSAGE = 'Welcome to the bot! Type any message or send an image/video to forward it to the channel.'

# Define the start command handler
def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=WELCOME_MESSAGE)

# Define the message handler
def handle_message(update, context):
    message = update.effective_message
    chat_id = update.effective_chat.id

    # Process text messages
    if message.text:
        text = message.text + ' [YOUR_VARIABLE]'
        context.bot.send_message(chat_id=CHANNEL_ID, text=text)

    # Process photo messages
    if message.photo:
        caption = message.caption or ''
        caption += ' [YOUR_VARIABLE]'
        context.bot.send_photo(chat_id=CHANNEL_ID, photo=message.photo[-1].file_id, caption=caption)

    # Process video messages
    if message.video:
        caption = message.caption or ''
        caption += ' [YOUR_VARIABLE]'
        context.bot.send_video(chat_id=CHANNEL_ID, video=message.video.file_id, caption=caption)

# Set up the Telegram bot
def main():
    updater = Updater(TOKEN, use_context=True)
    dispatcher = updater.dispatcher

    # Add handlers
    start_handler = CommandHandler('start', start)
    message_handler = MessageHandler(Filters.all, handle_message)

    dispatcher.add_handler(start_handler)
    dispatcher.add_handler(message_handler)

    # Start the bot
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()