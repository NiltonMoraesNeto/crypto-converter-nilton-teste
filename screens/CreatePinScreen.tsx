import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/create-pin-screen-style";

const CreatePinScreen = ({ navigation }: any) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const loadPin = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.pin) {
          setPin(userData.pin.split(""));
        }
      }
    };
    loadPin();
  }, []);

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !pin[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSetPin = async () => {
    if (pin.includes("")) {
      Alert.alert("Error", "Please enter a 4-digit PIN");
      return;
    }

    const storedUserData = await AsyncStorage.getItem("userData");
    console.log("🚀  storedUserData - ", storedUserData);
    const userData = storedUserData ? JSON.parse(storedUserData) : {};
    userData.pin = pin.join("");
    console.log("🚀  userData - ", userData);
    console.log("🚀  PIN - ", pin);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    Alert.alert("Success", "PIN saved successfully!");
    navigation.navigate("SignInScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your PIN</Text>
      <Text style={styles.subtitle}>
        Create a four-digit passcode to secure your account
      </Text>

      {/* Inputs do PIN */}
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.pinInput}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" && handleBackspace(index)
            }
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="done"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSetPin}>
        <Text style={styles.buttonText}>Set up PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePinScreen;
