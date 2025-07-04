import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "./ui/progress";

interface TermsConsentModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const TermsConsentModal: React.FC<TermsConsentModalProps> = ({
  onClose,
  onAccept,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const holdDuration = 3000; 
  const interval = 50;
  const navigate = useNavigate();

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isHolding && !showCheckbox) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (interval / holdDuration) * 100;
          if (next >= 100) {
            clearInterval(timer);
            setIsHolding(false);
            setProgress(100);
            setShowCheckbox(true);
          }
          return Math.min(next, 100);
        });
      }, interval);
    } else {
      if (timer) clearInterval(timer);
      if (!showCheckbox) setProgress(0);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isHolding, showCheckbox]);

  React.useEffect(() => {
    if (checkboxChecked) {
      localStorage.setItem("termsAccepted", "true");
      onAccept();
      navigate("/wallet");
    }
  }, [checkboxChecked, onAccept, navigate]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
          <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Human Verification
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

          <div className="p-5 space-y-6">
            <div className="text-center text-zinc-700 dark:text-zinc-300 text-base pb-2">
              Please press and hold the button below for 3 seconds to verify you are human.
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-4">
                <Progress value={progress} />
              </div>
              {!showCheckbox && (
                <Button
                  className={`w-full h-12 text-lg font-semibold bg-[#14244d] text-white hover:bg-[#7C5CFF] disabled:opacity-50 transition-all duration-200 ${isHolding ? 'scale-95' : ''}`}
                  onMouseDown={() => setIsHolding(true)}
                  onMouseUp={() => setIsHolding(false)}
                  onMouseLeave={() => setIsHolding(false)}
                  onTouchStart={() => setIsHolding(true)}
                  onTouchEnd={() => setIsHolding(false)}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#7C5CFF'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#14244d'}
                  disabled={progress === 100}
                >
                  {progress < 100 ? (isHolding ? "Keep Holding..." : "Press and Hold") : "Verified!"}
                </Button>
              )}
              {showCheckbox && (
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={e => setCheckboxChecked(e.target.checked)}
                    className="w-5 h-5 accent-[#7C5CFF]"
                  />
                  <span className="text-base text-zinc-800 dark:text-zinc-200">Are you a human?</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConsentModal;
