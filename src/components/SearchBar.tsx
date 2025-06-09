import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useWatchlist } from '../context/WatchlistContext';
import { fetchStockQuote } from '../utils/api';

export const SearchBar: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!symbol.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    const upperSymbol = symbol.trim().toUpperCase();

    if (isInWatchlist(upperSymbol)) {
      setError('Stock already in watchlist');
      return;
    }

    try {
      await fetchStockQuote(upperSymbol);
      addToWatchlist(upperSymbol);
      setSymbol('');
    } catch (err) {
      setError('Invalid stock symbol or API error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          label="Stock Symbol"
          variant="outlined"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          error={!!error}
          helperText={error}
          placeholder="e.g., AAPL"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: '100px' }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}; 