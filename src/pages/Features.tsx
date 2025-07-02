import React, { useState } from "react";
import TermsConsentModal from "../components/TermsConsentModal";
import BeamsBackground from "../components/BeamsBackground";
import { motion } from "framer-motion";
import {logo2} from "../assets/images"
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const features = [
  {
    title: "Portfolio Tracker",
    description: "Keep track of your investments with our intuitive tracker",
    icon: "📈",
  },
  {
    title: "Security Center",
    description: "Enhance your wallet's security with advanced protection features",
    icon: "🛡️",
  },
  {
    title: "Peer-to-Peer Exchange",
    description: "Trade directly with other users in a secure environment",
    icon: "🤝",
  },
  {
    title: "Crypto Loans",
    description: "Borrow funds using your crypto assets as collateral",
    icon: "🧑‍💼",
  },
  {
    title: "Market Analytics",
    description: "Analyze trends with detailed market analytics and forecasts",
    icon: "📊",
  },
  {
    title: "Multisig Security",
    description: "Enhance your wallet's security with multi-signature authentication for transactions.",
    icon: "🔑",
  },
  {
    title: "Multi-Currency Wallet",
    description: "Manage multiple cryptocurrencies in one wallet",
    icon: "👛",
  },
  {
    title: "Login Issues",
    description: "Claim your tokens with ease and manage your rewards effectively",
    icon: "🛡️",
  },
  {
    title: "Wallet glitch/error",
    description: "Do you have any glitch issues on your wallet?",
    icon: "🐞",
  },
  {
    title: "Locked Account Support",
    description: "Facing issues with a locked account? Get quick support here.",
    icon: "🔒",
  },
  {
    title: "Transaction Delay",
    description: "Experiencing delays in your transactions? Let's help you troubleshoot.",
    icon: "⏳",
  },
  {
    title: "Unable to Purchase Coins",
    description: "Trouble purchasing coins? Get assistance instantly.",
    icon: "🚫",
  },
];

const Features: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <BeamsBackground>
      <div className="absolute top-6 left-6 z-20 flex items-center gap-6">
        <Link to="/">
          <FaHome size={50} className="text-white h-20" />
        </Link>
        <img src={logo2} alt="Logo" className="w-50 h-20 object-contain" />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start py-8 px-2 sm:px-4 md:px-8">
        
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-center text-fuchsia-400 mb-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Powerful Features
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg text-center text-zinc-200 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover our comprehensive suite of cryptocurrency tools and features
        </motion.p>
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {features.map((feature, idx) => (
            <motion.button
              key={idx}
              onClick={() => setShowModal(true)}
              aria-label={`Open ${feature.title} details`}
              tabIndex={0}
              className="bg-[#2d1e4a]/80 hover:bg-[#7C5CFF]/30 transition-colors border border-[#7C5CFF]/20 rounded-2xl p-5 sm:p-6 flex flex-col items-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#7C5CFF] min-h-[180px] sm:min-h-[200px]"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <div className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 text-center">{feature.title}</div>
              <div className="text-zinc-300 text-xs sm:text-sm text-center">{feature.description}</div>
            </motion.button>
          ))}
        </motion.div>
        {showModal && (
          <TermsConsentModal
            onClose={() => setShowModal(false)}
            onAccept={() => setShowModal(false)}
          />
        )}
      </div>
    </BeamsBackground>
  );
};

export default Features; 