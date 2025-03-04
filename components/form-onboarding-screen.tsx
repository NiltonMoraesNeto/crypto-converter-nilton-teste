import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { styles } from "../styles/onboarding-screen-style";
import { FormOnboardingProps } from "../models/form-onboarding-props";

export function FormOnboardingScreen({
  swiperRef,
  handleFinishOnboarding,
}: FormOnboardingProps) {
  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      <View style={styles.slide}>
        <Image
          source={require("../assets/welcome-message-1.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Set Price Alerts</Text>
        <Text style={styles.text}>
          Get notified when the market hits your target.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleFinishOnboarding}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(1)}>
            <Text style={styles.skipText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require("../assets/welcome-message-2.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Manage Your Portfolio</Text>
        <Text style={styles.text}>
          Keep track of your investments effortlessly.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleFinishOnboarding}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swiperRef.current?.scrollBy(1)}>
            <Text style={styles.skipText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.slide}>
        <Image
          source={require("../assets/welcome-message-3.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Stay Secure</Text>
        <Text style={styles.text}>
          Protect your data with our advanced security measures.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleFinishOnboarding}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}
