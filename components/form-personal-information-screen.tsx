import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/personal-info-screen-style";
import { FormPersonalInformationScreenProps } from "../models/form-personal-info-props";

export function FormPersonalInformationScreen({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setShowPicker,
  dob,
  showPicker,
  setDob,
  handleNext,
}: FormPersonalInformationScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal information</Text>
      <Text style={styles.subtitle}>
        We ask for your personal information to verify your identity
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text>{dob.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowPicker(false);
            if (date) setDob(date);
          }}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}
