import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#23ebc31e",
    backgroundColor: "#23ebc31e",
  },
  filled: {
    backgroundColor: "#23EBC3",
    borderColor: "#23ebc37a",
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
  },
  key: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  keyText: {
    fontSize: 24,
    color: "#111",
  },
  resetText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: "#23EBC3",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  disabled: {
    backgroundColor: "#A0A0A0",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
