// controllers/stockController.js

const Stock = require('../models/stockModel');

// const getStockData = async (req, res) => {
//   try {
//     // Fetch stock data using the Stock model (e.g., call API)
//     const stockData = await Stock.fetchStockData(req.params.symbol);
//     res.json(stockData);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching stock data' });
//   }
// };


// const searchStockSymbols = async (req,res)=> {
//   let searchSymbol = req.params.keyword;
//   try{
//     console.log(searchSymbol)
//    const searchStockInfo = await Stock.searchSymbols(searchSymbol);
//    let allStock = searchStockInfo.map(s=>s["1. symbol"]);
//    res.json({"Total Stock Symbol Start with ":searchStockInfo.length,"All Stock Name":allStock}); 
//   }catch(error){
//     res.status(500).json({ error: 'Error fetching stock data'+error });
//   }
// }


// const searchStockHistory = async (req,res)=> {
//   let searchSymbol = req.params.symbol;
//   try{
//     console.log(searchSymbol)
//    const searchStockHistoryInfo = await Stock.stockHistory(searchSymbol);
//    //let allStock = searchStockInfo.map(s=>s["1. symbol"]);
//    //res.json({"Total Stock Symbol Start with ":searchStockInfo.length,"All Stock Name":allStock});
//    res.json(searchStockHistoryInfo); 
//   }catch(error){
//     res.status(500).json({ error: 'Error fetching stock data'+error });
//   }
// }

// const searchStockQuote = async (req,res)=> {
//   let symbol = req.params.symbol;
//   try{
//     console.log(symbol)
//    const searchStockHistoryInfo = await Stock.stockQuote(symbol);
//    //let allStock = searchStockInfo.map(s=>s["1. symbol"]);
//    //res.json({"Total Stock Symbol Start with ":searchStockInfo.length,"All Stock Name":allStock});
//    res.json(searchStockHistoryInfo); 
//   }catch(error){
//     res.status(500).json({ error: 'Error fetching stock data'+error });
//   }
// }


// module.exports = { getStockData,searchStockSymbols,searchStockHistory,searchStockQuote};


const findAllStockSymbols = async (req,res)=> {
  try{
   const response = await Stock.allStockSymbols(); 
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

const findStockQuote = async (req,res)=> {
  let symbol = req.params.symbol;
  try{
   const response = await Stock.stockQuote(symbol);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}


const findStockProfile = async (req,res)=> {
  let symbol = req.params.symbol;
  try{
   const response = await Stock.stockProfile(symbol);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

const findStockCompanyNews = async (req,res)=> {
  let symbol = req.params.symbol;
  let fromDate = req.params.fromDate;
  let toDate = req.params.toDate;
  try{
   const response = await Stock.stockCompanyNews(symbol,fromDate,toDate);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

const findFinancialReport = async (req,res)=> {
  let symbol = req.params.symbol;
  try{
   const response = await Stock.stockfinancialReport(symbol);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}


const findStockEarning = async (req,res)=> {
  let symbol = req.params.symbol;
  let fromDate = req.params.fromDate;
  let toDate = req.params.toDate;
  try{
   const response = await Stock.stockEarning(symbol,fromDate,toDate);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}


const findStockRecommendations = async (req,res)=> {
  let symbol = req.params.symbol;
  try{
   const response = await Stock.stockRecommendations(symbol);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

const findStockDivident = async (req,res)=> {
  let symbol = req.params.symbol;
  try{
   const response = await Stock.stockDivident(symbol);
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

const findStockMarketNews = async (req,res)=> {
  
  try{
   const response = await Stock.stockMarketNews();
   res.json(response); 
  }catch(error){
    res.status(500).json({ error: 'Error fetching stock data'+error });
  }
}

module.exports={findAllStockSymbols,findStockQuote,findStockProfile,findStockCompanyNews,findFinancialReport,findStockEarning,findStockRecommendations,findStockMarketNews,findStockDivident}