import { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { WatchlistProvider, useWatchlist } from "./context/WatchlistContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StockDetail } from "./components/StockDetail";
import { SearchBar } from "./components/SearchBar";
import { StockCard } from "./components/StockCard";
import { useStocks } from "./hooks/useStocks";

function StockDashboard() {
  const { watchlist } = useWatchlist();
  const { stocks, loading, error } = useStocks(watchlist);
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "transparent",
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Stock Tracker Dashboard
          </Typography>

          <SearchBar />

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </Box>
          ) : error ? (
            <Typography
              color="error"
              gutterBottom
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(211, 47, 47, 0.1)",
                border: "1px solid rgba(211, 47, 47, 0.2)",
              }}
            >
              {error}
            </Typography>
          ) : (
            <Box sx={{ flexGrow: 1, mt: 4 }}>
              <Grid container spacing={3}>
                {stocks.map((stock) => (
                  <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
                    <StockCard data={stock} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <WatchlistProvider>
        <Routes>
          <Route path="/" element={<StockDashboard />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
        </Routes>
      </WatchlistProvider>
    </BrowserRouter>
  );
}

export default App;
