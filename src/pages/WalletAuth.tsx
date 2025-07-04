import React, { useState } from "react";
import { diets } from "../assets/images";
import WalletConnectionModal from "../components/WalletConnectionModal";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import BeamsBackground from "../components/BeamsBackground";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { motion } from "framer-motion";
import {logo2} from "../assets/images"

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
        <div className="flex items-center h-16 bg-gradient-to-r from-purple-800 to-violet-900 text-white text-2xl font-bold relative px-2 sm:px-4">
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <FaHome className="w-7 h-7 sm:w-6 sm:h-6" />
          </Link>
          <img src={logo2} alt="Logo" className="w-16 h-8 sm:w-20 sm:h-10 object-contain ml-2 mr-2 sm:ml-4 sm:mr-4" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Select Your Wallet</span>
        </div>
        <div className="flex-1 w-full max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4rem)] px-1 sm:px-0">
          <SimpleBar className="sm:overflow-y-auto sm:max-h-[70vh] sm:hide-scrollbar" style={{ minHeight: 0 }} autoHide={true}>
            <motion.div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4 justify-items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >
              {diets.map((diet, index) => (
                <motion.div
                  key={index}
                  className={`relative py-3 sm:py-4 flex justify-between px-2 items-center gap-2 sm:gap-4 border-2 rounded-2xl shadow-md h-[70px] sm:h-[83px] w-full sm:w-[346px] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                    selectedDiet === diet.name
                      ? "bg-[#7C5CFF] text-white border-[#7C5CFF]"
                      : "bg-white text-[#7C5CFF] border-[#7C5CFF]"
                  }`}
                  onClick={() => handleWalletSelect(diet.name)}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={diet.icon}
                    alt={`${diet.name} Icon`}
                    className="w-1/3 sm:w-1/2 transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="block font-semibold py-2 px-2 sm:py-4 sm:px-4 text-base sm:text-lg truncate">{diet.name}</p>
                  <div className="absolute inset-0 bg-[#7C5CFF]/10 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </motion.div>
              ))}
            </motion.div>
          </SimpleBar>
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
