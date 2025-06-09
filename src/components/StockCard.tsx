import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, IconButton, Box, Chip } from "@mui/material";
import { TrendingUp, TrendingDown, Delete } from "@mui/icons-material";
import type { StockData } from "../utils/api";
import { useWatchlist } from "../context/WatchlistContext";

interface StockCardProps {
  data: StockData;
  onRemove?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ data, onRemove }) => {
  const { removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();
  const isPositive = data.change >= 0;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWatchlist(data.symbol);
    onRemove?.();
  };

  const handleCardClick = () => {
    navigate(`/stock/${data.symbol}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        minWidth: 275,
        mb: 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 3,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: "text.primary",
            }}
          >
            {data.symbol}
          </Typography>
          {onRemove && (
            <IconButton
              onClick={handleRemove}
              size="small"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "error.main",
                  transform: "scale(1.1)",
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
            my: 2,
            fontWeight: 700,
            background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ${data.price.toFixed(2)}
        </Typography>

        <Chip
          icon={isPositive ? <TrendingUp /> : <TrendingDown />}
          label={`${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)`}
          sx={{
            backgroundColor: isPositive
              ? "rgba(76, 175, 80, 0.15)"
              : "rgba(244, 67, 54, 0.15)",
            color: isPositive ? "success.main" : "error.main",
            border: "1px solid",
            borderColor: isPositive
              ? "rgba(76, 175, 80, 0.3)"
              : "rgba(244, 67, 54, 0.3)",
            fontWeight: 600,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 2,
            color: "text.secondary",
            opacity: 0.7,
          }}
        >
          Last updated: {data.lastUpdated}
        </Typography>
      </CardContent>
    </Card>
  );
};
