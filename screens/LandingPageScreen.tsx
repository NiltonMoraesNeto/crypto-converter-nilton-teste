import React, { useState, useEffect } from "react";
import { fetchCryptoData, searchCrypto } from "../services/coins-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormLandingPageScreen } from "../components/form-landing-page-screen";

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
    <FormLandingPageScreen
      firstName={firstName}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      favoriteCoins={favoriteCoins}
      handleOpenDetails={handleOpenDetails}
      toggleFavorite={toggleFavorite}
      loading={loading}
      error={error}
      coins={coins}
      navigation={navigation}
    />
  );
};

export default LandingPage;
