import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoById } from "../services/coins-service";
import { styles } from "../styles/coin-details-screen-style";

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

  const toggleFavorite = async (id: string) => {
    console.log("🚀  id - ", id);
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
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => idCoin && toggleFavorite(idCoin)}>
          <Text style={styles.favoriteButton}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.coinInfo}>
        <Image source={{ uri: coin.image }} style={styles.coinIcon} />
        <Text style={styles.coinName}>{coin.name}</Text>
        <Text style={styles.coinPrice}>${coin.price}</Text>
      </View>

      <Text style={styles.sectionTitle}>Historical Price</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Market Cap: ${coin.marketCap}</Text>
        <Text style={styles.detailItem}>
          24h Range: ${coin.low_24h} - ${coin.high_24h}
        </Text>
        <Text style={styles.detailItem}>
          7D Range: ${coin.low_7d} - ${coin.high_7d}
        </Text>
        <Text style={styles.detailItem}>All-Time High: ${coin.ath}</Text>
        <Text style={styles.detailItem}>All-Time Low: ${coin.atl}</Text>
      </View>
    </View>
  );
};

export default CoinDetailsScreen;
