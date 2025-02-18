import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { phoneMasks } from "../models/phoneMasks";
import { flags } from "../models/flags";
import { FormCreateAccountScreen } from "../components/form-create-account-screen";

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

  const handleLogin = () => {
    navigation.navigate("SignInScreen");
  };

  return (
    <FormCreateAccountScreen
      setShow={setShow}
      flags={flags}
      flagPath={flagPath}
      show={show}
      setPhoneNumber={setPhoneNumber}
      setSelectedCountry={setSelectedCountry}
      setCallingCode={setCallingCode}
      setFlagPath={setFlagPath}
      callingCode={callingCode}
      phoneNumber={phoneNumber}
      handlePhoneNumberChange={handlePhoneNumberChange}
      handleSendCode={handleSendCode}
      handleLogin={handleLogin}
    />
  );
};

export default CreateAccountScreen;
