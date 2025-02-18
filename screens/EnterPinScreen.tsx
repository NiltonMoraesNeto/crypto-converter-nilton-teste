import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormEnterPinScreen } from "../components/form-enter-pin-screen";

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
    <FormEnterPinScreen
      enteredPin={enteredPin}
      handleNumberPress={handleNumberPress}
      handleDelete={handleDelete}
      handleReset={handleReset}
      handleContinue={handleContinue}
    />
  );
};

export default EnterPinScreen;
