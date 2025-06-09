import { useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext';
import { SearchBar } from './components/SearchBar';
import { StockCard } from './components/StockCard';
import { useStocks } from './hooks/useStocks';

function StockDashboard() {
  const { watchlist } = useWatchlist();
  const { stocks, loading, error } = useStocks(watchlist);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Stock Tracker Dashboard
      </Typography>
      
      <SearchBar />

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {stocks.map((stock) => (
              <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
                <StockCard data={stock} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

function App() {
  return (
    <WatchlistProvider>
      <StockDashboard />
    </WatchlistProvider>
  );
}

export default App;
