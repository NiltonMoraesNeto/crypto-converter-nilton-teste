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
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 25,
    borderRadius: 10,
    width: "70%",
  },
  button: {
    backgroundColor: "#23EBC3",
    padding: 15,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
  buttonText: { fontSize: 20, fontWeight: "bold", color: "white" },
});
