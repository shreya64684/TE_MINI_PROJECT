# 🌱 Secure Transparent Carbon Footprint Management Platform using Blockchain

A decentralized web-based platform for transparent and tamper-proof tracking of carbon emissions and carbon credit trading. This project leverages blockchain and IPFS to ensure trust, accuracy, and security in environmental data reporting, especially for high-emission industries like cement and steel.

---

## 📌 Project Description

The platform allows companies to log carbon footprint data across Scope 1, 2, and 3 emissions. It uses blockchain to record verified data, enabling real-time visibility and secure carbon credit trading. Machine learning models suggest ways to reduce emissions based on submitted data. IPFS is used for document storage and verification, ensuring decentralization and immutability.

---

## 🚀 Features

- 🔐 **Blockchain-based Emission Logging:** Immutable and transparent CO₂ data records.
- 📤 **IPFS Integration:** Decentralized file storage for verification documents (like electricity bills).
- 🧾 **Carbon Credit Calculation & Trading:** Smart contracts manage carbon credit allocation and transactions.
- 📊 **Company Dashboard:** Emissions overview and category-wise breakdown with visual insights.
- 🤖 **AI/ML Insights:** Personalized suggestions to reduce carbon footprints.
- 👤 **Multi-Role Login:** Admins, companies, suppliers, and partners have tailored access and functions.

---

## 🌍 Social Relevance

- Promotes **carbon accountability and transparency** in industries.
- Encourages **green practices** by making carbon reduction efforts measurable and tradable.
- Aligns with **UN SDGs** and supports **net-zero emission goals**.
- Enables **trustworthy carbon markets** in developing nations.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Bootstrap, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Blockchain:** Ethereum, Smart Contracts (Solidity), Truffle , Ganache, Web3 JS 
- **Storage:** MongoDB, IPFS
- **Authentication:** JWT, Role-based Auth
- **ML Integration:** Google Gemini API (for insights & OCR)
- **Deployment:** MetaMask

---

## ⚙️ Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/shreya64684/TE_MINI_PROJECT.git
cd te_mini_project

# 2. Set up the backend
cd backend
nodemon app.js  #setup .env with local mongo url

# 3. Set up the frontend
npm install
npm start

# 4. Blockchain Setup (local dev)
# Install Ganache or use testnet like Polygon Mumbai
# Compile and deploy smart contracts using Hardhat or Truffle

# 5. Environment Variables
# Create .env files in backend and frontend folders with necessary keys (MongoDB URI, IPFS API keys, etc.)

# 6. Access the app
Visit http://localhost:3000
