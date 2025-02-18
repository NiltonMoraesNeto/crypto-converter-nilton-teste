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

  const { favoriteCoins, toggleFavorite } = useFavorites(); // 🚀 Obtendo os favoritos

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
      favoriteCoins={favoriteCoins} // 🚀 Agora os favoritos são globais
      handleOpenDetails={handleOpenDetails}
      toggleFavorite={toggleFavorite} // 🚀 Função global
      loading={loading}
      error={error}
      coins={coins}
      navigation={navigation}
    />
  );
};

export default LandingPage;
