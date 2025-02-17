import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DC143C",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#23EBC3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signInText: {
    fontSize: 16,
    color: "white",
    marginTop: 15,
  },
});
