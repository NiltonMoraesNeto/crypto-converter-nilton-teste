import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { styles } from "../styles/create-account-screen-style";
import { FormCreateAccountProps } from "../models/form-create-account-props";
import { CountryPicker } from "react-native-country-codes-picker";

export function FormCreateAccountScreen({
  setShow,
  flags,
  flagPath,
  show,
  setPhoneNumber,
  setSelectedCountry,
  setCallingCode,
  setFlagPath,
  callingCode,
  phoneNumber,
  handlePhoneNumberChange,
  handleSendCode,
  handleLogin,
}: FormCreateAccountProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Getting Started</Text>
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text
            style={{
              color: "",
              fontSize: 20,
            }}
          >
            <Image source={flags[flagPath]} style={styles.image} />
          </Text>
        </TouchableOpacity>
        <CountryPicker
          show={show}
          lang="pt"
          pickerButtonOnPress={(item) => {
            setPhoneNumber("");
            setSelectedCountry(item.code);
            setCallingCode(item.dial_code);
            setFlagPath(item.code);
            setShow(false);
          }}
        />

        <Text style={styles.countryCode}>{callingCode}</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          placeholder="0 000 00 00"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogin()}>
        <Text style={styles.signInText}>
          Already have an account?{" "}
          <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By creating an account you agree to our{" "}
        <Text style={styles.termsLink}>Terms and Conditions</Text>
      </Text>
    </View>
  );
}
