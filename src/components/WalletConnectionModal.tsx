import React, { useState } from "react";
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
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Connect your Wallet
                </h2>
                <div className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-orange-100 text-orange-700 border-orange-200">
                  WAITING
                </div>
              </div>

              {/* Wallet Info Section */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
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
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                    {selectedWalletInfo?.name || selectedWallet}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <button
                onClick={() => setShowKeyForm("phrase")}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-700 rounded-xl hover:from-purple-100 hover:to-purple-50 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-200 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 group"
              >
                <div className="text-center flex-1 min-w-0">
                  <div className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    Phrase Key Connection
                  </div>

                  <div className="text-xs text-zinc-400 dark:text-zinc-400 mt-1">
                    Fastest Method to Connect to SolanaSign
                  </div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowKeyForm("keystore")}
                  className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-left hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 group"
                >
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-300">
                    Keystore JSON
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      #2
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-300 ml-1">
                      More secure
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setShowKeyForm("private")}
                  className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-left hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 group"
                >
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-300">
                    Private Key Connection
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      #3
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-300 ml-1">
                      Direct method
                    </span>
                  </div>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 dark:text-zinc-300 font-medium">
                      Choose a connection method
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 dark:text-zinc-300 font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
                <div>
                  <Progress
                    value={55}
                    className="h-1 bg-zinc-200 dark:bg-zinc-700"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 h-9 text-sm"
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
