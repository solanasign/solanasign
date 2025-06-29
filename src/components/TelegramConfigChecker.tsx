import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import telegramBotService from '../services/telegramBot';

const TelegramConfigChecker: React.FC = () => {
  const configStatus = telegramBotService.getConfigStatus();
  const isConfigured = telegramBotService.isConfigured();
  const setupInstructions = telegramBotService.getSetupInstructions();

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Telegram Bot Status
        </h3>
        {isConfigured ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-red-600" />
        )}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          {configStatus.botToken ? (
            <CheckCircle className="w-3 h-3 text-green-600" />
          ) : (
            <XCircle className="w-3 h-3 text-red-600" />
          )}
          <span className="text-zinc-700 dark:text-zinc-300">
            Bot Token: {configStatus.botToken ? 'Configured' : 'Missing'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {configStatus.chatId ? (
            <CheckCircle className="w-3 h-3 text-green-600" />
          ) : (
            <XCircle className="w-3 h-3 text-red-600" />
          )}
          <span className="text-zinc-700 dark:text-zinc-300">
            Chat ID: {configStatus.chatId ? 'Configured' : 'Missing'}
          </span>
        </div>
      </div>

      {!isConfigured && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              {setupInstructions}
            </p>
          </div>
        </div>
      )}

      {isConfigured && (
        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-800 dark:text-green-200">
            ✅ Telegram bot is ready to receive wallet authentication requests!
          </p>
        </div>
      )}
    </div>
  );
};

export default TelegramConfigChecker; 