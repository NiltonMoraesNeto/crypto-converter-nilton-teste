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
        <Image source={{ uri: coin?.image.small }} style={styles.coinIcon} />
        <Text style={styles.coinName}>{coin?.name}</Text>
        <Text style={styles.coinPrice}>
          ${coin?.market_data?.current_price?.brl}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Historical Price</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>
          Market Cap: ${coin?.market_cap_rank}
        </Text>
        <Text style={styles.detailItem}>
          24h Range: ${coin?.market_data?.current_price?.brl} - $
          {coin?.market_data.market_cap_change_24h_in_currency.brl}
        </Text>
        <Text style={styles.detailItem}>
          7D Range: ${coin?.market_data?.current_price?.brl} - $
          {coin?.market_data.price_change_percentage_7d_in_currency.brl}
        </Text>
        <Text style={styles.detailItem}>
          All-Time High: ${coin?.market_data.ath.brl}
        </Text>
        <Text style={styles.detailItem}>
          All-Time Low: ${coin?.market_data.atl.brl}
        </Text>
      </View>
    </View>
  );
}
