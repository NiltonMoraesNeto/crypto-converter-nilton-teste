import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoData } from "../services/coins-service";

// Definição do tipo do contexto
interface FavoritesContextType {
  favoriteCoins: any[];
  toggleFavorite: (id: string) => Promise<void>;
  loadFavoriteCoins: () => Promise<void>;
}

// Criando o contexto
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// **Provider** que envolverá a aplicação
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteCoins, setFavoriteCoins] = useState<any[]>([]);

  // Função para carregar favoritos do AsyncStorage
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

  // Alternar favoritos
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
      loadFavoriteCoins(); // Recarregar os favoritos
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Carregar favoritos ao iniciar o app
  useEffect(() => {
    loadFavoriteCoins();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favoriteCoins, toggleFavorite, loadFavoriteCoins }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
