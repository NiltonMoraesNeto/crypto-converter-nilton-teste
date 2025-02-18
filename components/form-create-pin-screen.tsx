import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/create-pin-screen-style";
import { FormCreatePinProps } from "../models/form-create-pin-props";

export function FormCreatePinScreen({
  pin,
  inputRefs,
  handleInputChange,
  handleBackspace,
  handleSetPin,
}: FormCreatePinProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your PIN</Text>
      <Text style={styles.subtitle}>
        Create a four-digit passcode to secure your account
      </Text>

      {/* Inputs do PIN */}
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.pinInput}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" && handleBackspace(index)
            }
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="done"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSetPin}>
        <Text style={styles.buttonText}>Set up PIN</Text>
      </TouchableOpacity>
    </View>
  );
}
