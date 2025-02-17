import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1B20",
    marginBottom: 40,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#23EBC3",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signInText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  signInLink: {
    fontWeight: "bold",
    color: "#23EBC3",
  },
  termsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "bold",
    color: "#1D1B20",
  },
  image: {
    width: 30,
    height: 30,
  },
});
