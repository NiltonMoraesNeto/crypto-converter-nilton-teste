import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#23EBC3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
