import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { styles } from "../styles/exchange-screen-style";
import { fetchCryptoData } from "../services/coins-service";
import { Ionicons } from "@expo/vector-icons";

const defaultCoins = [
  "bitcoin",
  "ethereum",
  "tether",
  "dogecoin",
  "ripple",
  "cardano",
];

const ExchangeScreen = ({ navigation }: any) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [fromCoin, setFromCoin] = useState<any>(null);
  const [toCoin, setToCoin] = useState<any>(null);
  const [amount, setAmount] = useState("0.00");
  const [convertedValue, setConvertedValue] = useState("0.00");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"from" | "to">("from");

  useEffect(() => {
    loadCryptoData();
  }, []);

  const loadCryptoData = async () => {
    try {
      const data = await fetchCryptoData(defaultCoins);
      console.log("Dados das criptos:", data); // Adicionando log para verificar os dados retornados
      setCoins(data);
      if (data.length > 0) {
        setFromCoin(data[0]);
        setToCoin(data[1]);
      }
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    }
  };

  const fetchConversionRate = async () => {
    if (fromCoin && toCoin) {
      try {
        const rate = fromCoin.price / toCoin.price || 1;
        setConvertedValue((parseFloat(amount) * rate).toFixed(6));
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
      }
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, [fromCoin, toCoin, amount]);

  const handleCoinSelection = (coin: any) => {
    if (selectedType === "from") {
      setFromCoin(coin);
    } else {
      setToCoin(coin);
    }
    setModalVisible(false);
  };

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
};

export default ExchangeScreen;
