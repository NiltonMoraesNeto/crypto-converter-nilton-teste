import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/home-address-screen-style";

const HomeAddressScreen = ({ navigation }: any) => {
  const [address, setAddress] = useState({
    street: "",
    apt: "",
    city: "",
    region: "",
    zip: "",
  });

  useEffect(() => {
    const loadAddress = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setAddress(userData.address || {});
      }
    };
    loadAddress();
  }, []);

  const handleNext = async () => {
    const storedUserData = await AsyncStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : {};
    userData.address = address;
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    navigation.navigate("CreatePinScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street address"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apt / Suite number"
        value={address.apt}
        onChangeText={(text) => setAddress({ ...address, apt: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={address.region}
        onChangeText={(text) => setAddress({ ...address, region: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip code"
        value={address.zip}
        onChangeText={(text) => setAddress({ ...address, zip: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeAddressScreen;
