import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { type LocalStockData, getLocalStockData } from "../utils/stockData";

// Add these before the component
type TimeRange = "3M" | "1Y" | "3Y" | "all";

export const StockDetail: React.FC = () => {
  // Add these inside the component, after the existing state declarations
  const [timeRangeDetail, setTimeRangeDetail] = useState<TimeRange>("all");
  const { symbol = "" } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<LocalStockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const stockData = await getLocalStockData(symbol);
        setData(stockData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load stock data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      loadData();
    }
  }, [symbol]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data.length) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error || `No data found for ${symbol}`}
        </Typography>
      </Container>
    );
  }

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const priceChange = latestData.close - previousData.close;
  const priceChangePercent = (priceChange / previousData.close) * 100;
  const isPositive = priceChange >= 0;

  // (Moved inside the StockDetail component, just before the return statement)
  const filterDataByTimeRange = (data: LocalStockData[]): LocalStockData[] => {
    const now = new Date();
    const ranges: Record<TimeRange, number> = {
      "3M": 90,
      "1Y": 365,
      "3Y": 365 * 3,
      all: 365 * 100, // 100 years for "all"
    };

    const daysToSubtract = ranges[timeRangeDetail as TimeRange];
    const startDate = new Date();
    startDate.setDate(now.getDate() - daysToSubtract);

    return data.filter((item) => new Date(item.date) >= startDate);
  };

  let cutData = filterDataByTimeRange(data);
  const timeRangeChange =
    (cutData.at(-1)?.close ?? 0) - (cutData.at(0)?.open ?? 0);
  const timeRangeChangePercent =
    (((cutData.at(-1)?.close ?? 0) - (cutData.at(0)?.open ?? 0)) /
      (cutData.at(0)?.open ?? 1)) *
    100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }} aria-label="back">
        <ArrowBack />
      </IconButton>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" component="h1">
              {symbol}
            </Typography>
            <Typography
              variant="h4"
              color={isPositive ? "success.main" : "error.main"}
            >
              ${latestData.close.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: isPositive ? "success.light" : "error.light",
              color: isPositive ? "success.dark" : "error.dark",
              p: 2,
              borderRadius: 1,
              mb: 3,
            }}
          >
            <Typography variant="h6">
              {priceChange > 0 ? "+" : ""}
              {timeRangeChange.toFixed(2)} ({timeRangeChangePercent.toFixed(2)}
              %)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <ToggleButtonGroup
              value={timeRangeDetail}
              exclusive
              onChange={(_, newRange) =>
                newRange && setTimeRangeDetail(newRange)
              }
              size="small"
              aria-label="time range"
              sx={{
                "& .MuiToggleButton-root": {
                  px: 2,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="3M" aria-label="three months">
                3M
              </ToggleButton>
              <ToggleButton value="1Y" aria-label="one year">
                1Y
              </ToggleButton>
              <ToggleButton value="3Y" aria-label="three years">
                3Y
              </ToggleButton>
              <ToggleButton value="all" aria-label="all time">
                All
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ height: 400, mb: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filterDataByTimeRange(data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                  formatter={(value: number) => [
                    `$${value.toFixed(2)}`,
                    "Price",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="#2196f3"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date(latestData.date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
