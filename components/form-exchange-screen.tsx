import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { styles } from "../styles/exchange-screen-style";
import { FormExchangeProps } from "../models/form-exchange-props";
import { Ionicons } from "@expo/vector-icons";

export function FormExchangeScreen({
  setSelectedType,
  setModalVisible,
  fromCoin,
  amount,
  setAmount,
  toCoin,
  convertedValue,
  modalVisible,
  coins,
  handleCoinSelection,
  navigation,
}: FormExchangeProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Exchange</Text>

        {/* Seleção de Moedas */}
        <View style={styles.exchangeContainer}>
          <View style={styles.coinSelector}>
            <TouchableOpacity
              style={styles.coinButton}
              onPress={() => {
                setSelectedType("from");
                setModalVisible(true);
              }}
            >
              <Image
                source={{ uri: fromCoin?.image }}
                style={styles.coinIcon}
              />
              <Text style={styles.coinText}>
                {fromCoin?.symbol?.toUpperCase()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <View style={styles.coinSelector}>
            <TouchableOpacity
              style={styles.coinButton}
              onPress={() => {
                setSelectedType("to");
                setModalVisible(true);
              }}
            >
              <Image source={{ uri: toCoin?.image }} style={styles.coinIcon} />
              <Text style={styles.coinText}>
                {toCoin?.symbol?.toUpperCase()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#000" />
            </TouchableOpacity>
            <Text style={styles.convertedValue}>{convertedValue}</Text>
          </View>
        </View>

        {/* Taxa de conversão */}
        <Text style={styles.conversionRate}>
          {fromCoin && toCoin
            ? `1 ${fromCoin.symbol.toUpperCase()} = ${(
                fromCoin.price / toCoin.price
              ).toFixed(6)} ${toCoin.symbol.toUpperCase()}`
            : ""}
        </Text>

        {/* Modal para selecionar a moeda */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione uma moeda</Text>
            <FlatList
              data={coins}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.coinItem}
                  onPress={() => handleCoinSelection(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.coinIcon} />
                  <Text style={styles.coinText}>
                    {item.name} ({item.symbol.toUpperCase()})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("LandingPage")}
      >
        <Text style={styles.floatingButtonText}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Text>
      </TouchableOpacity>
    </>
  );
}
