import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormHomeAddressScreen } from "../components/form-home-address-screen";

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
    <FormHomeAddressScreen
      address={address}
      setAddress={setAddress}
      handleNext={handleNext}
    />
  );
};

export default HomeAddressScreen;
