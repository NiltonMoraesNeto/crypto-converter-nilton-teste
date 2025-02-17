import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/verify-code-screen-style";

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
    <View style={styles.container}>
      <Text style={styles.title}>Enter 4-digit code</Text>
      <Text style={styles.subtitle}>We’ve sent the code to ****234</Text>
      <View style={styles.codeContainer}>
        {code.map((num, index) => (
          <TextInput
            key={index}
            ref={inputsRef[index]}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={num}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleVerify} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyCodeScreen;
