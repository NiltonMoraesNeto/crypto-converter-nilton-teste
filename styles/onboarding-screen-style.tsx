import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    width: 300,
    height: 550,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
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
  skipText: {
    fontSize: 16,
    color: "#888",
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#DC143C",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});
