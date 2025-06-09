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
    data.to_json(filename, orient='records', date_format='iso')
    print(f"Data exported to {filename}")

for ticker in get_stock_ticker_list():
    stock_data = fetch_stock_data(ticker, '2020-01-01', '2023-10-01')
    export_to_json(stock_data, f"./src/assets/StockDetailData/{ticker}_data.json")
    print(f"Fetched and exported data for {ticker}")
