import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/landing-page-screen-style";
import { FormLandingPageProps } from "../models/form-landing-page-props";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function FormLandingPageScreen({
  firstName,
  searchQuery,
  setSearchQuery,
  favoriteCoins,
  handleOpenDetails,
  toggleFavorite,
  loading,
  error,
  coins,
  navigation,
}: FormLandingPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadError = async () => {
    const storedData = await AsyncStorage.getItem("errorLandingPage");
    setErrorMessage(storedData);
  };

  useEffect(() => {
    loadError();
  }, []);

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
        <Text>{errorMessage}</Text>
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
}
