import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView, StatusBar } from "react-native";
import { styles } from "../styles/login-screen-style";

const LoginScreen = ({ navigation }: any) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Track Crypto Prices</Text>
          <Image
            source={require("../assets/home-image.png")}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Onboarding")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text
            style={styles.signInText}
            onPress={() => navigation.navigate("SignInScreen")}
          >
            Sign In
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
