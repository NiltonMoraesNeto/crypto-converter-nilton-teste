import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { CryptoData, SearchResponse } from "../models/crypto-data";

export const fetchCryptoData = async (coins: string[]) => {
  try {
    const responses = await Promise.all(
      coins.map((coin) => api.get<CryptoData>(`coins/${coin}`))
    );

    await AsyncStorage.removeItem("errorLandingPage");

    return responses.map(({ data }) => ({
      id: data.id,
      name: data.name,
      price: data.market_data.current_price.brl,
      image: data.image.small,
    }));
  } catch (error) {
    await AsyncStorage.setItem(
      "errorLandingPage",
      "Error fetching crypto data: " + error
    );
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

export const searchCrypto = async (query: string) => {
  try {
    const { data } = await api.get<SearchResponse>(`search?query=${query}`);
    return data.coins.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.large,
    }));
  } catch (error) {
    console.error("Erro ao buscar criptomoedas:", error);
    return [];
  }
};

export const fetchCryptoById = async (coinId: string) => {
  try {
    //const cacheKey = `crypto_${coinId}`;
    // const cachedData = await AsyncStorage.getItem(cacheKey);

    // if (cachedData) {
    //   return JSON.parse(cachedData);
    // }

    const response = await api.get(`/coins/${coinId}`);
    const data = response.data;

    // Armazena no cache por 5 minutos
    // await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    // setTimeout(() => AsyncStorage.removeItem(cacheKey), 5 * 60 * 1000);

    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da moeda:", error);
    return null;
  }
};
