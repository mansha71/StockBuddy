import { useState, useEffect } from 'react';
import { fetchStockQuote } from '../utils/api';
import type { StockData } from '../utils/api';

export const useStocks = (initialSymbols: string[] = ['AAPL', 'MSFT', 'GOOGL']) => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStocks = async (symbols: string[]) => {
    try {
      setLoading(true);
      setError('');

      const stockData: StockData[] = [];
      for (const symbol of symbols) {
        try {
          const data = await fetchStockQuote(symbol);
          stockData.push(data);
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          // Continue with other symbols even if one fails
        }
      }

      if (stockData.length === 0) {
        setError('Failed to fetch any stock data. Please check if the stock data files exist.');
      } else {
        setStocks(stockData);
      }
    } catch (err) {
      console.error('Error in fetchStocks:', err);
      setError('Error fetching stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(initialSymbols);
  }, [initialSymbols]);

  return { stocks, loading, error, refetch: () => fetchStocks(initialSymbols) };
}; 