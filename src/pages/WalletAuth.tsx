import React, { useState } from "react";
import { diets } from "../assets/images";
import WalletConnectionModal from "../components/WalletConnectionModal";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import BeamsBackground from "../components/BeamsBackground";

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
        <div className="flex flex-1 items-center justify-center">
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 p-4">
            {diets.map((diet, index) => (
              <div
                key={index}
                className={`relative bg-custom-gradient-0 py-4 flex justify-between px-2 items-center gap-4 border rounded-lg shadow-md h-[83px] w-[346px] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  selectedDiet === diet.name
                    ? "bg-violet-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => handleWalletSelect(diet.name)}
              >
                <img
                  src={diet.icon}
                  alt={`${diet.name} Icon`}
                  className="w-1/2 transition-transform duration-300 group-hover:scale-110"
                />
                <p className="block font-semibold py-4 px-4">{diet.name}</p>

                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
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
