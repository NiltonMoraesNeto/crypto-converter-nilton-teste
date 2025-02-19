import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoById } from "../services/coins-service";
import { styles } from "../styles/coin-details-screen-style";
import { FormCoinDetailsScreen } from "../components/form-coin-details-screen";
import { CryptoDataDetails } from "../models/crypto-data";
import { useFavorites } from "../context/FavoritesContext";

const CoinDetailsScreen = ({ navigation }: any) => {
  const [coin, setCoin] = useState<CryptoDataDetails>();
  const [idCoin, setIdCoin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favoriteCoins, toggleFavorite } = useFavorites();
  const isFavorite = favoriteCoins.some((fav) => fav.id === idCoin);

  useEffect(() => {
    const loadCoinDetails = async () => {
      try {
        const coinId = await AsyncStorage.getItem("coinId");
        setIdCoin(coinId);

        if (coinId) {
          const data = await fetchCryptoById(coinId);
          setCoin(data as CryptoDataDetails);
        } else {
          setError("Coin ID not found.");
        }

        const favorites = await AsyncStorage.getItem("favorites");
        const favoritesArray = favorites ? JSON.parse(favorites) : [];
      } catch (err: any) {
        if (err.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to load coin details.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCoinDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#23EBC3" />;
  }

  const handleBack = () => {
    navigation.navigate("LandingPage");
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => handleBack()}
          style={styles.backButtonContainer}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FormCoinDetailsScreen
      idCoin={idCoin}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      coin={coin}
      handleBack={handleBack}
    />
  );
};

export default CoinDetailsScreen;
