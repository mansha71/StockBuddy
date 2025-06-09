import json
import yfinance as yf

def fetch_stock_data(ticker, start_date, end_date):
    """
    Fetch historical stock data from Yahoo Finance.

    Parameters:
    ticker (str): Stock ticker symbol.
    start_date (str): Start date in 'YYYY-MM-DD' format.
    end_date (str): End date in 'YYYY-MM-DD' format.

    Returns:
    pandas.DataFrame: DataFrame containing stock data.
    """
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    stock_data.columns = ['open', 'high', 'low', 'close', 'volume']
    return stock_data

def get_stock_ticker_list():
    """
    Get a list of common stock ticker symbols.

    Returns:
    list: List of stock ticker symbols.
    """
    with open("./src/assets/list_of_tickers.json", "r") as file:
        data = json.load(file)
        return data.get("tickers", [])

# export data to json file
def export_to_json(data, filename):
    """
    Export DataFrame to a JSON file.

    Parameters:
    data (pandas.DataFrame): DataFrame to export.
    filename (str): Name of the output JSON file.
    """
    json_data = []
    for index, row in data.iterrows():
        json_data.append({
            'date': index.strftime('%Y-%m-%d'),
            'open': float(row['open']),
            'high': float(row['high']),
            'low': float(row['low']),
            'close': float(row['close']),
            'volume': int(row['volume'])
        })
    
    # Write to JSON file
    with open(filename, 'w') as f:
        json.dump(json_data, f, indent=2)
    print(f"Data exported to {filename}")


for ticker in get_stock_ticker_list():
    try:
        stock_data = fetch_stock_data(ticker, '2020-01-01', '2025-06-08')
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}")
        continue
    export_to_json(stock_data, f"./src/assets/StockDetailData/{ticker}_data.json")
    print(f"Fetched and exported data for {ticker}")
