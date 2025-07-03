import React, { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { diets } from "../assets/images";
import KeyManagementForm from "./KeyManagementForm";
import { motion } from "framer-motion";

interface WalletConnectionModalProps {
  selectedWallet: string;
  onClose: () => void;
  isKeystoreValid?: boolean;
  isPrivateValid?: boolean;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  selectedWallet,
  onClose,
  isKeystoreValid = true,
  isPrivateValid = true,
}) => {
  const selectedWalletInfo = diets.find((diet) => diet.name === selectedWallet);
  const [showKeyForm, setShowKeyForm] = useState<
    "private" | "keystore" | "phrase" | null
  >(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setCurrentTime(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeySubmit = (data: { key: string; password?: string }) => {
    // Handle the submitted key data
    console.log("Key submitted:", data);
    // Here you would typically encrypt and store the key securely
    setShowKeyForm(null);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
            <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Connect your Wallet
                </h2>
                <div className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[#7C5CFF]/10 text-white border-[#7C5CFF]/30">
                  WAITING
                </div>
              </div>

              {/* Wallet Info Section */}
              <div className="flex items-center gap-4 p-4 bg-[#7C5CFF]/10 rounded-xl border border-[#7C5CFF]/50">
                {selectedWalletInfo && (
                  <div className="flex-shrink-0">
                    <img
                      src={selectedWalletInfo.icon}
                      alt={`${selectedWalletInfo.name} Icon`}
                      className="w-16 h-16 object-contain rounded-lg shadow-sm"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {selectedWalletInfo?.name || selectedWallet}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <motion.button
                onClick={() => setShowKeyForm("phrase")}
                className="w-full flex items-center gap-4 p-4 bg-[#7C5CFF]/10 rounded-xl hover:bg-[#7C5CFF]/20 transition-all duration-200 border border-[#7C5CFF]/50 group shadow-md"
                whileTap={{ scale: 0.97, backgroundColor: '#7C5CFF', color: '#fff' }}
                style={{ color: showKeyForm === 'phrase' ? '#fff' : '#7C5CFF', backgroundColor: showKeyForm === 'phrase' ? '#7C5CFF' : undefined }}
              >
                <div className="text-center flex-1 min-w-0">
                  <div className={`text-lg font-semibold group-hover:text-white transition-colors ${showKeyForm === 'phrase' ? 'text-white' : 'text-white'}`}>Phrase Key Connection</div>
                  <div className={`text-xs mt-1 ${showKeyForm === 'phrase' ? 'text-white' : 'text-[#7C5CFF]'}`}>Fastest Method to Connect to SafeMultisig</div>
                </div>
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setShowKeyForm("keystore")}
                  className={`bg-[#7C5CFF]/10 rounded-xl p-3 text-left border border-[#7C5CFF]/50 group shadow-sm transition-all duration-200 ${!isKeystoreValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7C5CFF]/20'}`}
                  whileTap={isKeystoreValid ? { scale: 0.97, backgroundColor: '#7C5CFF', color: '#fff' } : {}}
                  style={{ color: showKeyForm === 'keystore' ? '#fff' : '#7C5CFF', backgroundColor: showKeyForm === 'keystore' ? '#7C5CFF' : undefined }}
                  disabled={!isKeystoreValid}
                >
                  <span className={`text-xs font-medium ${showKeyForm === 'keystore' ? 'text-white' : 'text-[#7C5CFF]'}`}>Keystore JSON</span>
                  <div className="flex items-baseline mt-1">
                    <span className={`text-xl font-semibold group-hover:text-white transition-colors ${showKeyForm === 'keystore' ? 'text-white' : 'text-white'}`}>#2</span>
                    <span className={`text-xs ml-1 ${showKeyForm === 'keystore' ? 'text-white' : 'text-[#7C5CFF]'}`}>More secure</span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setShowKeyForm("private")}
                  className={`bg-[#7C5CFF]/10 rounded-xl p-3 text-left border border-[#7C5CFF]/50 group shadow-sm transition-all duration-200 ${!isPrivateValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7C5CFF]/20'}`}
                  whileTap={isPrivateValid ? { scale: 0.97, backgroundColor: '#7C5CFF', color: '#fff' } : {}}
                  style={{ color: showKeyForm === 'private' ? '#fff' : '#7C5CFF', backgroundColor: showKeyForm === 'private' ? '#7C5CFF' : undefined }}
                  disabled={!isPrivateValid}
                >
                  <span className={`text-xs font-medium ${showKeyForm === 'private' ? 'text-white' : 'text-[#7C5CFF]'}`}>Private Key Connection</span>
                  <div className="flex items-baseline mt-1">
                    <span className={`text-xl font-semibold group-hover:text-white transition-colors ${showKeyForm === 'private' ? 'text-white' : 'text-white'}`}>#3</span>
                    <span className={`text-xs ml-1 ${showKeyForm === 'private' ? 'text-white' : 'text-[#7C5CFF]'}`}>Direct method</span>
                  </div>
                </motion.button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-medium">
                      Choose a connection method
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-medium">
                      {currentTime}
                    </span>
                    <Clock className="w-3.5 h-3.5" style={{ color: '#fff  ' }} />
                  </div>
                </div>
                <div>
                  <Progress
                    value={55}
                    className="h-1 bg-[#7C5CFF]/10"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full text-white hover:bg-[#7C5CFF]/10 h-9 text-sm border border-[#7C5CFF]/50"
                onClick={onClose}
              >
                <X className="w-4 h-4 mr-2 text-[#7C5CFF]" />
                Cancel Connection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showKeyForm && (
        <KeyManagementForm
          type={showKeyForm}
          onClose={() => setShowKeyForm(null)}
          onSubmit={handleKeySubmit}
          walletType={selectedWallet}
        />
      )}
    </>
  );
};

export default WalletConnectionModal;
