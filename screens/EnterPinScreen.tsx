import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/enter-pin-screen-style";

const EnterPinScreen = ({ navigation }: any) => {
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [savedPin, setSavedPin] = useState<string>("");

  useEffect(() => {
    const loadSavedPin = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setSavedPin(userData.pin || "");
      }
    };
    loadSavedPin();
  }, []);

  const handleNumberPress = (num: string) => {
    if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + num);
    }
  };

  const handleDelete = () => {
    setEnteredPin(enteredPin.slice(0, -1));
  };

  const handleReset = () => {
    setEnteredPin("");
  };

  const handleContinue = () => {
    if (enteredPin === savedPin) {
      Alert.alert("Success", "PIN correct!");
      navigation.navigate("LandingPage");
    } else {
      Alert.alert("Error", "Incorrect PIN. Try again.");
      setEnteredPin("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>

      {/* Indicadores do PIN */}
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[styles.pinDot, enteredPin.length > i && styles.filled]}
          />
        ))}
      </View>

      {/* Teclado numérico */}
      <View style={styles.keyboard}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleDelete}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.continueButton,
          enteredPin.length < 4 && styles.disabled,
        ]}
        onPress={handleContinue}
        disabled={enteredPin.length < 4}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPinScreen;
