import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import { styles } from "../styles/landing-page-screen-style";
import { fetchCryptoData, searchCrypto } from "../services/coins-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultCoins = ["bitcoin", "ethereum", "tether"];

const LandingPage = ({ navigation }: any) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCryptoData();
    loadFavoriteCoins();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("user_info");
        if (storedData) {
          const { firstName } = JSON.parse(storedData);
          setFirstName(firstName);
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      }
    };

    loadUserData();
  }, []);

  const loadCryptoData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchCryptoData(defaultCoins);
      setCoins(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoriteCoins = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favoriteCoins");
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        const favoriteData = await fetchCryptoData(favoriteIds);
        setFavoriteCoins(favoriteData);
      }
    } catch (error) {
      console.error("Error loading favorite coins:", error);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        loadCryptoData();
      } else {
        setLoading(true);
        setError(false);
        try {
          const searchResults = await searchCrypto(searchQuery);
          setCoins(searchResults);
        } catch (err) {
          console.error("Error searching crypto:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    const delayDebounce = setTimeout(fetchSearchResults, 500); // Debounce para evitar chamadas excessivas

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleOpenDetails = async (id: any) => {
    await AsyncStorage.setItem("coinId", id);
    navigation.navigate("CoinDetailsScreen");
  };

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
      loadFavoriteCoins();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {firstName}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery} // Atualiza o estado ao digitar
        />
      </View>

      {/* Lista de moedas favoritas */}
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesTitle}>Favorites</Text>
        {favoriteCoins.length === 0 ? (
          <Text style={styles.noFavoritesText}>No favorite coins yet.</Text>
        ) : (
          <FlatList
            data={favoriteCoins}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOpenDetails(item.id)}>
                <View style={styles.coinItem}>
                  <Image source={{ uri: item.image }} style={styles.coinIcon} />
                  <Text style={styles.coinName}>{item.name}</Text>
                  <Text style={styles.coinPrice}>≈ R$ {item.price}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Text style={styles.favoriteButton}>★</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Lista de moedas padrões ou pesquisadas */}
      <View style={styles.bookmarksContainer}>
        <Text style={styles.bookmarkTitle}>Bookmarks</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#23EBC3" />
        ) : error ? (
          <Text style={styles.errorText}>
            Failed to load data. Please try again later.
          </Text>
        ) : (
          <FlatList
            data={coins}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOpenDetails(item.id)}>
                <View style={styles.coinItem}>
                  <Image source={{ uri: item.image }} style={styles.coinIcon} />
                  <Text style={styles.coinName}>{item.name}</Text>
                  <Text style={styles.coinPrice}>≈ R$ {item.price}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Text style={styles.favoriteButton}>☆</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("ExchangeScreen")}
      >
        <Text style={styles.floatingButtonText}>⇆</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LandingPage;
