import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles/coin-details-screen-style";
import { FormCoinDetailsProps } from "../models/form-coin-details-props";

export function FormCoinDetailsScreen({
  idCoin,
  toggleFavorite,
  isFavorite,
  coin,
  handleBack,
}: FormCoinDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
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
}
