interface CryptoData {
  id: string;
  name: string;
  market_data: {
    current_price: {
      brl: number;
    };
  };
  image: {
    small: string;
  };
}

interface CryptoSearchResult {
  id: string;
  name: string;
  symbol: string;
  large: string;
}

interface SearchResponse {
  coins: CryptoSearchResult[];
}

interface CryptoDataDetails {
  id: string;
  name: string;
  symbol: string;
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    low_7d: { [key: string]: number };
    high_7d: { [key: string]: number };
    price_change_percentage_7d: { [key: string]: number };
    ath: { [key: string]: number };
    atl: { [key: string]: number };
  };
  image: { small: string };
}
