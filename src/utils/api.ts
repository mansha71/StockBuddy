import axios from 'axios';

const API_KEY = 'X1KRR21DGMZGAF57';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export const fetchStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    // Import the stock data from the local JSON file
    const stockData = await import(`../assets/StockDetailData/${symbol}_data.json`);
    
    // Get the last two days of data to calculate change
    const data = stockData.default;
    const lastDay = data[data.length - 1];
    const previousDay = data[data.length - 2];
    
    const price = lastDay.close;
    const change = price - previousDay.close;
    const changePercent = (change / previousDay.close) * 100;
    
    return {
      symbol,
      price,
      change,
      changePercent,
      lastUpdated: lastDay.date,
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
};

export const fetchIntradayData = async (symbol: string) => {
  try {
    const stockData = await import(`../assets/StockDetailData/${symbol}_data.json`);
    return stockData.default;
  } catch (error) {
    console.error(`Error fetching intraday data for ${symbol}:`, error);
    throw error;
  }
}; 