import { Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormSignInScreen } from "../components/form-sign-in-screen";

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
    <FormSignInScreen
      firstName={firstName}
      handleSignIn={handleSignIn}
      login={login}
      setLogin={setLogin}
    />
  );
};

export default SignInScreen;
