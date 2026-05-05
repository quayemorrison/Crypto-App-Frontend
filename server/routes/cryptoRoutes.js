const express = require('express');
const router = express.Router();
const {
  getCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

router.route('/').get(getCryptos).post(addCrypto);
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);

module.exports = router;
