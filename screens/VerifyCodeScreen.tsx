import React, { useState, useEffect, useRef } from "react";
import { TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormVerifyCodeScreen } from "../components/form-verify-code-screen";

const VerifyCodeScreen = ({ navigation }: any) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    inputsRef[0].current?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== "" && index < 3) {
      inputsRef[index + 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    const storedCode = await AsyncStorage.getItem("verificationCode");

    if (enteredCode === storedCode) {
      Alert.alert("Success", "Code verified successfully!");
      navigation.navigate("PersonalInformationScreen");
    } else {
      Alert.alert("Error", "Invalid code. Please try again.");
      setCode(["", "", "", ""]);
      inputsRef[0].current?.focus();
    }
  };

  return (
    <FormVerifyCodeScreen
      code={code}
      inputsRef={inputsRef}
      handleChange={handleChange}
      handleVerify={handleVerify}
    />
  );
};

export default VerifyCodeScreen;
