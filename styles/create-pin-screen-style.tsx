import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 80,
  },
  subtitle: { fontSize: 14, color: "gray", marginBottom: 20 },
  pinContainer: { flexDirection: "row", gap: 10, marginBottom: 20 },
  pinInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 10,
  },
  button: { backgroundColor: "#23EBC3", padding: 15, borderRadius: 10 },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "white" },
});
