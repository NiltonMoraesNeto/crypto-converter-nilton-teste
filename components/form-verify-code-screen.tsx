import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/verify-code-screen-style";
import { FormVerifyCodeProps } from "../models/form-verify-code-props";

export function FormVerifyCodeScreen({
  code,
  inputsRef,
  handleChange,
  handleVerify,
}: FormVerifyCodeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter 4-digit code</Text>
      <Text style={styles.subtitle}>We’ve sent the code to ****234</Text>
      <View style={styles.codeContainer}>
        {code.map((num, index) => (
          <TextInput
            key={index}
            ref={inputsRef[index]}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={num}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleVerify} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
