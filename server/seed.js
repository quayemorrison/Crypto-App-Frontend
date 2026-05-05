const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');
const connectDB = require('./config/db');

const cryptos = [
  // === TRADABLE COINS ===
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67293.06,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    change24h: -1.41,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2087.99,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    change24h: -2.33,
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: 1.00,
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    change24h: 0.01,
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 663.44,
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    change24h: -1.83,
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 1.45,
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    change24h: -1.25,
  },
  {
    name: "USDC",
    symbol: "USDC",
    price: 1.00,
    image: "https://assets.coingecko.com/coins/images/6319/large/usdc.png",
    change24h: 0.00,
  },

  // === TOP GAINERS ===
  {
    name: "Parcl",
    symbol: "PRCL",
    price: 0.021,
    image: "https://assets.coingecko.com/coins/images/36633/large/parcl_logo.png",
    change24h: 39.30,
  },
  {
    name: "Polkastarter",
    symbol: "POLS",
    price: 0.074,
    image: "https://assets.coingecko.com/coins/images/12648/large/polkastarter.png",
    change24h: 18.86,
  },
  {
    name: "Kite",
    symbol: "KITE",
    price: 0.32,
    image: "https://assets.coingecko.com/coins/images/35108/large/kiteai.jpg",
    change24h: 17.49,
  },
  {
    name: "SWELL",
    symbol: "SWELL",
    price: 0.0145,
    image: "https://assets.coingecko.com/coins/images/34571/large/swell.png",
    change24h: 8.73,
  },
  {
    name: "Subsquid",
    symbol: "SQD",
    price: 0.042,
    image: "https://assets.coingecko.com/coins/images/34835/large/sqd.png",
    change24h: 5.87,
  },
  {
    name: "Plume",
    symbol: "PLUME",
    price: 0.014,
    image: "https://assets.coingecko.com/coins/images/39703/large/plume.jpg",
    change24h: 16.73,
  },

  // === NEW ON COINBASE ===
  {
    name: "Hyperliquid",
    symbol: "HYPE",
    price: 32.64,
    image: "https://assets.coingecko.com/coins/images/40845/large/hyperliquid.jpeg",
    change24h: -1.32,
  },
  {
    name: "Jupiter",
    symbol: "JUP",
    price: 0.178,
    image: "https://assets.coingecko.com/coins/images/34188/large/jup.png",
    change24h: -6.48,
  },
  {
    name: "Lighter",
    symbol: "LIGHT",
    price: 1.168,
    image: "https://assets.coingecko.com/coins/images/39496/large/lighter.png",
    change24h: -6.59,
  },
  {
    name: "Sentient",
    symbol: "SETL",
    price: 0.025,
    image: "https://assets.coingecko.com/coins/images/39208/large/sentient.png",
    change24h: -4.22,
  },
  {
    name: "Walrus",
    symbol: "WAL",
    price: 0.079,
    image: "https://assets.coingecko.com/coins/images/40081/large/walrus.jpg",
    change24h: -2.27,
  },
  {
    name: "Raydium",
    symbol: "RAY",
    price: 0.621,
    image: "https://assets.coingecko.com/coins/images/16420/large/raydium.png",
    change24h: -1.05,
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing crypto data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data.');

    // Insert all coins
    await Crypto.insertMany(cryptos);
    console.log(`Successfully seeded ${cryptos.length} cryptocurrencies!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
