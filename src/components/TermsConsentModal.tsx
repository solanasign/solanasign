import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import axios from "axios";

interface TermsConsentModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const TermsConsentModal: React.FC<TermsConsentModalProps> = ({
  onClose,
  onAccept,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email: string) => {
    try {
      setIsCheckingEmail(true);
      setEmailError("");

      // Check if email exists by attempting to register (this will fail if email exists)
      const response = await axios.post("/api/auth/register", {
        email,
        password: "temp_password",
        username: "temp_username",
        displayName: "temp_display",
      });

      // If we get here, email doesn't exist
      return false;
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.error?.includes("already exists")
      ) {
        return true; // Email exists
      }
      // For other errors, assume email doesn't exist
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (newEmail && validateEmail(newEmail)) {
      const emailExists = await checkEmailExists(newEmail);
      if (emailExists) {
        setEmailError("This email is already registered");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handleAccept = () => {
    if (termsAccepted && email && !emailError && !isCheckingEmail) {
      localStorage.setItem("termsAccepted", "true");
      localStorage.setItem("marketingAccepted", marketingAccepted.toString());
      localStorage.setItem("userEmail", email);
      onAccept();
      navigate("/wallet");
    }
  };

  const isFormValid = termsAccepted && email && !emailError && !isCheckingEmail;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
          <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Connect Wallet
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
                  emailError ? "border-red-500 text-white" : "text-white"
                } h-12 text-base px-4`}
                labelColor="text-white"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
              {isCheckingEmail && (
                <p className="text-blue-500 text-sm">
                  Checking email availability...
                </p>
              )}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  I accept the Terms of Use and Privacy Policy. I understand
                  that I am responsible for maintaining the security of my
                  wallet and private keys.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={marketingAccepted}
                  onChange={(e) => setMarketingAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="marketing"
                  className="text-sm text-zinc-700 dark:text-zinc-300"
                >
                  I agree to receive marketing communications about new
                  features, updates, and promotional offers.
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="ghost"
                className="flex-1 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                onClick={handleAccept}
                disabled={!isFormValid}
              >
                Accept and Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConsentModal;
