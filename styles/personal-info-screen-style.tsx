import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  nextButton: {
    alignSelf: "flex-end",
    backgroundColor: "#23EBC3",
    padding: 15,
    borderRadius: 50,
  },
  nextButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
