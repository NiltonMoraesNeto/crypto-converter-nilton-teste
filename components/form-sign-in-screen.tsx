import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/signin-screen-style";
import { FormSignInProps } from "../models/form-sign-in-props";

export function FormSignInScreen({
  firstName,
  handleSignIn,
  login,
  setLogin,
}: FormSignInProps) {
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
}
