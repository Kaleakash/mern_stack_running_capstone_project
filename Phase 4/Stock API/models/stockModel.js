//const keyRef = require("../config/apiConfig");
let axios = require("axios");
//const apiKey = 'YVK8LD9GT5B5U1SP'; 
const finApiKey="XXX-XXXX-XXXXX";

class Stock {
    constructor(symbol, price, volume) {
      this.symbol = symbol;
      this.price = price;
      this.volume = volume;
    }
    
    static async allStockSymbols(){
      try {
        const apiUrl = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const symbols = response.data;
        return symbols;
      } catch (error) {
        throw new Error('Error searching symbols');
      }

    }

    static async stockQuote(symbol){
      try{
        const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const stockData = response.data;
        return stockData;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }

    static async stockProfile(symbol){
      try{
      const apiUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finApiKey}`;
      const response = await axios.get(apiUrl);
      const companyProfile = response.data;
      return companyProfile;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }


    static async stockCompanyNews(symbol,fromDate,toDate){
      try{
        const apiUrl = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const newsData = response.data;
      return newsData;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }

    static async stockfinancialReport(symbol){
      try{
        const apiUrl = `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${finApiKey}`;
    const response = await axios.get(apiUrl);
    const financialData = response.data;
      return financialData;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }


    static async stockEarning(symbol,fromDate,toDate){
      try{
const apiUrl = `https://finnhub.io/api/v1/calendar/earnings?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const earningsData = response.data;
      return earningsData;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }

    static async stockRecommendations(symbol){
      try{
        const apiUrl = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const recommendations = response.data;
      return recommendations;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }

    static async stockMarketNews(){
      try{
        const apiUrl = `https://finnhub.io/api/v1/news?category=general&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const marketNews = response.data;
    
      return marketNews;
      }catch(error){
        throw new Error('Error searching symbols');
      }
    }

    static async stockDivident(symbol){
      try{
        const apiUrl = `https://finnhub.io/api/v1/stock/dividend2?symbol=${symbol}&token=${finApiKey}`;
        const response = await axios.get(apiUrl);
        const dividendData = response.data;
    
      return dividendData;
      }catch(error){
        console.log(error)
        throw new Error('Error searching symbols');
      }
    }


    // static async fetchStockData(symbol){
    //   const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    //   const response = await axios.get(apiUrl);
    //   const stockData = response.data['Global Quote']; // Customize based on API response structure

    //   return stockData;
    // }


    // static async searchSymbols(keywords) {
    //   try {
    //     const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;
    //     console.log("Hi")
    //     const response = await axios.get(apiUrl);
    //     const searchResults = response.data.bestMatches; // Adjust based on API response
    //     return searchResults;
    //   } catch (error) {
    //     console.log(error);
    //     throw new Error('Error searching symbols');
    //   }
    // }
  
  
    // static async stockHistory(symbol){
    //   try{
    //   const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    //   const response = await axios.get(apiUrl);
    //   const historicalData = response.data['Time Series (Daily)'];
    //   return historicalData;
    //   }catch(error){
    //     throw new Error('Error searching stock history');
    //   }
    // }


    // static async stockQuote(symbol){
    //   try{
    //     console.log("i came here")
    //     console.log(symbol)
    //     const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    // const response = await axios.get(apiUrl);
    //     console.log(response.data);
    // const stockData = response.data['Global Quote'];

    //     return stockData;
    //   }catch(error){
    //     console.log(error);
    //     throw new Error('Error searching quote details');
    //   }
    // }


}

  module.exports = Stock;
  