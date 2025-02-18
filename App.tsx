import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { Provider as PaperProvider } from "react-native-paper";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import VerifyCodeScreen from "./screens/VerifyCodeScreen";
import PersonalInformationScreen from "./screens/PersonalInformationScreen";
import HomeAddressScreen from "./screens/HomeAddressScreen";
import CreatePinScreen from "./screens/CreatePinScreen";
import SignInScreen from "./screens/SignInScreen";
import EnterPinScreen from "./screens/EnterPinScreen";
import LandingPage from "./screens/LandingPageScreen";
import CoinDetailsScreen from "./screens/CoinDetailsScreen";
import ExchangeScreen from "./screens/ExchangeScreen";
import { FavoritesProvider } from "./context/FavoritesContext";

const Stack = createStackNavigator();

function App() {
  return (
    <FavoritesProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </FavoritesProvider>
  );
}

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        <Stack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformationScreen}
        />
        <Stack.Screen name="HomeAddressScreen" component={HomeAddressScreen} />
        <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="EnterPinScreen" component={EnterPinScreen} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
        <Stack.Screen name="ExchangeScreen" component={ExchangeScreen} />
      </>
    </Stack.Navigator>
  );
};

export default App;
