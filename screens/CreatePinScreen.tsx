import React, { useState, useRef, useEffect } from "react";
import { TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormCreatePinScreen } from "../components/form-create-pin-screen";

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
    const userData = storedUserData ? JSON.parse(storedUserData) : {};
    userData.pin = pin.join("");
    console.log("🚀  PIN - ", pin);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    Alert.alert("Success", "PIN saved successfully!");
    navigation.navigate("SignInScreen");
  };

  return (
    <FormCreatePinScreen
      pin={pin}
      inputRefs={inputRefs}
      handleInputChange={handleInputChange}
      handleBackspace={handleBackspace}
      handleSetPin={handleSetPin}
    />
  );
};

export default CreatePinScreen;
