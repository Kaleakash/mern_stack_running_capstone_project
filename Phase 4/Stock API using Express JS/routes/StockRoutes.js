// routes.js

const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// router.get('/find/:symbol', stockController.getStockData);
// router.get("/search/:keyword",stockController.searchStockSymbols);
// router.get("/searchHistory/:symbol",stockController.searchStockHistory);
// router.get("/quote/:symbol",stockController.searchStockQuote);

router.get("/all",stockController.findAllStockSymbols);
router.get("/quote/:symbol",stockController.findStockQuote);
router.get("/profile/:symbol",stockController.findStockProfile);
router.get("/news/:symbol/:fromDate/:toDate",stockController.findStockProfile);
router.get("/financial/:symbol",stockController.findFinancialReport);
router.get("/earning/:symbol/:fromDate/:toDate",stockController.findStockEarning);
router.get("/recommendations/:symbol",stockController.findStockRecommendations);
router.get("/marketnews",stockController.findStockMarketNews);
router.get("/divident/:symbol",stockController.findStockDivident);

module.exports = router;
