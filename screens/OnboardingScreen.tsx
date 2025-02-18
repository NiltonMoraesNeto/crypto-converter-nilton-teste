import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormOnboardingScreen } from "../components/form-onboarding-screen";

const OnboardingScreen = ({ navigation }: any) => {
  const swiperRef = useRef<Swiper>(null);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.navigate("CreateAccountScreen");
  };

  return (
    <FormOnboardingScreen
      swiperRef={swiperRef}
      handleFinishOnboarding={handleFinishOnboarding}
    />
  );
};

export default OnboardingScreen;
