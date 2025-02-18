import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/enter-pin-screen-style";
import { FormEnterPinProps } from "../models/form-enter-pin-props";

export function FormEnterPinScreen({
  enteredPin,
  handleNumberPress,
  handleDelete,
  handleReset,
  handleContinue,
}: FormEnterPinProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>

      {/* Indicadores do PIN */}
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[styles.pinDot, enteredPin.length > i && styles.filled]}
          />
        ))}
      </View>

      {/* Teclado numérico */}
      <View style={styles.keyboard}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleDelete}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.continueButton,
          enteredPin.length < 4 && styles.disabled,
        ]}
        onPress={handleContinue}
        disabled={enteredPin.length < 4}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
