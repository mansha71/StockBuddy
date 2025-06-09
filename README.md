# Stock Tracker Dashboard

A responsive web application built with React that allows users to track stock market data using the Alpha Vantage API. The app features a real-time stock dashboard, watchlist functionality, and the ability to search and add new stocks.

## Features

- Real-time stock data display
- Personal watchlist management
- Stock search and addition
- Responsive design with Material-UI
- Local storage for watchlist persistence

## Tech Stack

- React (with TypeScript)
- Material-UI for styling
- Axios for API calls
- Alpha Vantage API for stock data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Alpha Vantage API key:
   ```
   VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Key

To use this application, you'll need an API key from Alpha Vantage. You can get one for free at [Alpha Vantage](https://www.alphavantage.co/support/#api-key).

## Project Structure

```
src/
  ├── components/     # React components
  ├── context/       # Context providers
  ├── hooks/         # Custom React hooks
  ├── utils/         # Utility functions
  └── App.tsx        # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

Feel free to submit issues and enhancement requests!
