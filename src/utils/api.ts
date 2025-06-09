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
    console.log('Fetching data for symbol:', symbol);
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY,
      },
    });

    console.log('API Response:', response.data);

    const data = response.data['Global Quote'];
    if (!data) {
      console.error('No data found in response:', response.data);
      throw new Error('Invalid symbol or no data available');
    }

    return {
      symbol,
      price: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
      lastUpdated: data['07. latest trading day'],
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Response:', error.response?.data);
    }
    throw error;
  }
};

export const fetchIntradayData = async (symbol: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '5min',
        apikey: API_KEY,
      },
    });

    return response.data['Time Series (5min)'];
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    throw error;
  }
}; 