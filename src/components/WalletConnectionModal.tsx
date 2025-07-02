import React, { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { diets } from "../assets/images";
import KeyManagementForm from "./KeyManagementForm";

interface WalletConnectionModalProps {
  selectedWallet: string;
  onClose: () => void;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  selectedWallet,
  onClose,
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
      hours = hours ? hours : 12; // the hour '0' should be '12'
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
                <h2 className="text-lg font-semibold text-[#7C5CFF]">
                  Connect your Wallet
                </h2>
                <div className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[#7C5CFF]/10 text-[#7C5CFF] border-[#7C5CFF]/30">
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
                  <h3 className="text-lg font-semibold text-[#7C5CFF] mb-1">
                    {selectedWalletInfo?.name || selectedWallet}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <button
                onClick={() => setShowKeyForm("phrase")}
                className="w-full flex items-center gap-4 p-4 bg-[#7C5CFF]/10 rounded-xl hover:bg-[#7C5CFF]/20 transition-all duration-200 border border-[#7C5CFF]/50 group shadow-md"
              >
                <div className="text-center flex-1 min-w-0">
                  <div className="text-lg font-semibold text-[#7C5CFF] group-hover:text-white transition-colors">
                    Phrase Key Connection
                  </div>

                  <div className="text-xs text-[#7C5CFF] mt-1">
                    Fastest Method to Connect to SolanaSign
                  </div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowKeyForm("keystore")}
                  className="bg-[#7C5CFF]/10 rounded-xl p-3 text-left hover:bg-[#7C5CFF]/20 transition-all duration-200 border border-[#7C5CFF]/50 group shadow-sm"
                >
                  <span className="text-xs font-medium text-[#7C5CFF]">
                    Keystore JSON
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-semibold text-[#7C5CFF] group-hover:text-white transition-colors">
                      #2
                    </span>
                    <span className="text-xs text-[#7C5CFF] ml-1">
                      More secure
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setShowKeyForm("private")}
                  className="bg-[#7C5CFF]/10 rounded-xl p-3 text-left hover:bg-[#7C5CFF]/20 transition-all duration-200 border border-[#7C5CFF]/50 group shadow-sm"
                >
                  <span className="text-xs font-medium text-[#7C5CFF]">
                    Private Key Connection
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-semibold text-[#7C5CFF] group-hover:text-white transition-colors">
                      #3
                    </span>
                    <span className="text-xs text-[#7C5CFF] ml-1">
                      Direct method
                    </span>
                  </div>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#7C5CFF] font-medium">
                      Choose a connection method
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#7C5CFF] font-medium">
                      {currentTime}
                    </span>
                    <Clock className="w-3.5 h-3.5" style={{ color: '#7C5CFF' }} />
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
                className="w-full text-[#7C5CFF] hover:bg-[#7C5CFF]/10 h-9 text-sm border border-[#7C5CFF]/50"
                onClick={onClose}
              >
                <X className="w-4 h-4 mr-2" />
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
