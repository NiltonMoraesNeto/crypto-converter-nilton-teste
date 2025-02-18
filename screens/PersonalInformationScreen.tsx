import React, { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormPersonalInformationScreen } from "../components/form-personal-information-screen";

const PersonalInformationScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = async () => {
    if (!firstName || !lastName || !dob) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.setItem(
        "user_info",
        JSON.stringify({
          firstName,
          lastName,
          dob: dob.toISOString().split("T")[0],
        })
      );
      navigation.navigate("HomeAddressScreen");
    } catch (error) {
      Alert.alert("Error", "Failed to save data");
    }
  };

  return (
    <FormPersonalInformationScreen
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      setShowPicker={setShowPicker}
      dob={dob}
      showPicker={showPicker}
      setDob={setDob}
      handleNext={handleNext}
    />
  );
};

export default PersonalInformationScreen;
