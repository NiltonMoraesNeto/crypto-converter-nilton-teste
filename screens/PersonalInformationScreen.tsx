import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/personal-info-screen-style";

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
    <View style={styles.container}>
      <Text style={styles.title}>Personal information</Text>
      <Text style={styles.subtitle}>
        We ask for your personal information to verify your identity
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text>{dob.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowPicker(false);
            if (date) setDob(date);
          }}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalInformationScreen;
