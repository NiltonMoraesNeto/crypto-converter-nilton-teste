import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { phoneMasks } from "../models/phoneMasks";
import { flags } from "../models/flags";
import { styles } from "../styles/create-account-screen-style";

const CreateAccountScreen = ({ navigation }: any) => {
  const [callingCode, setCallingCode] = useState("+31");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("NL");
  const [show, setShow] = useState(false);
  const [flagPath, setFlagPath] = useState("NL");

  const formatPhoneNumber = (value: string, mask: string) => {
    const newMask = mask !== undefined ? mask : "999 999 999 999";
    const numbersOnly = value.replace(/\D/g, "");
    let formattedValue = "";
    let numberIndex = 0;

    for (let i = 0; i < newMask.length; i++) {
      if (newMask[i] === "9" && numberIndex < numbersOnly.length) {
        formattedValue += numbersOnly[numberIndex];
        numberIndex++;
      } else if (newMask[i] !== "9") {
        formattedValue += newMask[i];
      }
    }
    return formattedValue;
  };

  const handlePhoneNumberChange = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, "");
    if (cleanText === "") {
      setPhoneNumber("");
    } else {
      const formattedText = formatPhoneNumber(
        cleanText,
        phoneMasks[selectedCountry]
      );
      setPhoneNumber(formattedText);
    }
  };

  const generateCode = async () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    await AsyncStorage.setItem("verificationCode", code);
    console.log("Generated Code:", code);
  };

  const handleSendCode = async () => {
    await generateCode();
    navigation.navigate("VerifyCodeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Getting Started</Text>
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text
            style={{
              color: "",
              fontSize: 20,
            }}
          >
            <Image source={flags[flagPath]} style={styles.image} />
          </Text>
        </TouchableOpacity>
        <CountryPicker
          show={show}
          lang="pt"
          pickerButtonOnPress={(item) => {
            setPhoneNumber("");
            setSelectedCountry(item.code);
            setCallingCode(item.dial_code);
            setFlagPath(item.code);
            setShow(false);
          }}
        />

        <Text style={styles.countryCode}>{callingCode}</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          placeholder="0 000 00 00"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account? <Text style={styles.signInLink}>Sign In</Text>
      </Text>

      <Text style={styles.termsText}>
        By creating an account you agree to our{" "}
        <Text style={styles.termsLink}>Terms and Conditions</Text>
      </Text>
    </View>
  );
};

export default CreateAccountScreen;
