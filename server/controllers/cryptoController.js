const Crypto = require('../models/Crypto');

// @desc    Fetch all tradable cryptocurrencies
// @route   GET /api/crypto
const getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch top gainers
// @route   GET /api/crypto/gainers
const getTopGainers = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ change24h: -1 }).limit(10);
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch new listings
// @route   GET /api/crypto/new
const getNewListings = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ createdAt: -1 }).limit(10);
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new cryptocurrency
// @route   POST /api/crypto
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    const crypto = new Crypto({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    const createdCrypto = await crypto.save();
    res.status(201).json(createdCrypto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
};
