# SafeMuiltiSig

A comprehensive Solana wallet integration platform with token swapping, staking, and more.

## Features

- 🔐 Secure wallet connections (Phantom, Solflare, Metamask, etc.)
- 💱 Token swapping and bridging
- 🏊‍♂️ Liquidity pools and farming
- 💰 Staking and unstaking
- 🔒 Hardware wallet support (Ledger, Trezor)
- ✅ KYC & Whitelist management
- 🎁 Airdrop distribution
- 🔄 Compromised auth recovery

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/solanasign
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Client Setup
1. In the root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```


## Registration Flow

The registration system includes:
- Email validation
- Password strength requirements
- Real-time form validation
- Database integration
- Automatic navigation to wallet selection

## Troubleshooting

If registration fails:
1. Ensure MongoDB is running
2. Check server logs for errors
3. Verify the `.env` file is properly configured
4. Ensure both client and server are running

