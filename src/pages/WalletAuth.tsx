import React, { useState } from "react";
import { diets } from "../assets/images";
import WalletConnectionModal from "../components/WalletConnectionModal";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import BeamsBackground from "../components/BeamsBackground";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

const WalletAuth = () => {
  const [selectedDiet, setSelectedDiet] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleWalletSelect = (walletName: string) => {
    setSelectedDiet(walletName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <BeamsBackground>
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-purple-800 to-violet-800, text-white text-2xl font-bold relative">
          <Link
            to="/"
            className="absolute left-6 text-white hover:text-gray-200 transition-colors"
          >
            <FaHome size={24} />
          </Link>
          Select Your Wallet
        </div>
        <div className="flex flex-1 items-center justify-center px-2 sm:px-0">
          <div className="w-full max-w-6xl">
            <SimpleBar className="sm:overflow-y-auto sm:max-h-[70vh] sm:hide-scrollbar" style={{ minHeight: 0 }} autoHide={true}>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
                {diets.map((diet, index) => (
                  <div
                    key={index}
                    className={`relative py-4 flex justify-between px-2 items-center gap-4 border-2 rounded-lg shadow-md h-[83px] w-[346px] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                      selectedDiet === diet.name
                        ? "bg-[#7C5CFF] text-white border-[#7C5CFF]"
                        : "bg-white text-[#7C5CFF] border-[#7C5CFF]"
                    }`}
                    onClick={() => handleWalletSelect(diet.name)}
                  >
                    <img
                      src={diet.icon}
                      alt={`${diet.name} Icon`}
                      className="w-1/2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <p className="block font-semibold py-4 px-4 text-lg">{diet.name}</p>

                    <div className="absolute inset-0 bg-[#14244d]/20 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </SimpleBar>
          </div>
        </div>
        \
        {showModal && (
          <WalletConnectionModal
            selectedWallet={selectedDiet}
            onClose={handleCloseModal}
          />
        )}
      </BeamsBackground>
    </div>
  );
};

export default WalletAuth;
