import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoById } from "../services/coins-service";
import { styles } from "../styles/coin-details-screen-style";
import { FormCoinDetailsScreen } from "../components/form-coin-details-screen";

const CoinDetailsScreen = ({ navigation }: any) => {
  const [coin, setCoin] = useState<any>(null);
  const [idCoin, setIdCoin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoinDetails = async () => {
      try {
        const coinId = await AsyncStorage.getItem("coinId");
        setIdCoin(coinId);

        if (coinId) {
          const data = await fetchCryptoById(coinId);
          setCoin(data);
        } else {
          setError("Coin ID not found.");
        }

        const favorites = await AsyncStorage.getItem("favorites");
        const favoritesArray = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoritesArray.includes(coinId));
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

  const toggleFavorite = async (id: string) => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favoriteCoins");
      let favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter((coinId: string) => coinId !== id);
      } else {
        favoriteIds.push(id);
      }

      await AsyncStorage.setItem("favoriteCoins", JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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
