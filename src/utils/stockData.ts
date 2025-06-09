export interface LocalStockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const getLocalStockData = async (
  symbol: string
): Promise<LocalStockData[]> => {
  try {
    const response = await fetch(
      `/src/assets/StockDetailData/${symbol}_data.json`
    );
    if (!response.ok) throw new Error(`Failed to load data for ${symbol}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading stock data for ${symbol}:`, error);
    throw error;
  }
};
