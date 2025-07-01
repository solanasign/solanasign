import * as React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BeamsBackground from '../components/BeamsBackground'
import TermsConsentModal from '../components/TermsConsentModal'
import RegisterModal from '../components/RegisterModal'
import { logo } from '../assets/images'

const Home = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()
  
  const handleWalletClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowTerms(true)
  }

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowRegister(true)
  }

  const handleTermsAccept = () => {
    setShowTerms(false)
    navigate('/wallet')
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false)
    navigate('/wallet')
  }

  return (
    <BeamsBackground>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <img src={logo} alt="Sigma Connect Logo" className="mx-auto mb-6 w-24 h-24" />
          <h1 className="text-6xl font-bold text-white mb-6">
            Solana Sign
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            TOKEN SWAPS & CLAIM TOKEN  • LIQUIDITY POOL AND FARM • DEPOSITS AND WITHDRAWALS • TOKENS STAKE AND UNSTAKE • LEDGER AND TREZOR HARDWARE • KYC & WHITELIST & ALLOCATION • AIRDROPS • COMPROMISED AUTH RECLAIM
          </p>
          <div className="space-x-4">
            <button
              onClick={handleRegisterClick}
              className="px-8 py-3 rounded-lg font-bold transition-colors"
              style={{ backgroundColor: '#CA9C51', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#b88a3f'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#ce9f53'}
            >
              Get Started
            </button>
            <button
              onClick={handleWalletClick}
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Connect Wallet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-purple-400 text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Secure Platform</h3>
            <p className="text-gray-300">
              Your information is protected with state-of-the-art security measures
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
            <div className="text-purple-400 text-3xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Members Only</h3>
            <p className="text-gray-300">
              Win exclusive prizes when you join our email newsletter
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
            <div className="text-purple-400 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Monetize</h3>
            <p className="text-gray-300">
              Start your crypto journey using your credit/debit card, bank account, Apple Pay, or Google Pay
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's contribute to your crypto Journey</h2>
          <p className="mb-8 text-gray-300">
            Join our community and start exploring the world of cryptocurrencies today!
          </p>
          <button
              onClick={handleWalletClick}
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Connect Wallet
            </button>
        </div>
        {showTerms && (
          <TermsConsentModal
            onClose={() => setShowTerms(false)}
            onAccept={handleTermsAccept}
          />
        )}
        {showRegister && (
          <RegisterModal
            onClose={() => setShowRegister(false)}
            onSuccess={handleRegisterSuccess}
          />
        )}
      </div>
    </BeamsBackground>
  )
}

export default Home 