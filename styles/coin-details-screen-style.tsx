import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#DC143C",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    overflow: "hidden",
  },
  backButton: {
    fontSize: 24,
    color: "#DC143C",
  },
  favoriteButton: {
    fontSize: 24,
  },
  coinInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  coinIcon: {
    width: 80,
    height: 80,
  },
  coinName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  coinPrice: {
    fontSize: 18,
    color: "#23EBC3",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 15,
  },
  detailItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  backButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#23EBC3",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  backButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
