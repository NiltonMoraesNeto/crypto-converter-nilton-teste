import React, { useState, useEffect } from "react";
import { fetchCryptoData, searchCrypto } from "../services/coins-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormLandingPageScreen } from "../components/form-landing-page-screen";
import { useFavorites } from "../context/FavoritesContext"; // 🚀 Importando o contexto

const defaultCoins = ["bitcoin", "ethereum", "tether"];

const LandingPage = ({ navigation }: any) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const { favoriteCoins, toggleFavorite } = useFavorites();

  useEffect(() => {
    loadCryptoData();
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

  const handleOpenDetails = async (id: any) => {
    await AsyncStorage.setItem("coinId", id);
    navigation.navigate("CoinDetailsScreen");
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
