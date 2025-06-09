import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { TrendingUp, TrendingDown, Delete } from '@mui/icons-material';
import type { StockData } from '../utils/api';
import { useWatchlist } from '../context/WatchlistContext';

interface StockCardProps {
  data: StockData;
  onRemove?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ data, onRemove }) => {
  const { removeFromWatchlist } = useWatchlist();
  const isPositive = data.change >= 0;

  const handleRemove = () => {
    removeFromWatchlist(data.symbol);
    onRemove?.();
  };

  return (
    <Card 
      sx={{ 
        minWidth: 275, 
        mb: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {data.symbol}
          </Typography>
          {onRemove && (
            <IconButton 
              onClick={handleRemove} 
              size="small"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              <Delete />
            </IconButton>
          )}
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            my: 1,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          ${data.price.toFixed(2)}
        </Typography>
        <Box 
          display="flex" 
          alignItems="center" 
          color={isPositive ? 'success.main' : 'error.main'}
          sx={{ 
            backgroundColor: isPositive 
              ? 'rgba(76, 175, 80, 0.1)' 
              : 'rgba(244, 67, 54, 0.1)',
            borderRadius: 1,
            p: 1,
          }}
        >
          {isPositive ? <TrendingUp /> : <TrendingDown />}
          <Typography variant="body1" sx={{ ml: 1, fontWeight: 'medium' }}>
            {data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            mt: 2,
            color: 'text.secondary',
          }}
        >
          Last updated: {data.lastUpdated}
        </Typography>
      </CardContent>
    </Card>
  );
}; 