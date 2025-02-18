import React, { useState, useEffect } from "react";
import { fetchCryptoData } from "../services/coins-service";
import { FormExchangeScreen } from "../components/form-exchange-screen";

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
    <FormExchangeScreen
      setSelectedType={setSelectedType}
      setModalVisible={setModalVisible}
      fromCoin={fromCoin}
      amount={amount}
      setAmount={setAmount}
      toCoin={toCoin}
      convertedValue={convertedValue}
      modalVisible={modalVisible}
      coins={coins}
      handleCoinSelection={handleCoinSelection}
      navigation={navigation}
    />
  );
};

export default ExchangeScreen;
