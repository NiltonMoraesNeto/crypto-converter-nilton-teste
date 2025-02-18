import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "../styles/login-screen-style";
import { FormLoginProps } from "../models/form-login-props";

export function FormLoginScreen({ navigation }: FormLoginProps) {
  return (
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
  );
}
