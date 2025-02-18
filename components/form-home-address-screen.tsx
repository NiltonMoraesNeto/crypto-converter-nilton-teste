import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/home-address-screen-style";
import { FormHomeAddressScreenProps } from "../models/form-home-address-props";

export function FormHomeAddressScreen({
  address,
  setAddress,
  handleNext,
}: FormHomeAddressScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street address"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apt / Suite number"
        value={address.apt}
        onChangeText={(text) => setAddress({ ...address, apt: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={address.region}
        onChangeText={(text) => setAddress({ ...address, region: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip code"
        value={address.zip}
        onChangeText={(text) => setAddress({ ...address, zip: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}
