import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/signin-screen-style";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [pin, setPin] = useState("");
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("user_info");
        const storedUserData = await AsyncStorage.getItem("userData");

        if (storedData && storedUserData) {
          const userData = JSON.parse(storedUserData);
          const { firstName, pin } = JSON.parse(storedData);
          setFirstName(firstName);
          setPin(userData.pin);
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      }
    };

    loadUserData();
  }, []);

  const handleSignIn = async () => {
    if (login.username === firstName && login.password === pin) {
      navigation.navigate("EnterPinScreen");
    } else {
      Alert.alert("Error", "Incorrect data");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back {firstName}</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={login.username}
        onChangeText={(text) => setLogin({ ...login, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={login.password}
        keyboardType="numeric"
        maxLength={4}
        onChangeText={(text) => setLogin({ ...login, password: text })}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
